import "./Home.scss";

//components
import LikeContainer from "../../components/LikeContainer";
import PhotoItem from "../../components/PhotoItem";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";

//hooks
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage";

//redux
import { dislike, getPhotos, like } from "../../slices/photoSlice";

const Home = () => {
  const dispatch = useDispatch();

  const resetMessage = useResetComponentMessage(dispatch);

  const { user } = useSelector((state) => state.auth);

  const { photos, loading } = useSelector((state) => state.photo);

  console.log(photos);
  //loading all photos
  useEffect(() => {
    dispatch(getPhotos());
  }, [dispatch]);

  //lik a photos
  const handleLike = (photo) => {
    dispatch(like(photo._id));

    resetMessage();
  };

  const handleDislike = (photo) => {
    dispatch(dislike(photo._id));
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div id="home">
      {photos &&
        photos.map((photo) => (
          <div key={photo._id} className="photo-container">
            <PhotoItem photo={photo} />
            <LikeContainer
              photo={photo}
              user={user}
              handleDislike={handleDislike}
              handleLike={handleLike}
            />
          </div>
        ))}
      {photos && photos.length === 0 && (
        <h2 className="no-photos">
          Ainda não há fotos publicadas,{" "}
          <Link to={`/users/${user._id}`}>Clique aqui</Link>
        </h2>
      )}
    </div>
  );
};

export default Home;
