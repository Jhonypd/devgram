import { api, requestConfig } from "../utils/config";

const handleErrors = (error) => {
  console.error(error);
  return { errors: [error.message || "Ocorreu um erro desconhecido."] };
};

const fetchData = async (url, config) => {
  try {
    const res = await fetch(url, config);

    if (!res.ok) {
      throw new Error(`Erro na requisição: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    return handleErrors(error);
  }
};

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
    const res = await fetch(api + "/photos/user/" + id, config);

    if (!res.ok) {
      throw new Error(`Erro na requisição: ${res.status}`);
    }

    const data = res.json();

    return data;
  } catch (error) {
    console.error(error);

    return { errors: [error.message] };
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
const getPhotos = async (token) => {
  const config = requestConfig("GET", null, token);

  try {
    const res = await fetch(api + "/photos", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

// get more photos
const getMorePhotos = async (page, token) => {
  const config = requestConfig("GET", null, token);
  const res = await fetchData(api + "/photos/more?page=" + page, config);
  console.log(page, res);

  return res;
};

//search photo by title
const searchPhotos = async (query, token) => {
  const config = requestConfig("GET", null, token);

  const res = await fetchData(api + "/photos/search?q=" + query, config);

  return res;
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
  comment,
  getPhotos,
  getMorePhotos,
  searchPhotos,
};

export default photoService;
