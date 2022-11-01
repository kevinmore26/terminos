import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { comidaRapidaKfcPorId } from "../services/productosComidaRapida";
import { obtenerProductos } from "../services/productosServices";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { CarritoContext } from "../context/carritoContext";
import NavTop from "../components/NavTop";

export default function ProductoView() {
  const [producto, setProducto] = useState([]);
  const { anadirACarrito } = useContext(CarritoContext);
  const { id } = useParams();
  const { hacerPedido } = useContext(CarritoContext);
  let totalComprado = 0;
  console.log(id);
  let productosubTipo = "";
  totalComprado = (producto.productoPrecio * 6) / 5;
  console.log(producto);

  const getProducto = async () => {
    try {
      const productosTodos = await obtenerProductos();
      console.log(productosTodos.length);
      for (let i = 0; i < productosTodos.length; i++) {
        //productosubTipo
        console.log("productosubTipo");
        console.log(productosTodos[i]);
        if (productosTodos[i].productoId == id) {
          productosubTipo = productosTodos[i].productoSubTipo;
        }

        console.log(productosubTipo);
      }
      console.log(productosubTipo);
      let productoObtenido = await comidaRapidaKfcPorId(productosubTipo, id);
      setProducto(productoObtenido);
      console.log(productoObtenido);
      console.log(producto);
    } catch {
      console.log("error");
    }
  };
  const navigate = useNavigate();
  const anadirACarritoContext = () => {
    anadirACarrito(producto);
   
    const resultado = Swal.fire({
      //icon:'success',
      width: "500",
      icon: "success",
      title: "Tu producto se añadió al carrito",
      showConfirmButton: true,
      showDenyButton: true,
      cancelButtonColor: "white",
      confirmButtonColor: "#0651F2",
      confirmButtonText: "Ir al carrito",
      denyButtonText: "Seguir comprando",
    }).then((resultado) => {
      if (resultado.isConfirmed) {
        navigate("/carrito");
      } else if (resultado.isDenied) {
        navigate("/comidarapidalist/productoskfc");
      }
    });
  };

  useEffect(() => {
    getProducto();
  }, []);

  return (
    <div>
      <NavTop />
      <div className="container" style={{ position: "relative", top: "140px" }}>
        <div className="row justify-content-between">
          <div className="col-sm12 col-md-7">
            <img
              src={producto.productoFoto}
              style={{
                margin: "0 auto",
                display: "flex",
                width: "40vw",
                borderRadius: "5px",
                justifyContent: "center",
              }}
            />
          </div>
          <div className="col-sm-12 col-md-5 ">
            <h2 className="fw-bold" style={{ fontFamily: "arial" }}>
              {producto.productoNombre}
            </h2>
            <h5 className="fw-bold" style={{ color: "#0651F2" }}>
              Descripción
            </h5>
            <p>{producto.productoDescripcion}</p>
            <div className="  d-flex ">
              <span
                style={{
                  fontSize: "14px",
                  color: "#aaa",
                  fontWeight: "400",
                  textDecoration: "line-through",
                  lineHeight: "1.3rem",
                }}
              >
                S/ {totalComprado.toFixed(2)}
              </span>
              <span
                style={{
                  fontSize: "14px",
                  position: "relative",
                  left: "5px",
                }}
              >
                -20%
              </span>
            </div>
            <div className="py-3 d-flex justify-content-between">
              {producto.productoCantidad != 0 ? (
                <span
                  style={{
                    fontSize: "25px",
                    color: "#0651F2",
                    fontWeight: "bold",
                  }}
                >
                  S/{producto.productoPrecio}
                </span>
              ) : (
                <p>Producto no disponible</p>
              )}
            </div>
            <button
              onClick={anadirACarritoContext}
              className="btn"
              disabled={producto.productoDisponible ? false : true}
              style={{
                backgroundColor: "#0651F2",
                borderRadius: "5px",
                color: "white",
                padding: "10px",
                fontWeight: "600",
              }}
            >
              AÑADIR AL CARRITO
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
