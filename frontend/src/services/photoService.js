import { api, requestConfig } from "../utils/config";

//publish an user photo
const publishPhoto = async (data, token) => {
  const config = requestConfig("POST", data, token, true);

  try {
    const res = await fetch(api + "/photos", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

// get user photos

const getUserPhotos = async (id, token) => {
  const config = requestConfig("GET", null, token);

  try {
    const res = await fetch(api + "/photos/user/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

// delete a photo
const deletePhoto = async (id, token) => {
  const config = requestConfig("DELETE", null, token);

  try {
    const res = await fetch(api + "/photos/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

//update a photo
const updatePhoto = async (data, id, token) => {
  const config = requestConfig("PUT", data, token);

  try {
    const res = await fetch(api + "/photos/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

// get a photo by id
const getPhoto = async (id) => {
  const config = requestConfig("GET");

  try {
    const res = await fetch(api + "/photos/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

//like in photo
const like = async (id, token) => {
  const config = requestConfig("PUT", null, token);

  try {
    const res = await fetch(api + "/photos/" + id + "/like", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

// remove like in photo
const dislike = async (id, token) => {
  const config = requestConfig("PUT", null, token);
  try {
    console.log(id, token);
    const res = await fetch(api + "/photos/" + id + "/dislike", config);

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

//remove comments in photo

const discommented = async (id, comment, token) => {
  const config = requestConfig("DELETE", null, token);

  const commentId = comment.commentId;

  try {
    const res = await fetch(
      api + "/photos/" + id + "/discommented/" + commentId,
      config
    )
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

//add comment to a photo
const comment = async (data, id, token) => {
  const config = requestConfig("PUT", data, token);

  try {
    const res = await fetch(api + "/photos/" + id + "/comment", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

//get all photos
const getAllPhotos = async () => {
  const config = requestConfig("GET");

  try {
    const res = await fetch(api + "/photos", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

const photoService = {
  publishPhoto,
  getUserPhotos,
  deletePhoto,
  updatePhoto,
  getPhoto,
  dislike,
  like,
  discommented,
  getAllPhotos,
  comment,
};

export default photoService;
