const Photo = require("../models/Photo");
const User = require("../models/User");

const mongoose = require("mongoose");

const { v4: uuidv4 } = require("uuid");

const handleErros = (res, status, message) => {
  res.status(status).json({ erros: [message] });
};

//insert a photo, with an user user related to it
const insertPhoto = async (req, res) => {
  const { title } = req.body;
  const image = req.file.filename;

  const reqUser = req.user;

  const user = await User.findById(reqUser._id);

  const photoId = uuidv4();

  const photoUser = user.profileImage || "";

  //create a photo
  const newPhoto = await Photo.create({
    image,
    photoId: photoId,
    title,
    userId: user._id,
    userName: user.name,
    photoUser: photoUser,
  });

  //If photo was created successfully, return data
  if (!newPhoto) {
    handleErros(
      res,
      422,
      "Houve um problema, por favor tente novamente mais tarde."
    );
    return;
  }

  res.status(201).json(newPhoto);
};

//Remove a photo from db

const deletePhoto = async (req, res) => {
  const { id } = req.params;

  const reqUser = req.user;

  try {
    const photo = await Photo.findById(new mongoose.Types.ObjectId(id));

    //check if photo exists
    if (!photo) {
      handleErros(res, 404, "Foto não encontrada!");
      return;
    }

    // check if photo belongs to user
    if (!photo.userId.equals(reqUser._id)) {
      handleErros(
        res,
        422,
        "Ocorreu um erro, por favor tente novamente mais tarde."
      );
      return;
    }

    await Photo.findByIdAndDelete(photo._id);

    res
      .status(200)
      .json({ id: photo._id, message: "Foto excluída com sucesso!" });
  } catch (error) {
    handleErros(res, 404, "Foto não encontrada!");
    return;
  }
};

//Get all photos
const getAllPhotos = async (req, res) => {
  const photos = await Photo.find({})
    .sort([["createdAt", -1]])
    .exec();

  return res.status(200).json(photos);
};

//Get more photos
const getMorePhotos = async (req, res) => {
  const { page } = req.query;
  const pageSize = 4;

  try {
    const skip = (page - 1) * pageSize;

    const totalPhotos = await Photo.countDocuments({});

    const photos = await Photo.find({})
      .sort([["createdAt", -1]])
      .skip(skip)
      .limit(pageSize)
      .exec();

    const totalPages = Math.ceil(totalPhotos / pageSize);

    console.log("Total de Fotos:", totalPhotos);
    console.log("Total de pages:", totalPages);

    return res.status(200).json({ photos, totalPages });
  } catch (error) {
    handleErros(res, 500, "Erro interno do servidor.");
    console.error("Erro no controlador getMorePhotos:", error);
  }
};

//Get user photos

const getUserPhotos = async (req, res) => {
  const { id } = req.params;
  const reqUser = req.user;

  const user = await User.findById(reqUser._id);

  const photos = await Photo.find({ userId: id })
    .sort([["createdAt", -1]])
    .exec();

  const upadtedPhotos = [];

  let userImageAvatar = user.profileImage !== "";

  for (const photo of photos) {
    if (!photo.photoUser && !userImageAvatar) {
      photo.photoUser = user.profileImage;
      await photo.save();
    }
    upadtedPhotos.push(photo.toObject());
  }

  return res.status(200).json(upadtedPhotos);
};

//Get photo by id
const getPhotoById = async (req, res) => {
  const { id } = req.params;

  const photo = await Photo.findById(new mongoose.Types.ObjectId(id));

  //check if photo exists
  if (!photo) {
    handleErros(res, 404, "Foto não encontrada!");
    return;
  }

  res.status(200).json(photo);
};

//update a photo
const updatePhoto = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const reqUser = req.user;

  const photo = await Photo.findById(id);

  //check if photo exists
  if (!photo) {
    handleErros(res, 404, "Foto não encontrada!");
    return;
  }

  //check if photo belongs to user
  if (!photo.userId.equals(reqUser._id)) {
    handleErros(
      res,
      422,
      "Ocorreu um erro, por favor tente novamente mais tarde."
    );
    return;
  }

  if (title) {
    photo.title = title;
  }

  await photo.save();

  res.status(200).json({ photo, message: "Foto atualizada com sucesso!" });
};

// remove like in photo
const dislikePhoto = async (req, res) => {
  const { id } = req.params;

  const reqUser = req.user;

  try {
    const photo = await Photo.findById(id);

    //check if photo exists
    if (!photo) {
      handleErros(res, 404, "Foto não encontrada!");
      return;
    }

    photo.likes = photo.likes.filter(
      (userId) => userId.toString() !== reqUser._id.toString()
    );

    await photo.save();

    res.status(200).json({
      photoId: id,
      userId: reqUser._id,
      messages: "Curtida removida!",
    });
  } catch (error) {
    return handleErros(res, 500, "Erro interno do servidor.");
  }
};

//Like funcionality
const likePhoto = async (req, res) => {
  const { id } = req.params;

  const reqUser = req.user;

  const photo = await Photo.findById(id);

  //check if photo exists
  if (!photo) {
    res.status(404).json({ errors: ["Foto não encontrada."] });
    return;
  }

  //Put user id in linkes array
  photo.likes.push(reqUser._id);

  await photo.save();

  res
    .status(200)
    .json({ photoId: id, userId: reqUser._id, message: "A foto foi curtida." });
};

const discommentedPhoto = async (req, res) => {
  const { id, commentId } = req.params;

  const reqUser = req.user;

  try {
    const photo = await Photo.findById(id);

    // Check if photo exists
    if (!photo) {
      handleErros(res, 404, "Foto não encontrada!");
      return;
    }

    // Find the comment in the photo
    const commentIndex = photo.comments.findIndex(
      (comment) => comment.commentId === commentId
    );

    // Check if the comment exists
    if (commentIndex === -1) {
      handleErros(res, 404, "Comentário não encontrado!");
      return;
    }

    const comment = photo.comments[commentIndex];

    // Check if the user is the owner of the comment or the owner of the photo
    if (
      !comment.userId.equals(reqUser._id) &&
      !photo.userId.equals(reqUser._id)
    ) {
      handleErros(
        res,
        422,
        "Você não tem permissão para remover este comentário."
      );
      return;
    }

    // Remove the comment from the array
    photo.comments.splice(commentIndex, 1);

    await photo.save();

    res.status(200).json({
      commentId: comment.commentId,
      message: "Comentário removido com sucesso!",
    });
  } catch (error) {
    handleErros(res, 500, "Erro interno do servidor.");
  }
};

//comment functionality
const commentPhoto = async (req, res) => {
  const { id } = req.params;

  const { comment } = req.body;

  const reqUser = req.user;

  const user = await User.findById(reqUser._id);

  const photo = await Photo.findById(id);

  const commentId = uuidv4();

  //check if photo exists
  if (!photo) {
    handleErros(res, 404, "Foto não encontrada!");
    return;
  }

  //Put comment in the array comments

  const userComment = {
    comment,
    userName: user.name,
    userImage: user.profileImage,
    userId: user._id,
    commentId: commentId,
  };

  photo.comments.push(userComment);

  await photo.save();

  res.status(200).json({
    comment: userComment,
    message: "Comentário adicionado com sucesso!",
  });
};

//Search photos by title

const searchPhotos = async (req, res) => {
  const { q } = req.query;

  const photos = await Photo.find({
    title: new RegExp(q, "i"),
  }).exec();

  res.status(200).json(photos);
};

module.exports = {
  insertPhoto,
  deletePhoto,
  getAllPhotos,
  getMorePhotos,
  getUserPhotos,
  getPhotoById,
  updatePhoto,
  likePhoto,
  dislikePhoto,
  commentPhoto,
  discommentedPhoto,
  searchPhotos,
};
