import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  ButtonGroup,
  Image,
} from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import Logo from "../assets/logovertical.PNG";
import { useForm } from "react-hook-form";
import { useState, UseEffect, useContext } from "react";
import { AuthContext } from "../context/authContext";
import Narvbar from "../components/NavTop";
import { login } from "../services/Iniciar_Sesion";
import { perfil_cliente } from "../services/perfilCliente";
import { AuthReactContext } from "../context/reactAuthContext";

export default function IniciarSecionErrorView() {
  const { signIn } = useContext(AuthContext);
  const { userState } = useContext(AuthContext);
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
    try {
      if (value.clienteCorreo == "" || value.password == "") {
        console.log("error vaciooo");
      }
      const rpta = await login(value);
      console.log(rpta);
      Login(value);
    } catch (error) {
      console.log("errrooooooooooor");
    }
  };

  return (
    <div style={{background:"linear-gradient(to right, rgb(195, 151, 197), rgb(0 91 252 / 73%))",height:"100vh"}}>
      <div>
        <ButtonGroup style={{ display: "flex", justifyContent: "center" }}>
          <Button href="/" variant="link">
            <Image
              src={Logo}
              fluid
              style={{ width: "250px", marginTop: "60px" }}
            />
          </Button>
        </ButtonGroup>
      </div>
      {userState == null && user == null && (
        <div >
          <Form
            className="login-form"
            style={{ margin: "20px" }}
            //  onSubmit={(e)=>{obtenerDatosPerfil(e)}}
          >
            <h1 className="text-center">
              <span className="font-weight-bold">Inicia Sesión</span>
            </h1>
            <FormGroup className="text-center">
              <label>Email</label>
              <br />
              <input
                className="form-control"
                type="email"
                placeholder="Email"
                name="clienteCorreo"
                value={value.clienteCorreo}
                onChange={(e) => crearUsuario(e)}
                style={{ width: "25vw", margin: "0 auto" }}
              ></input>
            </FormGroup>
            <FormGroup
              className="text-center"
              onSubmit={handleSubmit(recibirSubmit)}
            >
              <label>Contraseña</label>
              <br />
              <input
                type="password"
                placeholder="password"
                className="form-control"
                name="password"
                onChange={(e) => crearUsuario(e)}
                style={{ width: "25vw", margin: "0 auto" }}
              >
                {errors.nombreCompleto && (
                  <small className="text-danger" style={{display:"flex",justifyContent:"left"}}>
                    
                    Este campo es obligatorio
                  </small>
                )}
              </input>
            </FormGroup>

            <FormGroup className="text-center" style={{ margin: "20px" }}>
              <Button
                className="btn-lg btn-dark btn-block "
                type="submit"
                onClick={inicioSesion}
                style={{ width: "25vw",backgroundColor:"#0059FF",border:"none" }}
              >
                Iniciar Sesión
              </Button>
            </FormGroup>
          </Form>
          <div
            className="
                      d-flex justify-content-center
                      "
          >
            <button
              className="btn btn-danger btn-lg"
              style={{ margin: "0 aut", width: "25vw",backgroundColor:"rgb(34 34 36)",border:"none" }}
              onClick={signIn}
            >
              <i className="fab fa-google me-2" />
              Ingresa con google
            </button>
          </div>
          <p
            style={{
              fontFamily: "cursive",
              margin: "0 auto",
              textAlign: "center",
              paddingTop: "20px",
            }}
          >
            ¿No tienes una cuenta?{" "}
            <a
              href="/registro"
              style={{ textDecoration: "none", color: "blue" }}
            >
              Crear cuenta
            </a>
          </p>
          <div
            type="submit"
            onClick={inicioSesion}
            style={{
              width: "25vw",
              margin: "0 auto",
              backgroundColor: "#f27474",
              padding: "15px",
              color: "white",
              borderRadius: "5px",
              marginTop:"20PX"
            }}
          >
            <p
              style={{
                margin: "0 auto",
                textAlign: "center",
              }}
            >
              CREDENCIALES INCORRECTAS
            </p>
          </div>
        </div>
      )}
      {user != null && <Navigate to="/"></Navigate>}
      {userState != null && <Navigate to="/"></Navigate>}
    </div>
  );
}
