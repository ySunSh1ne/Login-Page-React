import { useContext } from "react";
import { AuthContext } from "../contexts/Authenticator";

const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

export default useAuth;
