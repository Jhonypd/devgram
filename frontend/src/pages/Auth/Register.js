import "./Auth.scss";

//components
import { Link } from "react-router-dom";

//hooks
import { useEffect, useState } from "react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPasword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    const user = {
      name,
      email,
      password,
      confirmPasword,
    };
    console.log(user);
  };

  return (
    <div id="register">
      <h2>DevGram</h2>
      <p className="subtitle">Cadastre-se para ver as fotos dos seus amigos.</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          onChange={(e) => setName(e.target.value)}
          value={name || ""}
        />
        <input
          type="email"
          placeholder="E-mail"
          onChange={(e) => setEmail(e.target.value)}
          value={email || ""}
        />
        <input
          type="password"
          placeholder="Senha"
          onChange={(e) => setPassword(e.target.value)}
          value={password || ""}
        />
        <input
          type="password"
          placeholder="Confirme sua senha"
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPasword || ""}
        />
        <input type="submit" value="Cadastrar" />
      </form>
      <p>
        Já possui conta? <Link to={"/login"}>Clique aqui.</Link>
      </p>
    </div>
  );
};

export default Register;
