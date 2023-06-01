import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LayoutComponents } from "../../components/LayoutComponents";
import useAuth from "../../hooks/useAuth";

export const Login = () => {
  const { signin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const storedError = localStorage.getItem("loginError");
    if (storedError) {
      setError(storedError);
      localStorage.removeItem("loginError");
    }
  }, []);

  useEffect(() => {
    localStorage.removeItem("registerError");
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Preencha todos os campos");
      return;
    }
  
    try {
      const res = await signin(email, password);
  
      if (res === "Email ou senha incorretos") {
        setError(res);
        return;
      }
  
      if (res === "Outro erro") {
        setError("Mensagem de erro genérica");
        return;
      }
  
      navigate("/Home");
    } catch (error) {
      setError("Ocorreu um erro ao fazer login. Tente novamente mais tarde.");
    }
  };
  
  useEffect(() => {
    if (error) {
      localStorage.setItem("loginError", error);
    }
  }, [error]);
  

  return (
    <LayoutComponents>
      <form className="login-form">
        <span className="login-form-title">Login</span>

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

        <div className="error-message">{error && <p>{error}</p>}</div>

        <div className="container-login-form-btn">
          <button className="login-form-btn" onClick={handleLogin}>
            Login
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

export default Login;
