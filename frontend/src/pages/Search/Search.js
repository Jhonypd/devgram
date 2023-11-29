import "./Search.scss";

//hooks
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

//components
import { Link } from "react-router-dom";
import Loading from "../../components/Loading/Loading";

//redux
import { searchPhotos } from "../../slices/photoSlice";
import { useQuery } from "../../hooks/useQuery";
import { Grid } from "react-loader-spinner";
import PhotoItemSearch from "../../components/Photo/PhotoItemSearch";

const Search = () => {
  const query = useQuery();
  const search = query.get("q");

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { photos, loading } = useSelector((state) => state.photo);

  // load photos
  useEffect(() => {
    dispatch(searchPhotos(search));
  }, [dispatch, search]);

  if (loading) {
    return (
      <Loading>
        <Grid color="#fff" wrapperClass="loading" />;
      </Loading>
    );
  }
  return (
    <div id="search">
      <h2>
        Resultados para <strong>"{search}"</strong>
      </h2>
      <div className="photo-container-search">
        {photos &&
          photos.map((photo) => (
            <Link
              key={photo._id}
              className="photo-link"
              to={`/photos/${photo._id}`}>
              <PhotoItemSearch photo={photo} />
            </Link>
          ))}
      </div>
      {photos && photos.length === 0 && (
        <p className="no-photos">
          Não encontramos nenhum resultado para <strong>"{search}"</strong>...{" "}
          <br />
          <br />
          <Link className="btn outline" to={"/"}>
            Voltar
          </Link>
        </p>
      )}
    </div>
  );
};

export default Search;
