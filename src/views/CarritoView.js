import NavTop from "../components/NavTop";
import GroupProductsCarrito from "../components/ProductosCarrito";
import { CarritoContext } from "../context/carritoContext";
import IniciarSecionView from "./IniciarSecionView";
import { AuthReactContext } from "../context/reactAuthContext";
import { useForm } from "react-hook-form";
import { useState, UseEffect, useContext } from "react";
import { AuthContext } from "../context/authContext";
export default function CarritoView() {
  const { carrito } = useContext(CarritoContext);
  const signIn = useContext(AuthContext);
  const {userState} = useContext(AuthContext);
  const { Login } = useContext(AuthReactContext);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const recibirSubmit = (datos) => {
    console.log(datos);
  };
 
  const { user } = useContext(AuthReactContext);
  const [value, setValue] = useState({ clienteCorreo: "", password: "" });

  const crearUsuario = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };
  const inicioSesion = async (e) => {
    e.preventDefault();
    Login(value);
  };
  console.log(user);
  return (
    <div>
      
        <div className="container">
          <NavTop />

          <GroupProductsCarrito
            user={user}
            carrito={carrito}
            style={{ position: "relative", top: "150px !important" }}
          />
        </div>
     
    </div>
  );
}
