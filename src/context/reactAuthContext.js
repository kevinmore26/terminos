import React from "react";

import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

import { perfil_cliente } from "../services/perfilCliente";

import { login } from "../services/Iniciar_Sesion";

export const AuthReactContext = createContext();

export const AuthReactProvider = (props) => {
  const [token, setAuthToken] = useState(null);
  const [authPending, setAuthPending] = useState(false);
  const [user, setUser] = useState(null);
  console.log(user);

  const Login = async (data) => {
    const rpta = await login(data);
    setAuthToken(rpta.content.access);
    window.localStorage.setItem("token", JSON.stringify(rpta));
  };

  const Out = async () => {
    setAuthToken(null);
    setUser(null);

    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
    localStorage.removeItem("usuarioPedido");
    localStorage.removeItem("trafficLightTTL");
    localStorage.removeItem("trafficLightBase64");
    localStorage.removeItem("trafficLightWhitelist");
    localStorage.removeItem("trafficLightSendData");
  };
  useEffect(() => {
    const tokenStorage = JSON.parse(localStorage.getItem("token"));
    if (tokenStorage) {
      setAuthToken(tokenStorage.content.access);
    }
    const userStorage = JSON.parse(localStorage.getItem("usuario"));
    if (userStorage) {
      setUser(null);
      setUser(userStorage);
    }
  }, []);

  useEffect(async () => {
    const rpta2 = await perfil_cliente(token);
    setAuthPending(false);
    setUser(null);
    setUser(rpta2.content);
    window.localStorage.removeItem("usuario");
    window.localStorage.setItem("usuario", JSON.stringify([]));
    window.localStorage.removeItem("usuario");
    window.localStorage.setItem("usuario", JSON.stringify(rpta2));
  }, [token]);

  if (authPending) {
    return <Loading />;
  }

  return (
    <AuthReactContext.Provider value={{ Out, Login, token, user }}>
      {" "}
      {props.children}
    </AuthReactContext.Provider>
  );
};
