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
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage";

//redux
import {
  dislike,
  getPhoto,
  like,
  comment,
  discommented,
} from "../../slices/photoSlice";
import LikeContainer from "../../components/LikeContainer";
import ProfileContainer from "../../components/ProfileContainer";
import LetterName from "../../components/LetterName";

const Photo = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const resetMessage = useResetComponentMessage(dispatch);

  const { user } = useSelector((state) => state.auth);
  const { photo, loading, error, message } = useSelector(
    (state) => state.photo
  );

  //comment to a photo
  const [commentText, setCommentText] = useState("");

  //get photo data
  useEffect(() => {
    dispatch(getPhoto(id));
  }, [dispatch, id]);

  //likes
  const handleLike = () => {
    dispatch(like(photo._id));
    resetMessage();
  };

  //deslike
  const handleDislike = () => {
    dispatch(dislike(photo._id));
  };

  //insert a comment
  const handleComment = (e) => {
    e.preventDefault();

    const commentData = {
      comment: commentText,
      id: photo._id,
    };

    dispatch(comment(commentData));

    setCommentText("");

    resetMessage();
  };

  const handleDiscommented = (comment) => {
    dispatch(discommented({ id: photo._id, comment }));
    resetMessage();
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <div id="photo">
      <PhotoItem photo={photo} />
      <LikeContainer
        photo={photo}
        user={user}
        handleLike={handleLike}
        handleDislike={handleDislike}
      />
      <div className="message-container">
        {error && <Message msg={error} type={"error"} />}
        {message && <Message msg={message} type={"success"} />}
      </div>
      <div className="comments">
        {photo.comments && (
          <>
            <h3>Comentários: ({photo.comments.length})</h3>
            <form onSubmit={handleComment}>
              <input
                type="text"
                placeholder="Comentar"
                onChange={(e) => setCommentText(e.target.value)}
                value={commentText || ""}
              />
              <input type="submit" value={"comentar"} />
            </form>
            {photo.comments.length === 0 && <p>Não há Comentários...</p>}
            {photo.comments.map((comment) => (
              <div className="comment" key={comment.commentId}>
                <div className="comment-header">
                  <div className="author">
                    {comment.userImage ? (
                      <ProfileContainer
                        userName={comment.userName}
                        imageProfile={`${uploads}/users/${comment.userImage}`}
                        type={"profile-4"}
                      />
                    ) : (
                      <LetterName userName={comment.userName} />
                    )}
                    <Link to={`/users/${comment.userId}`}>
                      <p>{comment.userName}</p>
                    </Link>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      handleDiscommented({ commentId: comment.commentId })
                    }>
                    <p>X</p>
                  </button>
                </div>
                <p>{comment.comment}</p>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Photo;
