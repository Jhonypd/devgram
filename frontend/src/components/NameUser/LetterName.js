import "./LetterName.scss";

const LetterName = ({ userName, type }) => {
  return (
    <div className={`${type} not-profile-image`}>
      <p>{userName ? userName.charAt(0) : ""}</p>
    </div>
  );
};

export default LetterName;
