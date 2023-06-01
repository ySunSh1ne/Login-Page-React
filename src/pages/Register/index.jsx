import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LayoutComponents } from "../../components/LayoutComponents";
import useAuth from "../../hooks/useAuth";

export const Register = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [emailConf, setEmailConf] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const storedError = localStorage.getItem("registerError");
    if (storedError) {
      setError(storedError);
      localStorage.removeItem("registerError");
    }
  }, []);

  useEffect(() => {
    localStorage.removeItem("loginError");
  }, []);

  const handleSignup = async () => {
    if (!email || !emailConf || !password) {
      setError("Preencha todos os campos");
      return;
    } else if (email !== emailConf) {
      setError("Os e-mails não são iguais");
      return;
    }

    const res = await signup(email, password);

    if (res && res.error) {
      setError(res.error);
      return;
    }

    alert("Usuário cadastrado com sucesso!");
    navigate("/");
  };

  useEffect(() => {
    if (error) {
      localStorage.setItem("registerError", error);
    }
  }, [error]);

  return (
    <LayoutComponents>
      <form className="login-form">
        <span className="login-form-title">Registro</span>

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
            className={emailConf !== "" ? "has-val input" : "input"}
            type="email"
            value={emailConf}
            onChange={(e) => setEmailConf(e.target.value)}
          />
          <span className="focus-input" data-placeholder="Confirme o Email"></span>
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

        <div className="error-message">{error && <p>{error}</p>}</div>

        <div className="container-login-form-btn">
          <button className="login-form-btn" onClick={handleSignup}>
            Registrar
          </button>
        </div>

        <div className="text-center">
          <span className="txt1">Já possui conta? </span>
          <Link className="txt2" to="/home">
            Acessar com Email e Senha.
          </Link>
        </div>
      </form>
    </LayoutComponents>
  );
};

export default Register;
