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
import { getPhoto } from "../../slices/photoSlice";

const Photo = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { user: userProfile } = useSelector((state) => state.user);
  const { photo, loading, error, message } = useSelector(
    (state) => state.photo
  );

  //comentarios

  //get photo data
  useEffect(() => {
    dispatch(getPhoto(id));
  }, [dispatch, id]);

  //likes

  if (loading) {
    return <Loading />;
  }
  return (
    <div id="photo">
      <PhotoItem photo={photo} />
    </div>
  );
};

export default Photo;
