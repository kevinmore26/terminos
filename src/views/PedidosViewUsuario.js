import NavTop from "../components/NavTop";
import GroupProductsCarrito from "../components/ProductosCarrito";
import { CarritoContext } from "../context/carritoContext";
import IniciarSecionView from "./IniciarSecionView";
import { AuthReactContext } from "../context/reactAuthContext";
import { useForm } from "react-hook-form";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/authContext";
import GroupProductsPedidos from "../components/PedidosUsuarioGroup";
import { ordenesCliente } from "../services/pedido";
export default function CarritoView() {
  const { carrito } = useContext(CarritoContext);
  const signIn = useContext(AuthContext);
  const { userState } = useContext(AuthContext);
  const { Login } = useContext(AuthReactContext);
  const [pedidos,setPedidos] = useState([])
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
  const getPedidos = async () => {
    try {
      const userStorage = JSON.parse(localStorage.getItem("usuario"));
      let productosObtenidos = await ordenesCliente(
        userStorage.content.user_id
      ); 
      console.log(" userStorage.content.user_id")
      console.log( userStorage.content.user_id)
      setPedidos(productosObtenidos);
    } catch {
      console.log("error");
    }
  };
  useEffect(() => {
    getPedidos();
  }, []);

  return (
    <div>
      <div className="container">
        <NavTop />

        <GroupProductsPedidos
          user={user}
          pedidos={pedidos}
          carrito={carrito}
          style={{ position: "relative", top: "150px !important" }}
        />
      </div>
    </div>
  );
}
