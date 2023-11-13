import "./PhotoItem.scss";
import { uploads } from "../utils/config";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileContainer from "./ProfileContainer";
import LetterName from "./LetterName";

const PhotoItem = ({ photo }) => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="photo-item">
      <div className="pefil-photo">
        {user.profileImage ? (
          <ProfileContainer
            imageProfile={`${uploads}/users/${user.profileImage}`}
            userName={user.name}
            type={"profile-5"}
          />
        ) : (
          <LetterName userName={user.name} />
        )}
        <p className="photo-author">
          <Link to={`/users/${photo.userId}`}>{photo.userName}</Link>
        </p>
      </div>
      {photo.image && (
        <img
          src={`${uploads}/photos/${photo.image}`}
          alt={photo.title}
          className="img-item"
        />
      )}
      <h2>{photo.title}</h2>
    </div>
  );
};

export default PhotoItem;
