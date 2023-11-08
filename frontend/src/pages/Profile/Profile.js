import "./Profile.scss";

// components
import Message from "../../components/Message";
import { Link, useParams } from "react-router-dom";
import { BsFillEyeFill, BsPencilFill, BsXLg } from "react-icons/bs";

//pages
import Loading from "../Loading/Loading";

//hooks
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// Redux
import { getUserDetails } from "../../slices/userSlice";
import { uploads } from "../../utils/config";

const Profile = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.user);
  const { user: userAuth } = useSelector((state) => state.auth);

  //photo
  const newPhotoForm = useRef();
  const editPhotoForm = useRef();

  //Load user data
  useEffect(() => {
    dispatch(getUserDetails(id));
  }, [dispatch, id]);

  if (loading) {
    return <Loading />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div id="profile">
      <div className="profile-header">
        {user.profileImage ? (
          <img src={`${uploads}/users/${user.profileImage}`} alt={user.name} />
        ) : (
          <>
            <div className="not-image-profile">
              <p>{user.name ? user.name.charAt(0) : ""}</p>
            </div>
          </>
        )}
        <div className="profile-description">
          <h2>{user.name}</h2>
          <p>{user.bio}</p>
        </div>
      </div>
      {id === userAuth._id && (
        <>
          <div className="new-photo" ref={newPhotoForm}>
            <h3>Compartilhe seus momentos:</h3>
            <form onSubmit={handleSubmit}>
              <label>
                <span>Título pa sua foto:</span>
                <input type="text" placeholder="Insira um título" />
              </label>
              <label>
                <span>Imagem:</span>
                <input type="file" />
              </label>
              <input type="submit" value="Postar" />
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
