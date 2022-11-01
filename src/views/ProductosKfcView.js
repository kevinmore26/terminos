import {useState, useEffect, useRef} from 'react'
 
import GroupProducts from '../components/GroupProductos'
import {comidaRapidaKfc} from "../services/productosComidaRapida"
import NavTop from '../components/NavTop'
import Loading from '../components/Loading'
export default function ProductosKfcView(){
    const[productos,setProductos] = useState([])
    const [authPending, setAuthPending] = useState(true);
    
    const getProductosKfc = async() =>{
        try{
            let productosObtenidos = await comidaRapidaKfc()  
            setProductos(productosObtenidos) 
            setAuthPending(false);
        }catch{
                console.log('error')
        }
    }

    useEffect(()=>{
        getProductosKfc()
    },[])
    if (authPending) {
        return <Loading />;
      }
    
    return(
        <div>
            <NavTop />
              <GroupProducts productos={productos} style={{position:"relative",top:"150px !important"}}/>
        </div>
    )
}
