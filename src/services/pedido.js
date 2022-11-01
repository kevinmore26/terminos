import axios from "axios";

const URL = `https://backllegoshop.herokuapp.com/gestion/pedido`;

const pedido = async (pedido) => {
  try {
    let { data } = await axios.post(URL, pedido);
    console.log(data);
    return data;
  } catch (error) {
    throw error;
  }
};

const ordenesCliente = async (cliente_id) => {
  try {
    let { data } = await axios.get(`https://backllegoshop.herokuapp.com/gestion/buscar-orden-cliente?cliente_id=${cliente_id}`);
    console.log(data);
    return data.content;
  } catch (error) {
    throw error;
  }
};

export { pedido,ordenesCliente };
