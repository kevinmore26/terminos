import axios from "axios";

const URL = `https://backllegoshop.herokuapp.com/gestion/actualizar-cliente/`;

 
 
 
const editarUsuario = async (usuarioEditado, id) => {
  try {
    const headers = {
      "Content-type": "application/json",
    };

    let { data } = await axios.put(
      `https://backllegoshop.herokuapp.com/gestion/actualizar-cliente/${id}`,
      usuarioEditado,
      { headers }
    );
    return data.content;
  } catch (error) {
    console.log(error);
  }
};
 

 

export {
 
    editarUsuario,
 
};
