import "./PhotoItem.scss";
import { uploads } from "../../utils/config";

const PhotoItemSearch = ({ photo }) => {
  return (
    <>
      {photo.image && (
        <img src={`${uploads}/photos/${photo.image}`} alt={photo.title} />
      )}
    </>
  );
};

export default PhotoItemSearch;
