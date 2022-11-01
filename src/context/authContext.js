import { useState, useEffect, createContext } from "react";
import { fire, auth, firebase } from "../config/Firebase";
import Loading from "../components/Loading";
import { registrarFirebase } from "../services/IniciarSesionGoogle";
const proveedorGoogle = new firebase.auth.GoogleAuthProvider();

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [userState, setUserState] = useState(null);
  const [authPending, setAuthPending] = useState(true);
  const infoGoogleUsuario = [];

  const signIn = async () => {
    const rpta = await auth.signInWithPopup(proveedorGoogle);
    console.log("soy googleeeeeeeeeeeeee", rpta);
  };

  const signOut = () => {
    auth.signOut();
  };

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      if (user != null) {
        const infoUsuario = {
          clienteNombre: user.displayName,
          clienteApellido: user.displayName,
          clienteCorreo: user.email,
          clienteTipo: 3,
          password: "",
          clienteDocumento: "",
          clienteCelular: 0,
        };
        infoGoogleUsuario.push({ content: infoUsuario });
        console.log("infoGoogleUsuario");
        console.log(infoGoogleUsuario);
        console.log("usergoogle");
        console.log(user);
        console.log(user.displayName);
        console.log(user.photoURL);
      }

      setUserState(user);

      setAuthPending(false);
    });
  });

  if (authPending) {
    return <Loading />;
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut, userState }}>
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;
