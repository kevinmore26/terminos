import { Container, Form } from "react-bootstrap";
import {
  AuthReactContext,
  AuthReactProvider,
} from "../context/reactAuthContext";
import { useContext, useEffect } from "react";
export default function FormProductoCheckout({
  value,
  manejarSubmit,
  actualizarInput,
}) {
  const { user } = useContext(AuthReactContext);
  const infoUsuarioPedido = [];
  console.log("user");
  console.log(user);
  console.log(value);
 
  window.localStorage.removeItem("usuario"); 
  window.localStorage.setItem("usuario", JSON.stringify([]));
  window.localStorage.removeItem("usuario");
  window.localStorage.setItem("usuario", JSON.stringify({ content: user }));
  return (
    <Container>
      <Form
        onSubmit={(e) => {
          manejarSubmit(e);
        }}
      >
        <div
          className="mb-2"
          style={{
            textAlign: "left",
          }}
        >
          <label className="form-label" style={{}}>
            Nombres{" "}
          </label>
          <input
            type="text"
            value={value.clienteNombre}
            className="form-control"
            name="clienteNombre"
            placeholder="Ej. Juanito"
            onChange={(e) => {
              actualizarInput(e);
            }}
            //{...register("nombre", {validaciones})}
          />
        </div>
        <div className="mb-2" style={{}}>
          <label className="form-label" style={{}}>
            Apellidos
          </label>
          <input
            type="text"
            name="clienteApellido"
            value={value.clienteApellido}
            className="form-control"
            onChange={(e) => {
              actualizarInput(e);
            }}
            placeholder="Ej. Alcachofa"
            //{...register("nombre", {validaciones})}
          />
        </div>

        <div
          className="mb-2"
          style={{
            textAlign: "left",
          }}
        >
          <label className="form-label" style={{}}>
            Número de celular
          </label>
          <input
            type="text"
            value={value.clienteCelular}
            name="clienteCelular"
            className="form-control"
            onChange={(e) => {
              actualizarInput(e);
            }}
            placeholder="Ej. +51 926707653"
          />
        </div>

        <div
          className="mb-2"
          style={{
            textAlign: "left",
          }}
        >
          <label className="form-label">Dirección</label>
          <input
            type="text"
            value={value.clienteDireccion}
            name="clienteDireccion"
            onChange={(e) => {
              actualizarInput(e);
            }}
            className="form-control"
            placeholder="Ej. Urb. Yanahuara S/N"
          />
        </div>

        <button
          className="btn col-12"
          to="/Checkout"
          style={{
            backgroundColor: "#0651F2",
            borderRadius: "5px",
            color: "white",

            display: "flex",
            justifyContent: "center",
            margin: "0 auto",
            marginTop: "20px",
            padding: "0px !Important",
            padding: "10px 0 ",
          }}
        >
          Agregar dirección
        </button>
        <h6
          style={{
            textAlign: "left",
            color: "#0651F2",
          }}
        >
          Los datos son recopilados al registrarse*
        </h6>
      </Form>
    </Container>
  );
}