import NavTop from "../components/NavTop";
import GroupProductsCarrito from "../components/ProductosCarrito";
import { CarritoContext } from "../context/carritoContext";
import IniciarSecionView from "./IniciarSecionView";
import { AuthReactContext } from "../context/reactAuthContext";
import { useForm } from "react-hook-form";
import { useState, useEffect, useRef, useContext } from "react";
import { AuthContext } from "../context/authContext";
import GroupProductsPedidos from "../components/PedidosUsuarioGroup";
import { ordenesCliente } from "../services/pedido";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
export default function BuscarPedidoUsuarioView() {
  const { carrito } = useContext(CarritoContext);
  const signIn = useContext(AuthContext);
  const { userState } = useContext(AuthContext);
  const { Login } = useContext(AuthReactContext);
  const [pedidos, setPedidos] = useState([]);
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
  const [authPending, setAuthPending] = useState(false);
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
      console.log(" userStorage.content.user_id");
      console.log(userStorage.content.user_id);
      setPedidos(productosObtenidos);
    } catch {
      console.log("error");
    }
  };
  useEffect(() => {
    getPedidos();
  }, []);
  const inputBusqueda = useRef();

  const ejecutarBusqueda = async () => {
    let miBusqueda = inputBusqueda.current.value;
    //aquí arriba se almacena todo lo que escribamos
    if (miBusqueda == "") {
      setAuthPending(true);
      let productosObtenidos = await ordenesCliente(0);
      setPedidos(productosObtenidos);
      setAuthPending(false);
    } else {
      setAuthPending(true);
      const productosFiltrados = await ordenesCliente(miBusqueda);
      setPedidos(productosFiltrados);
      setAuthPending(false);
    }
  };

  if (authPending) {
    return <Loading />;
  }
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  console.log(usuario);
  return (
    <div>
      {usuario.content.clienteTipo == 2 ? (
        <div className="container">
          <NavTop />
          <div style={{ position: "relative", top: "100px" }}>
            <div className="d-flex btn-lg my-2 mt-3 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Ingrese el ID que está en el correo recibido"
                ref={inputBusqueda}
              ></input>
              <button className="btn btn-dark" onClick={ejecutarBusqueda}>
                <i className="fas fa-search"></i>
              </button>
            </div>
          </div>
          <GroupProductsPedidos
            user={user}
            pedidos={pedidos}
            carrito={carrito}
            style={{ position: "relative", top: "150px !important" }}
          />
        </div>
      ) : (
        <Link to="/"></Link>
      )}
    </div>
  );
}
