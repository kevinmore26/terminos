import { useState, useEffect, useReducer, useContext } from "react";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CarritoContext } from "../context/carritoContext";
import Loading from "./Loading";
import {
  AuthReactContext,
  AuthReactProvider,
} from "../context/reactAuthContext";
export default function GroupProductsPedidos({ carrito, pedidos }) {
  const { limpiarCarrito, actualizarCarritoContext } =
    useContext(CarritoContext);
  const [producto, setProducto] = useState([]);
  const [authPending, setAuthPending] = useState(false);
  const { user } = useContext(AuthReactContext);

  const actualizarCarrito = () => {
    setAuthPending(true);
    actualizarCarritoContext(producto);
    setAuthPending(false);
  };

  console.log(pedidos);
  console.log(carrito);
  let total = 0;
  let envio = 6;
  let subtotal = 0;
  useEffect(() => {
    setAuthPending(true);
    console.log(pedidos);
    setAuthPending(false);
  }, [pedidos]);
  total = carrito.reduce((acum, item) => {
    return acum + item.cantidad * item.productoPrecio;
  }, 0);
  subtotal = carrito.reduce((acum, item) => {
    return acum + item.cantidad * item.productoPrecio;
  }, 0);
  let totalComprado = 0;
  totalComprado = carrito.reduce((acum, item) => {
    return acum + item.cantidad;
  }, 0);
  let totalTotal = total + envio;
  if (authPending) {
    return <Loading />;
  }
  return (
    <Container style={{ position: "relative", top: "100px" }}>
      <div style={{ display: "flex" }}>
        <div style={{ width: "100%", padding: "30px" }}>
          <div className="row">
            <h4
              style={{ fontWeight: "bold", color: "rgb(106, 105, 110)" }}
              className="col-12"
            >
              Historial pedidos:
            </h4>
          </div>
          <hr></hr>
          {pedidos.map((pedi, i) => (
            <div
              style={{ display: "flex", padding: "10px" }}
              key={i}
              className="row"
            >
              <h5>Fecha : {pedi.pedidoFecha}</h5>
              <div className="row">
                <div className="col-5 "></div>
              </div>
              <div className="row">
                <div className="col-10 " style={{ display: "flex" }}>
                  {pedi.pedidoDetalles.map((detalles, i) => (
                    <div>
                      {" "}
                     
                      <div
                        key={i}
                        className="d-flex"
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <img
                          src={detalles.producto.productoFoto}
                          alt={detalles.producto.productoFoto}
                          className="card-img-top col-md-10 col-xs-10 "
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            margin: "0 auto",
                            width: "200px",
                            height: "200px",
                            margin: "10px",
                            borderRadius: "50%",
                            objectFit: "cover",
                          }}
                        />{" "}
                        <div
                          className="col-2"
                          style={{
                            textDecoration: "none",
                            background: "white",
                            width: "70px",
                            height: "70px",
                            color: "black",
                            borderRadius: "50%",
                            position: "relative",
                            right: "10px",
                            boxShadow:
                              "0 4px 6px rgb(50 50 93 / 11%), 0 1px 3px rgb(0 0 0 / 8%)",
                          }}
                        >
                          <p
                            style={{
                              position: "relative",
                              top: "20px",
                              left: "5px",
                              fontWeight: "bold",
                            }}
                          >
                            S/{detalles.detalleSubTotal}
                          </p>
                          <p
                            style={{
                              position: "relative",
                              top: "120px",
                              left: "5px",
                              fontWeight: "bold",
                            }}
                          >
                            x{detalles.detalleCantidad}
                          </p>
                        </div>
                      </div>
                      <p style={{textAlign:"left",fontWeight:"bold"}}>{detalles.producto.productoNombre}</p>
                    </div>
                  ))}{" "}
                </div>

                <h4
                  className="col-2"
                  style={{ fontWeight: "bold", color: "rgb(106, 105, 110)" }}
                >
                  <p style={{ color: "rgb(106, 105, 110)", fontSize: "14px" }}>
                    Subtotal: S/{parseInt(pedi.pedidoTotal)}{" "}
                  </p>
                  <p style={{ color: "rgb(106, 105, 110)", fontSize: "14px" }}>
                    Envío: S/6
                  </p>
                  <p style={{ color: "black" }}>
                    Total: S/{parseInt(pedi.pedidoTotal) + 6}
                  </p>
                </h4>
              </div>
              <hr></hr>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
