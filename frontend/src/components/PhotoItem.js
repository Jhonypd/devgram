import "./PhotoItem.scss";
import { uploads } from "../utils/config";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const PhotoItem = ({ photo }) => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="photo-item">
      <div className="pefil-photo">
        {user.profileImage ? (
          <img src={`${uploads}/users/${user.profileImage}`} alt={user.name} />
        ) : (
          <>
            <div className="not-image-profile">
              <p>{user.name ? user.name.charAt(0) : ""}</p>
            </div>
          </>
        )}
        <p className="photo-author">
          <Link to={`/users/${photo.userId}`}>{photo.userName}</Link>
        </p>
      </div>
      {photo.image && (
        <img src={`${uploads}/photos/${photo.image}`} alt={photo.title} />
      )}
      <h2>{photo.title}</h2>
    </div>
  );
};

export default PhotoItem;
