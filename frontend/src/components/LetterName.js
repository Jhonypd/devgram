import "./LetterName.scss";

const LetterName = ({ userName }) => {
  return (
    <div className="not-profile-image">
      <p>{userName ? userName.charAt(0) : ""}</p>
    </div>
  );
};

export default LetterName;
