import { useState, useEffect, useReducer, useContext } from "react";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CarritoContext } from "../context/carritoContext";
import Loading from "./Loading";
import {
  AuthReactContext,
  AuthReactProvider,
} from "../context/reactAuthContext";
export default function GroupProductsCarrito({ carrito }) {
  const { limpiarCarrito, actualizarCarritoContext } =
    useContext(CarritoContext);
  const [producto, setProducto] = useState([]);
  const [authPending, setAuthPending] = useState(false);
  const { user } = useContext(AuthReactContext);
  console.log(user);
  const limpiarCarritoContext = () => {
    console.log(producto);
    setAuthPending(true);
    limpiarCarrito(producto);
    setAuthPending(false);
  };
  const actualizarCarrito = () => {
    setAuthPending(true);
    actualizarCarritoContext(producto);
    setAuthPending(false);
  };

  console.log(producto);
  console.log(carrito);
  let total = 0;
  let envio = 6;
  let subtotal = 0;

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
    <Container style={{ position: "relative", top: "100px", display: "flex" }}>
      <div style={{ display: "flex" }}>
        <div style={{ width: "100%", padding: "30px" }}>
          <div className="row">
            <h4
              style={{ fontWeight: "bold", color: "rgb(106, 105, 110)" }}
              className="col-9"
            >
              CARRITO DE COMPRAS
            </h4>
            <Button
              className="col-2"
              onClick={limpiarCarritoContext}
              style={{ backgroundColor: "#0651F2" }}
            >
              Vaciar carrito
            </Button>
          </div>
          <hr></hr>
          {carrito.map((prod, i) => (
            <div
              style={{ display: "flex", padding: "10px" }}
              key={i}
              className="row"
            >
              <div className="col-3">
                <img
                  src={prod.productoFoto}
                  alt={prod.productoFoto}
                  className="card-img-top"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "0 auto",
                  }}
                />
              </div>

              <div className="col-5 ">
                <h5>{prod.productoNombre}</h5>
                <p>{prod.productoDescripcion}</p>
                <h4 style={{ fontWeight: "bold", color: "#0651F2" }}>
                  S/{prod.productoPrecio}
                </h4>
              </div>
              <div className=" col-3  ">
                <p
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Cantidad
                </p>
                <div
                  className="row "
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Button
                    className="col-2"
                    style={{ backgroundColor: "rgb(34 34 36)", border: "none" }}
                    onClick={() => {
                      console.log(carrito[i]);
                      if (prod.cantidad > 1) {
                        carrito[i].cantidad = carrito[i].cantidad - 1;
                        setProducto(carrito);
                        setProducto(carrito[i]);
                        setProducto(carrito[i].cantidad);
                        actualizarCarrito();
                      } else {
                        carrito[i].cantidad = 1;
                      }
                    }}
                  >
                    -
                  </Button>
                  <h6
                    className="col-2"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {prod.cantidad}
                  </h6>
                  <Button
                    className="col-2"
                    style={{ backgroundColor: "rgb(34 34 36)", border: "none" }}
                    onClick={() => {
                      console.log(carrito[i]);
                      carrito[i].cantidad = carrito[i].cantidad + 1;

                      setProducto(carrito);
                      setProducto(carrito[i]);
                      setProducto(carrito[i].cantidad);
                      actualizarCarrito();
                    }}
                  >
                    +
                  </Button>
                </div>
              </div>
              <div className=" col-1">
                <button
                  style={{
                    border: "none",
                    backgroundColor: "transparent",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                    top: "45px",
                    color: "red",
                  }}
                  onClick={() => {
                    console.log("eliminando");
                    carrito.splice(i, 1);
                    setProducto(carrito);
                    setProducto(carrito[i]);
                    actualizarCarrito();
                  }}
                >
                  <i
                    className="fas fa-trash text-black"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  ></i>
                </button>
              </div>
              <hr></hr>
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          width: "35%",
          boxShadow: "0 4px 6px rgb(50 50 93 / 11%), 0 1px 3px rgb(0 0 0 / 8%)",
          padding: "30px",
          maxHeight: "340px",
          backgroundColor: "#F2F2F2",
          marginTop:"50px"
        }}
      >
        <div
          style={{
            textAlign: "center",
            fontWeight: "bold",
            color: "rgb(106, 105, 110)",
          }}
        >
          RESUMEN DE LA ORDEN
        </div>

        {total !== 0 ? (
          <div>
            <hr></hr>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p>SubTotal({totalComprado})</p>
              <p>S/{subtotal.toFixed(2)}</p>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p>Envío </p>
              <p>S/6.00</p>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h6 style={{ fontWeight: "bold", color: "#0651F2" }}>TOTAL </h6>

              <h6 style={{ fontWeight: "bold" }}>S/{totalTotal.toFixed(2)}</h6>
            </div>{" "}
            <hr></hr>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "0 auto",
              }}
            >
              <Link to="/checkout" user={user}>
                <button
                  className="btn"
                  style={{
                    backgroundColor: "#0651F2",
                    borderRadius: "5px",
                    color: "white",
                    padding: "10px 30px",
                    fontWeight: "400",
                    margin: "0 auto",
                  }}
                >
                  Procesar
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <hr></hr>
            <h6
              style={{
                fontWeight: "bold",
                color: "#0651F2",
                textAlign: "center",
                marginTop: "20px",
              }}
            >
              {" "}
              Todavía no ha agregado ningún producto.{" "}
            </h6>
          </div>
        )}
      </div>
    </Container>
  );
}
