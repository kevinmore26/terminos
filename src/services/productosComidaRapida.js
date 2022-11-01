import axios from "axios";

const URL = `https://backllegoshop.herokuapp.com/gestion/producto-filtro?subtipo=kfc`;

const comidaRapidaKfc = async (busqueda = "") => {
  try {
    let { data } = await axios.get(
      `https://backllegoshop.herokuapp.com/gestion/producto-filtro?subtipo=kfc`
    );
    console.log(data.content);
    return data.content;
  } catch {
    console.log("error");
    //si hay errores captura ese error
  }
};

const comidaRapidaDominos = async (busqueda = "") => {
  try {
    let { data } = await axios.get(
      `https://backllegoshop.herokuapp.com/gestion/producto-filtro?subtipo=pizza`
    );
    console.log(data.content);
    return data.content;
  } catch {
    console.log("error");
    //si hay errores captura ese error
  }
};

const comidaRapidaKfcPorId = async (subtipo,id) => {
  try {
    let { data } = await axios.get(
      `https://backllegoshop.herokuapp.com/gestion/producto-filtro?subtipo=${subtipo}&id=${id}`
    );
    console.log(data.content);
    return data.content[0];
  } catch {
    console.log("error");
    //si hay errores captura ese error
  }
};
export { comidaRapidaKfc, comidaRapidaKfcPorId,comidaRapidaDominos };
