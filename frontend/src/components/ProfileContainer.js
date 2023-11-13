import "./ProfileContainer.scss";

const ProfileContainer = ({ userName, imageProfile, type }) => {
  return (
    <>
      <img src={imageProfile} alt={userName} className={type} />
    </>
  );
};

export default ProfileContainer;
