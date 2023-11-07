import "./Auth.scss";

//components
import { Link } from "react-router-dom";
import Message from "../../components/Message";

//hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

//redux
import { register, reset, checkApiConnection } from "../../slices/authSlice";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorApi, setErrorApi] = useState("");

  const dispatch = useDispatch();

  const { loading, error, apiConnection } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!apiConnection) {
      setErrorApi(
        "Erro: Falha ao tentar se conectar ao servidor. Tente novamente mais tarde."
      );
      return;
    }

    const user = {
      name,
      email,
      password,
      confirmPassword,
    };

    dispatch(register(user));
    console.log(error);
  };

  // Clean all auth states
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  // Dispatch the action to check API connection
  useEffect(() => {
    dispatch(checkApiConnection());
  }, [dispatch]);

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
          value={confirmPassword || ""}
        />
        {!loading && <input type="submit" value="Cadastrar" />}
        {loading && <input type="submit" value="Aguarde..." disabled />}
        {error && <Message msg={error} type="error" />}
        {errorApi && <Message msg={errorApi} type="error" />}
      </form>
      <p>
        Já possui conta? <Link to={"/login"}>Clique aqui.</Link>
      </p>
    </div>
  );
};

export default Register;
