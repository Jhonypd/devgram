import "./LikeContainer.scss";

import { BsHeart, BsHeartFill } from "react-icons/bs";

import { Link } from "react-router-dom";

const LikeContainer = ({ photo, user, handleDislike, handleLike }) => {
  return (
    <>
      {photo.likes && user && (
        <>
          {photo.likes.includes(user._id) ? (
            <BsHeartFill onClick={() => handleDislike(photo)} />
          ) : (
            <BsHeart onClick={() => handleLike(photo)} />
          )}
          <p>{photo.likes.length} likes</p>
        </>
      )}
    </>
  );
};

export default LikeContainer;
