import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";

export default function GroupProducts({ productos, miBusqueda }) {
  console.log(productos);

  let totalComprado = 0;

  return (
    <div style={{ marginTop: "80px" }}>
      <div className="container">
        {productos.length != 0 ? (
          <div className="container">
            <h5 style={{ position: "relative", top: "20px" }}>
              RESULTADOS: <span>{productos.length} items</span>
            </h5>
            <div className="row mt-3">
              {productos.map((prod, i) => (
                <div className="col-6 col-lg-3" key={i}>
                  {prod.productoCantidad != 0 ? (
                    <p style={{ textDecoration: "none", color: "transparent" }}>
                      ㅤ
                    </p>
                  ) : (
                    <p
                      style={{
                        visibility: prod.productoDisponible ? "true" : "false",
                        textDecoration: "none",
                        background: "white",
                        position: "relative",
                        color: "black",
                        top: "36px",
                        width: "39%",
                        padding: "6px",
                        margin: "0px",
                        fontWeight: "500",
                        borderRadius: "5px 0px 10px 0px",
                      }}
                    >
                      No disponible
                    </p>
                  )}
                  <Link
                    to={`/comidarapidalist/productoskfc/${prod.productoId}`}
                  >
                    <div>
                      <img
                        style={{
                          borderRadius: "8px",
                          minHeight: "300px",
                          objectFit: "cover",
                        }}
                        src={prod.productoFoto}
                        alt={prod.productoFoto}
                        className="card-img-top"
                      />
                    </div>
                  </Link>
                  <div className="card-body mt-3">
                    <h6 className="card-title">{prod.productoNombre}</h6>
                    <span
                      style={{
                        fontSize: "14px",
                        color: "#aaa",
                        fontWeight: "400",
                        textDecoration: "line-through",
                        lineHeight: "1.3rem",
                      }}
                    ></span>
                    <div>
                      <span style={{ color: "#0054FD", fontWeight: "bold" }}>
                        S/{prod.productoPrecio}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="container text-center " style={{ marginTop: "30px" }}>
            <i
              className="fas fa-search"
              style={{
                color: "#0651F2",
                position: "relative",
                marginTop: "50px",
                fontFamily: "Font Awesome 5 Free",
                fontStyle: "normal",
                fontWeight: "900",
                fontSize: "30px",
                lineHeight: "21px",
                height: "30px",
                /* Soft gray */
              }}
            ></i>
            <h3>Lo sentimos</h3>
            <h5>No encontramos resultados para "{miBusqueda}"</h5>
            <p style={{ color: "rgb(106, 105, 110)" }}>
              Prueba intentando de nuevo{" "}
            </p>
            <Link to="/">
              <button
                style={{
                  color: "black",
                  border: "none",
                  backgroundColor: "#0651F2",
                  borderRadius: "5px",
                  color: "white",
                  padding: "10px",
                  margin: "0 auto",
                  marginTop: "10px",
                  textDecoration: "none",
                  padding:"10px 30px"
                }}
              >
                Regresar
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
