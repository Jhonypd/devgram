import LetterName from "./LetterName";
import "./ProfileDeleted.scss";

const ProfileDeleted = () => {
  return (
    <>
      <LetterName userName="" type={"profile-10 prof-block"} />
      <div className="profile-description desc-block">
        <h2 className="h2">Usuário não encontrado</h2>
      </div>
    </>
  );
};

export default ProfileDeleted;
