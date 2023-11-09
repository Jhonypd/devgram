import "./Photo.scss";

import { uploads } from "../../utils/config";

//components
import Message from "../../components/Message";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import PhotoItem from "../../components/PhotoItem";

//hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

//redux
import { getPhoto, like } from "../../slices/photoSlice";
import LikeContainer from "../../components/LikeContainer";

const Photo = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { photo, loading, error, message } = useSelector(
    (state) => state.photo
  );

  //comentarios

  //get photo data
  useEffect(() => {
    dispatch(getPhoto(id));
  }, [dispatch, id]);

  //likes
  const handleLike = () => {
    dispatch(like(photo._id));
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <div id="photo">
      <PhotoItem photo={photo} />
      <LikeContainer photo={photo} user={user} handleLike={handleLike} />
      <div className="message-container">
        {error && <Message msg={error} type={"error"} />}
        {message && <Message msg={message} type={"success"} />}
      </div>
    </div>
  );
};

export default Photo;
