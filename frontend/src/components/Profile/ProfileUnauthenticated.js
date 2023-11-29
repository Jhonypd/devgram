import React from "react";
import ProfileContainer from "./ProfileContainer";
import LetterName from "../NameUser/LetterName";
import ProfileDeleted from "./ProfileDeleted";

const ProfileUnauthenticated = ({ user, uploads }) => {
  return (
    <div className="profile-header">
      {user ? (
        <>
          {user.profileImage && (
            <ProfileContainer
              imageProfile={`${uploads}/users/${user.profileImage}`}
              userName={user.name}
              type={"profile-10"}
            />
          )}

          {user.profileImage === "" && user.name && (
            <LetterName userName={user.name} type={"profile-10"} />
          )}

          {user.name && (
            <div className="profile-description">
              <h2>{user.name}</h2>
              <p>{user.bio}</p>
            </div>
          )}
        </>
      ) : (
        <ProfileDeleted />
      )}
    </div>
  );
};

export default ProfileUnauthenticated;
