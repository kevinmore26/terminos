import { useState, useEffect } from "react";
//useParams nos va servir para que cuando nostros seleccionemos
//Determinado producto, nos traiga la información de este
import { useParams, Link } from "react-router-dom";
//nos va servir para usar un popup y poder navegar a otra vista
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import FormProducto from "../components/FormProduct";
import {
  editarProducto,
  eliminarProductoPorId,
  obtenerProductoPorId,
  obtenerProductos,
} from "../services/productosServices";
import { Container } from "react-bootstrap";
let imagen; //undefined

export default function EliminarProducto() {
  const { id } = useParams();
  const [productos, setProductos] = useState([]);
  const [value, setValue] = useState({
    productoNombre: "",
    productoDescripcion: "",
    productoCantidad: "",
    productoFoto: "",
    productoPrecio: "",
    productoTipo: "",
    productoSubTipo: "",
    updatedAt: "",
    createdAt: "",
  });
  const navigate = useNavigate();
  const getProductos = async () => {
    try {
      let productosObtenidos = await obtenerProductos();

      setProductos(productosObtenidos);
    } catch {
      console.log("error");
    }
  };

  useEffect(() => {
    getProductos();
  }, []);
  const getProducto = async () => {
    try {
      await Swal.fire({
        icon: "success",
        title: "Estás seguro de eliminar el producto?",
        showConfirmButton: true,
        showDenyButton: true,
        confirmButtonText: "OK",
        denyButtonText: "Cancelar",
      })
      .then(async (resultado) => {
        if (resultado.isConfirmed) {
          const productoObtenido = await eliminarProductoPorId(id);
          navigate("/administrador");
        } else {
          navigate("/administrador");
        }
      });
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getProducto();
  }, []);

  return (
    <Container>
      <h1>Productos Registrados</h1>
      <Link to="/crear" className="btn btn-primary btn-lg my-2">
        Crear Producto
      </Link>

      <table className="table">
        <thead>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>ImagenReferencial</th>
          <th>Stock</th>
          <th>Precio</th>
          <th>Tipo</th>
          <th>Restaurante</th>
          <th>F.creación</th>
          <th>F.modificación</th>
          <th> </th>
          <th> </th>
        </thead>
        <tbody>
          {productos.map((prod, i) => (
            <tr key={i}>
              <td>{prod.productoNombre}</td>
              <td>{prod.productoDescripcion}</td>

              <td>
                <img
                  src={
                    prod.productoFoto !== ""
                      ? prod.productoFoto
                      : "https://upload.wikimedia.org/wikipedia/commons/0/0a/No-image-available.png"
                  }
                  style={{ width: "60px" }}
                  alt="error"
                />
              </td>
              <td>{prod.productoCantidad}</td>
              <td>{prod.precio}</td>
              <td>{prod.productoTipo}</td>
              <td>{prod.productoSubTipo}</td>
              <td>{prod.createdAt}</td>
              <td>{prod.updatedAt}</td>
              <td>
                <Link
                  className="btn btn-warning btn-sm"
                  to={`/editar/${prod.productoId}`}
                >
                  <i className="fas fa-edit"></i>
                </Link>
              </td>
              <td>
                <Link
                  className="btn  btn-sm"
                  to={`/eliminar/${prod.productoId}`}
                >
                  <i className="fas fa-trash"></i>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}
