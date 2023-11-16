import "./Profile.scss";

import { uploads } from "../../utils/config";

// components
import Message from "../../components/Message";
import { Link, useParams } from "react-router-dom";
import { BsFillEyeFill, BsPencilFill, BsXLg } from "react-icons/bs";

//pages
import Loading from "../../components/Loading";

//hooks
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// Redux
import { getUserDetails } from "../../slices/userSlice";
import {
  publishPhoto,
  resetMessage,
  getUserPhotos,
  deletePhoto,
  updatePhoto,
} from "../../slices/photoSlice";
import LetterName from "../../components/LetterName";
import ProfileContainer from "../../components/ProfileContainer";

const Profile = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

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
  }, [dispatch, id]);

  const resetComponentMessage = () => {
    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  };

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

    resetComponentMessage();

    if (!messagePhoto) {
      setTimeout(() => {
        hideForm();
      }, 2500);
    }
  };

  // delete a photo
  const handleDelete = (id) => {
    dispatch(deletePhoto(id));

    resetComponentMessage();
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

    resetComponentMessage();

    console.log(errorPhoto);
    console.log(messagePhoto);

    if (!messagePhoto) {
      setTimeout(() => {
        hideForm();
      }, 2500);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div id="profile">
      <div className="profile-header">
        {user.profileImage ? (
          <ProfileContainer
            imageProfile={`${uploads}/users/${user.profileImage}`}
            userName={user.name}
            type={"profile-10"}
          />
        ) : (
          <>
            <LetterName userName={user.name} type={"profile-10"} />
          </>
        )}
        <div className="profile-description">
          <h2>{user.name}</h2>
          <p>{user.bio}</p>
        </div>
      </div>
      {id === userAuth._id && (
        <>
          <div className="new-post-btn" ref={btn}>
            <button onClick={handlePost}>Nova foto</button>
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
                <input type="submit" disabled value="Aguarde..." />
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

              <input type="submit" value={"Atualizar"} />
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
        <h2>Fotos publicadas:</h2>
        <div className="photos-container">
          {Array.isArray(photos) &&
            photos.length > 0 &&
            photos.map((photo) => (
              <div className="photo" key={photo.photoId}>
                {photo.image && (
                  <img
                    src={`${uploads}/photos/${photo.image}`}
                    alt={photo.title}
                  />
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
                  <Link className="btn" to={`/photos/${photo._id}`}>
                    Ver
                  </Link>
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
