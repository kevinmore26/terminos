import axios from "axios";

const URL = `https://backllegoshop.herokuapp.com/gestion/productos/`;

const obtenerProductos = async () => {
  //en el caso de que yo no le pase nada, toma el valor que le dé.
  //en este caso le estoy pasando que por defecto tome el valor de vacío, gracias a esto , me mostrará todo.
  try {
    //intenta ejecutar este bloque de codigo
    // equivalente al .then
    let { data } = await axios.get(`https://backllegoshop.herokuapp.com/gestion/productos/`);
    console.log(data.content);
    return data.content;
  } catch {
    console.log("error");
    //si hay errores captura ese error
  }
};
const obtenerProductosFiltro = async (busqueda="") => {
  //en el caso de que yo no le pase nada, toma el valor que le dé.
  //en este caso le estoy pasando que por defecto tome el valor de vacío, gracias a esto , me mostrará todo.
  try {
    let { data } = await axios.get(
      `https://backllegoshop.herokuapp.com/gestion/producto-filtro?nombre=${busqueda}`
    );
    console.log(data.content);
    return data.content;
  } catch {
    console.log("error");
    //si hay errores captura ese error
  }
};

const agregarProductos = async (nuevoProducto) => {
  try {
    const headers = {
      "Content-type": "application/json",
    };

    let { data } = await axios.post(URL, nuevoProducto, { headers });
    return data.content;
  } catch (error) {
    console.log(error);
  }
};

const obtenerProductoPorId = async (id) => {
  try {
    let { data } = await axios.get(
      `https://backllegoshop.herokuapp.com/gestion/producto/${id}`
    );
    console.log(data);
    return data.content;
  } catch {
    console.log("error");
    //si hay errores captura ese error
  }
};

const editarProducto = async (productoEditado, id) => {
  try {
    const headers = {
      "Content-type": "application/json",
    };

    let { data } = await axios.put(
      `https://backllegoshop.herokuapp.com/gestion/producto/${id}`,
      productoEditado,
      { headers }
    );
    return data.content;
  } catch (error) {
    console.log(error);
  }
};

const eliminarProductoPorId = async (id) => {
  try {
    let { data } = await axios.delete(
      `https://backllegoshop.herokuapp.com/gestion/producto/${id}`
    );
    console.log(data);
    return data.content;
  } catch {
    console.log("error");
    //si hay errores captura ese error
  }
};

const filtrarProducto = async (busqueda = "") => {
  try {
    let { data } = await axios.get(
      `https://backllegoshop.herokuapp.com/gestion/producto-filtro?nombre=${busqueda}`
    );
    console.log(data.content);
    return data.content;
  } catch {
    console.log("error");
    //si hay errores captura ese error
  }
};

export {
  obtenerProductos,
  agregarProductos,
  obtenerProductoPorId,
  obtenerProductosFiltro,
  editarProducto,
  eliminarProductoPorId,
  filtrarProducto,
};
