import React from "react";
import "./assets/global.css";
import { AuthProvider } from "./contexts/Authenticator";
import AppRouter from "./routes";

const App = () => {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
};

export default App;
