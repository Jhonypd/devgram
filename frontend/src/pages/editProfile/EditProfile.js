import "./EditProfile.scss";

import { uploads } from "../../utils/config";

//hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

//Redux
import { profile, updateProfile, resetMessage } from "../../slices/userSlice";

//components
import Message from "../../components/Message";

const EditProfile = () => {
  const dispatch = useDispatch();

  const { user, message, error, loading } = useSelector((state) => state.user);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  //Load user data
  useEffect(() => {
    dispatch(profile());
  }, [dispatch]);

  //fill form with user data
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setBio(user.bio);
    }
  }, [user]);

  console.log(user);

  const handleSubmit = async (e) => {
    e.preventDefault();

    //gether user data from states
    const userData = {
      name,
    };

    console.log("userData:", userData);

    if (profileImage) {
      userData.profileImage = profileImage;
    }

    if (bio) {
      userData.bio = bio;
    }

    if (password) {
      userData.password = password;
    }

    console.log("userData (after conditional checks):", userData);

    //build from data
    const formData = new FormData();

    console.log("Keys of userData:", Object.keys(userData));

    // const userFormData = Object.keys(userData).forEach((key) =>
    //   formData.append(key, userData[key])
    // );
    for (const key in userData) {
      if (userData.hasOwnProperty(key)) {
        formData.append(key, userData[key]);
      }
    }

    console.log("userFormData:", formData);

    await dispatch(updateProfile(formData));

    console.log("formData:", formData);

    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  };

  const handleFile = (e) => {
    const image = e.target.files[0];

    setPreviewImage(image);

    setProfileImage(image);
  };

  return (
    <div id="edit-profile">
      <h2>Edite seus dados</h2>
      <p className="subtitle">
        Adcione uma imagem de perfil e conte mais sobre você...
      </p>

      {user.profileImage || previewImage ? (
        <img
          className="profile-image"
          src={
            previewImage
              ? URL.createObjectURL(previewImage)
              : `${uploads}/users/${user.profileImage}`
          }
          alt={user.name}
        />
      ) : (
        <div className="not-profile-image">
          <p>{user.name ? user.name.charAt(0) : ""}</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          onChange={(e) => setName(e.target.value)}
          value={name || ""}
        />
        <input type="text" placeholder="E-mail" disabled value={email || ""} />
        <label>
          <span>Imagem do perfil:</span>
          <input type="file" onChange={handleFile} />
        </label>
        <label>
          <span>Bio:</span>
          <input
            type="text"
            placeholder="Descrição do perfil"
            onChange={(e) => setBio(e.target.value)}
            value={bio || ""}
          />
        </label>
        <label>
          <span>Quer alterar sua senha?</span>
          <input
            type="password"
            placeholder="Digite sua nova senha"
            onChange={(e) => setPassword(e.target.value)}
            value={password || ""}
          />
        </label>
        {!loading && <input type="submit" value="Atualizar" />}
        {loading && <input type="submit" value="Aguarde..." disabled />}
        {error && <Message msg={error} type="error" />}
        {message && <Message msg={message} type="success" />}
      </form>
    </div>
  );
};

export default EditProfile;
