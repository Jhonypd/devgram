import React from "react";
import ProfileContainer from "./ProfileContainer";
import LetterName from "../NameUser/LetterName";

const ProfileAuth = ({ user, uploads }) => {
  return (
    <div className="profile-header">
      {user.profileImage ? (
        <ProfileContainer
          imageProfile={`${uploads}/users/${user.profileImage}`}
          userName={user.name}
          type={"profile-10"}
        />
      ) : (
        <>
          <LetterName userName={user.name} type={"profile-10"} />
        </>
      )}
      <div className="profile-description">
        <h2>{user.name}</h2>
        <p>{user.bio}</p>
      </div>
    </div>
  );
};

export default ProfileAuth;
