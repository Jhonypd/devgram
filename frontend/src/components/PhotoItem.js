import "./PhotoItem.scss";
import { uploads } from "../utils/config";

import { Link } from "react-router-dom";
//import { useSelector } from "react-redux";
import ProfileContainer from "./ProfileContainer";
import LetterName from "./LetterName";

const PhotoItem = ({ photo }) => {
  //const { user } = useSelector((state) => state.user);

  return (
    <div className="photo-item">
      <div className="profile-photo">
        {photo.photoUser ? (
          <ProfileContainer
            imageProfile={`${uploads}/users/${photo.photoUser}`}
            userName={photo.userName}
            type={"profile-5"}
          />
        ) : (
          <LetterName userName={photo.userName} type={"profile-l-5"} />
        )}

        <p className="photo-author">
          <Link to={`/users/${photo.userId}`}>{photo.userName}</Link>
        </p>
      </div>
      {photo.image && (
        <div className="photo">
          <img
            src={`${uploads}/photos/${photo.image}`}
            alt={photo.title}
            className="img-item"
          />
        </div>
      )}
      <h2>{photo.title}</h2>
    </div>
  );
};

export default PhotoItem;
