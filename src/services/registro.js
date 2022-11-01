import axios from "axios";

const URL = `https://backllegoshop.herokuapp.com/gestion/registro`
const Registro = async (cliente) =>{
    try {
        let {data} = await axios.post(URL,cliente)
        return data
    }catch (error){
        throw error
    }
}

export{
    Registro
}


