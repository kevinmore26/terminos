import axios from "axios";

const URL = `https://llegoshop-default-rtdb.firebaseio.com/usuarios/`;

const registrarFirebase = async (usuario) => {
  try {
    const headers = {
      "Content-type": "application/json",
    };

    let { data } = await axios.post(URL, usuario, { headers });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export { registrarFirebase };
