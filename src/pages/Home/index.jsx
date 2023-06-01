import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LayoutComponents } from "../../components/LayoutComponents";
import useAuth from "../../hooks/useAuth";

export const Home = () => {
  const {signin} = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false); // Novo estado para controlar a exibição da mensagem de erro
  const [password, setPassword] = useState("");

  const handleSignin = async () => {
    if (!email || !password) {
      setError("Preencha todos os campos");
      setShowError(true); // Exibir a mensagem de erro
      return;
    }

    const res = await signin(email, password);

    if (res.error) {
      setError(res.error);
      setShowError(true); // Exibir a mensagem de erro
      return;
    }

    navigate("/Home");
  };

  return (
    <LayoutComponents>
      <form className="Home-form">
        <span className="Home-form-title">Home</span>

        <div className="wrap-input">
          <input
            className={email !== "" ? "has-val input" : "input"}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <span className="focus-input" data-placeholder="Email"></span>
        </div>

        <div className="wrap-input">
          <input
            className={password !== "" ? "has-val input" : "input"}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="focus-input" data-placeholder="Password"></span>
        </div>
        {showError && <span className="label-error">{error}</span>}

        <div className="container-Home-form-btn">
          <button className="Home-form-btn" onClick={handleSignin}>
            Home
          </button>
        </div>

        <div className="text-center">
          <span className="txt1">Não possui conta? </span>
          <Link className="txt2" to="/register">
            Criar conta.
          </Link>
        </div>
      </form>
    </LayoutComponents>
  );
};

export default Home;
