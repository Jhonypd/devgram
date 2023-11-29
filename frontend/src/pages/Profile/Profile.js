import "./Profile.scss";

import { uploads } from "../../utils/config";

// components
import Message from "../../components/Message/Message";
import { Link, useParams } from "react-router-dom";
import {
  BsFillEyeFill,
  BsFillPlusSquareFill,
  BsGrid3X2GapFill,
  BsPencilFill,
  BsXLg,
} from "react-icons/bs";
import { Grid, TailSpin, ThreeDots } from "react-loader-spinner";
import LetterName from "../../components/NameUser/LetterName";
import ProfileContainer from "../../components/Profile/ProfileContainer";
import ProfileDeleted from "../../components/Profile/ProfileDeleted";

//pages
import Loading from "../../components/Loading/Loading";

//hooks
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage";

// Redux
import { getUserDetails } from "../../slices/userSlice";
import {
  publishPhoto,
  getUserPhotos,
  deletePhoto,
  updatePhoto,
  resetPhotos,
} from "../../slices/photoSlice";
import ProfileUnauthenticated from "../../components/Profile/ProfileUnauthenticated";
import ProfileAuth from "../../components/Profile/ProfileAuth";

const Profile = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const resetMessage = useResetComponentMessage(dispatch);

  const { user, loading } = useSelector((state) => state.user);
  const { user: userAuth } = useSelector((state) => state.auth);
  const {
    photos,
    loading: loadingPhoto,
    message: messagePhoto,
    error: errorPhoto,
  } = useSelector((state) => state.photo);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");

  const [editId, setEditId] = useState("");
  const [editImage, setEditImage] = useState("");
  const [editTitle, setEditTitle] = useState("");

  //new form and edit form refs
  const newPhotoForm = useRef();
  const editPhotoForm = useRef();
  const btn = useRef();

  //Load user data
  useEffect(() => {
    dispatch(getUserDetails(id));

    dispatch(getUserPhotos(id));

    return () => {
      dispatch(resetPhotos());
    };
  }, [dispatch, id]);

  // change image state
  const handleFile = (e) => {
    const image = e.target.files[0];

    setImage(image);
  };

  const submitHandle = (e) => {
    e.preventDefault();

    const photoData = {
      title,
      image,
    };

    // build form data
    const formData = new FormData();

    const photoFormData = Object.keys(photoData).forEach((key) =>
      formData.append(key, photoData[key])
    );

    formData.append("photo", photoFormData);

    dispatch(publishPhoto(formData));

    setTitle("");

    resetMessage();

    if (!messagePhoto) {
      setTimeout(() => {
        hideForm();
      }, 2500);
    }
  };

  // delete a photo
  const handleDelete = (id) => {
    dispatch(deletePhoto(id));

    resetMessage();
  };

  //show or hide forms
  const hideOrShowForm = (formToShow, formToHide, btnPhoto) => {
    formToShow.current.classList.remove("hide");

    formToHide.current.classList.add("hide");

    btnPhoto.current.classList.add("hide");
  };

  const hideForm = () => {
    newPhotoForm.current.classList.add("hide");

    editPhotoForm.current.classList.add("hide");

    btn.current.classList.remove("hide");
  };

  //open edit form
  const handleEdit = (photo) => {
    if (editPhotoForm.current.classList.contains("hide")) {
      hideOrShowForm(editPhotoForm, newPhotoForm, btn);
    }
    setEditId(photo._id);
    setEditTitle(photo.title);
    setEditImage(photo.image);
  };

  // show new photo
  const handlePost = () => {
    hideOrShowForm(newPhotoForm, editPhotoForm, btn);
  };
  // cancel edit a photo
  const handleCancelEdit = () => {
    hideForm();
  };

  // update a photo
  const handleUpdate = (e) => {
    e.preventDefault();

    const photoData = {
      title: editTitle,
      id: editId,
    };

    dispatch(updatePhoto(photoData));

    resetMessage();

    if (!messagePhoto) {
      setTimeout(() => {
        hideForm();
      }, 2500);
    }
  };

  if (loading) {
    return (
      <Loading>
        <Grid wrapperClass="loading" color="#fff" />
      </Loading>
    );
  }

  return (
    <div id="profile">
      {id !== userAuth._id && (
        <ProfileUnauthenticated user={user} uploads={uploads} />
      )}

      {id === userAuth._id && <ProfileAuth user={user} uploads={uploads} />}

      {id === userAuth._id && (
        <>
          <div className="new-post-btn" ref={btn}>
            <button onClick={handlePost}>
              <span>
                <BsFillPlusSquareFill />{" "}
              </span>
            </button>
          </div>
          <div className="new-photo hide" ref={newPhotoForm}>
            <div className="nav-form">
              <h3>Compartilhe seus momentos:</h3>
              <button onClick={handleCancelEdit} className="cancel-post-btn">
                Cancelar
              </button>
            </div>
            <form onSubmit={submitHandle}>
              <label>
                <span>Título pa sua foto:</span>
                <input
                  type="text"
                  placeholder="Insira um título"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title || ""}
                />
              </label>
              <label>
                <span>Imagem:</span>
                <input type="file" onChange={handleFile} />
              </label>

              {!loadingPhoto && <input type="submit" value="Postar" />}
              {loadingPhoto && (
                <TailSpin
                  color="#fff"
                  radius={2}
                  height={30}
                  width={30}
                  wrapperClass="uploading"
                />
              )}
            </form>
          </div>

          <div className="edit-photo hide" ref={editPhotoForm}>
            <p>Editando:</p>
            {editImage && (
              <img src={`${uploads}/photos/${editImage}`} alt={editTitle} />
            )}
            <form onSubmit={handleUpdate}>
              <input
                type="text"
                onChange={(e) => setEditTitle(e.target.value)}
                value={editTitle || ""}
              />

              {!loadingPhoto && <input type="submit" value={"Atualizar"} />}
              {loadingPhoto && (
                <ThreeDots
                  color="#fff"
                  radius={4}
                  height={30}
                  width={30}
                  wrapperClass="uploading"
                />
              )}
              <button
                type="button"
                className="cancel-btn"
                onClick={handleCancelEdit}>
                Cancelar
              </button>
            </form>
          </div>
          {errorPhoto && <Message msg={errorPhoto} type="error" />}
          {messagePhoto && <Message msg={messagePhoto} type="success" />}
        </>
      )}

      <div className="user-photos">
        <div className="user-photos-header">
          <BsGrid3X2GapFill />
        </div>
        <div className="photos-container">
          {photos &&
            photos.map((photo) => (
              <div className="photo" key={photo.photoId}>
                {photo.image && photo.userId === userAuth._id ? (
                  <img
                    src={`${uploads}/photos/${photo.image}`}
                    alt={photo.title}
                  />
                ) : (
                  <Link to={`/photos/${photo._id}`}>
                    <img
                      src={`${uploads}/photos/${photo.image}`}
                      alt={photo.title}
                      className="photo-item"
                    />
                  </Link>
                )}
                {id === userAuth._id ? (
                  <div className="actions">
                    <Link to={`/photos/${photo._id}`}>
                      <BsFillEyeFill />
                    </Link>
                    <BsPencilFill onClick={() => handleEdit(photo)} />
                    <BsXLg
                      type="button"
                      onClick={() => handleDelete(photo._id)}
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>
            ))}
          {photos.length === 0 && <p>Ainda não há fotos publicadas!</p>}
        </div>
      </div>
    </div>
  );
};

export default Profile;
