import { useScrollTrigger } from "@material-ui/core";
import React, { Component } from "react";
import {
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  ButtonGroup,
  Image,
  Container,
} from "react-bootstrap";
import { Link,useNavigate } from "react-router-dom";

import Logo from "../assets/logovertical.PNG";

import { useState } from "react";
import { Registro } from "../services/registro";

import { makeStyles } from "@material-ui/core/styles";

import Swal from "sweetalert2";
 
import { useForm } from "react-hook-form";
import Loading from "../components/Loading";

export default function RegistroView() {
  const history = useNavigate();
  var validacion = false;
  const [authPending, setAuthPending] = useState(false);
  const [value, setValue] = useState({
    clienteNombre: "",
    clienteApellido: "",
    clienteCorreo: "",
    clienteTipo: 3,
    password: "",
    clienteDocumento: "",
    clienteCelular: 0,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  class Test extends React.Component {
    onClick(event) {
      modalRegistro();
      Registarse();
    }
    render() {
      return (
        <a href="/" onClick={this.onClick}>
          Test Link
        </a>
      );
    }
  }
  const navigate = useNavigate();

  const modalRegistro = async () => {
    // anadirACarrito(articulo)
    const resultado = await Swal.fire({
      icon: "success",
      title: "Queda un último paso!",
      width: 600,
      padding: "3em",
      showConfirmButton: true,
      showDenyButton: true,
      denyButtonText: "Cancelar",
      confirmButtonText: "Sigamos!",
      background: "#ffff",
      backdrop: `
              rgba(0,0,123,0.4)
              url("https://sweetalert2.github.io/images/nyan-cat.gif")
              left center
              no-repeat
            `,
    });
    if (resultado.isConfirmed) {
      history.push("/");
    } else if (resultado.isDenied) {
      history.push("/");
    }
  };

  const [re, setRe] = useState(null);

  const crearUsuario = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
    console.log(value);
  };
  const Registarse = async (e) => {};
  const recibirSubmit = async (datos) => {
    datos.clienteTipo=3
    console.log(datos);
    try {
      //setRe(await Registro(datos));
      const resp = await Registro(datos)
      console.log(resp)
      console.log("entro")
      if(resp.message=="Error al crear el usuario"){
        setAuthPending(true); 
        navigate("/registroError")
        setAuthPending(false);
      }else{
        setAuthPending(true); 
        navigate("/iniciarSesion")
        setAuthPending(false);
      }
    } catch (error) {
        console.log("aaaaaaaaa")
        setAuthPending(true); 
        navigate("/registroError")
        setAuthPending(false);
    }
  };
  console.log(validacion);
  
  if (authPending) {
    return <Loading />;
  }
  return (
    <div style={{background:"linear-gradient(to right, rgb(195, 151, 197)   , rgb(0 91 252 / 73%))",height:"100vh",padding:"50px 200px"}}>
      <div className="row"  >
        <div className="col">
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginTop: "20px",
            }}
          >
            <div style={{ margin: "40px" }}>
              <ButtonGroup
                style={{
                  display: "flex",
                  justifyContent: "center !Important",
                  alignItems: "center ",
                  margin: "0 auto !important",
                  width: "350px",
                }}
              >
                <Button
                  href="/"
                  variant="link"
                  style={{
                    margin: "0 auto",
                    display: "flex",
                    justifyContent: "center",
                    position: "relative",
                    left: "50px",
                  }}
                >
                  <Image src={Logo} fluid />
                </Button>
              </ButtonGroup>
              <div
                style={{
                  color: "white",
             
                  textAlign: "center",

                  position: "relative",
                  right: "100px",
                }}
              >
                <h2>
                  Valoramos tu tiempo, por eso estaremos justo donde nos
                  necesites!
                </h2>
                <h2>Recibe, a tu manera! 🍔🛒 </h2>
              </div>
            </div>

            <div>
              <Form onSubmit={handleSubmit(recibirSubmit)}>
                <h1 className="text-center">
                  <span
                    className="font-weight-bold"
                    style={{ color: "white"  }}
                  >
                    Regístrate{" "}
                  </span>
                </h1>
                <FormGroup className="text-left" style={{padding:"5px 0"}}>
                  <label style={{color:"white",fontWeight:"bold"}}>Nombre</label>
                  <br />
                  <div>
                    <input
                      type="text"
                       
                      name="clienteNombre"
                      onChange={(e) => crearUsuario(e)}
                      style={{ width: "25vw", margin: "0 auto" }}
                      className="form-control"
                      {...register("clienteNombre", { required: true })}
                    />
                    {errors.clienteNombre && (
                      <small className="text-danger" style={{display:"flex",justifyContent:"left"}}>
                        Este campo es obligatorio
                      </small>
                    )}
                  </div>
                </FormGroup>
                <FormGroup className="text-left" style={{padding:"5px 0"}}>
                  <label style={{color:"white",fontWeight:"bold"}}>Apellido</label>
                  <br />
                  <input
                    type="text"
                    
                    name="clienteApellido"
                    style={{ width: "25vw", margin: "0 auto" }}
                    className="form-control"
                    onChange={(e) => crearUsuario(e)}
                    {...register("clienteApellido", { required: true })}
                  />
                  {errors.clienteApellido && (
                    <small className="text-danger" style={{display:"flex",justifyContent:"left"}}>
                      Este campo es obligatorio
                    </small>
                  )}
                </FormGroup>
                <FormGroup className="text-left" style={{padding:"5px 0"}}>
                  <label style={{color:"white",fontWeight:"bold"}}>Email</label>
                  <br />
                  <input
                    style={{ width: "25vw", margin: "0 auto" }}
                    className="form-control"
                    type="email"
                    
                    name="clienteCorreo"
                    onChange={(e) => crearUsuario(e)}
                    {...register("clienteCorreo", {
                      pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    })}
                  />
                  {errors.clienteCorreo && (
                    <small className="text-danger" style={{display:"flex",justifyContent:"left"}}>Formato incorrecto</small>
                  )}
                </FormGroup>
                <FormGroup className="text-left" style={{padding:"5px 0"}}>
                  <label style={{color:"white",fontWeight:"bold"}}>Contraseña</label>
                  <br />
                  <input
                    type="password"
                    style={{ width: "25vw", margin: "0 auto" }}
                    className="form-control"
                    
                    name="password"
                    onChange={(e) => crearUsuario(e)}
                    {...register("password", {
                      pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/,
                    })}
                  />
                  {errors.password && (
                    <small className="text-danger" style={{display:"flex",justifyContent:"left"}}>
                      Mínimo 5 caracteres y almenos un número
                    </small>
                  )}
                </FormGroup>
                <FormGroup className="text-left" style={{padding:"5px 0"}}>
                  <label style={{color:"white",fontWeight:"bold"}}>Numero de Celular</label>
                  <br />
                  <input
                    type="phone"
                    style={{ width: "25vw", margin: "0 auto" }}
                    className="form-control"
               
                    name="clienteCelular"
                    onChange={(e) => crearUsuario(e)}
                    {...register("clienteCelular", {
                      minLength: { value: 9, message: "Mínimo 9 dígitos" },
                      maxLength: { value: 14, message: "Máximo 14 dígitos" },
                    })}
                  />
                  {errors.clienteCelular && (
                    <small className="text-danger" style={{display:"flex",justifyContent:"left"}}>
                      {errors.clienteCelular.message}
                    </small>
                  )}
                </FormGroup>
                <FormGroup className="text-left" style={{padding:"5px 0"}}>
                  <label style={{color:"white",fontWeight:"bold"}}>Numero de Dni o extranjería</label>
                  <br />
                  <input
                    type="dni"
                    style={{ width: "25vw", margin: "0 auto" }}
                    className="form-control"
                     
                    name="clienteDocumento"
                    onChange={(e) => crearUsuario(e)}
                    {...register("clienteDocumento", {
                      minLength: { value: 7, message: "Se requiere 7 dígitos" },
                      maxLength: { value: 15, message: "Máximo 15 dígitos" },
                    })}
                  />
                  {errors.clienteDocumento && (
                    <small className="text-danger" style={{display:"flex",justifyContent:"left"}}>
                      {errors.clienteDocumento.message}
                    </small>
                  )}
                </FormGroup>
                <FormGroup
                  className="text-center"
                  style={{ textDecoration: "none" }}
                >
                  <br />
                  <button
                    type="submit"
                    className="btn-lg btn-block "
                    style={{
                      margin: "0 aut",
                      width: "25vw",
                      backgroundColor: "#0651F2",
                      border: "none",
                      textDecoration: "none",
                      color: "white",
                      padding:"10px",
                      borderRadius:"5px"
                    }}
                  >
                    Registrarse
                  </button>
                </FormGroup>

                <p
                  style={{
                    fontFamily: "cursive",
                    margin: "0 auto",
                    textAlign: "center",
                    paddingTop: "20px",
                  }}
                >
                  ¿Ya tienes una cuenta?{" "}
                  <a
                    href="/IniciarSesion"
                    style={{ textDecoration: "none", color: "blue" }}
                  >
                    Iniciar Sesión
                  </a>
                </p>
                <input
                    type="clienteTipo"
                    style={{ width: "25vw", margin: "0 auto",visibility:"hidden" }}
                    className="form-control"
                    placeholder="748*****"
                    disabled={true}
                    name="clienteTipo"
                    value={3}
                    onChange={(e) => crearUsuario(e)}
                    {...register("clienteTipo"  )}
                  />
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
