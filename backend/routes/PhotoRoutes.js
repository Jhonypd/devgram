const express = require("express");
const router = express.Router();

//Controller
const {
  insertPhoto,
  deletePhoto,
  getAllPhotos,
  getUserPhotos,
  getPhotoById,
  updatePhoto,
  likePhoto,
  commentPhoto,
  searchPhotos,
  dislikePhoto,
  discommentedPhoto,
  getMorePhotos,
} = require("../controllers/PhotoController");

//Middlewares
const {
  photoInsertValidation,
  photoUpadateValidation,
  commentValidation,
} = require("../middlewares/PhotoValidation");
const authGuard = require("../middlewares/authGuard");
const validate = require("../middlewares/handleValidation");
const { imageUpload } = require("../middlewares/imageUpload");

console.log(photoInsertValidation);
//Routes
router.post(
  "/",
  authGuard,
  imageUpload.single("image"),
  photoInsertValidation(),
  validate,
  insertPhoto
);

router.delete("/:id", authGuard, deletePhoto);

router.get("/", authGuard, getAllPhotos);

router.get("/more", authGuard, getMorePhotos);

router.get("/user/:id", authGuard, getUserPhotos);

router.get("/search", authGuard, searchPhotos);

router.get("/:id", getPhotoById);

router.put("/:id", authGuard, photoUpadateValidation(), validate, updatePhoto);

router.put("/:id/dislike", authGuard, dislikePhoto);

router.put("/:id/like", authGuard, likePhoto);

router.delete("/:id/discommented/:commentId", authGuard, discommentedPhoto);

router.put(
  "/:id/comment",
  authGuard,
  commentValidation(),
  validate,
  commentPhoto
);

module.exports = router;
