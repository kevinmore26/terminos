import {useState, useEffect, useRef} from 'react'
 
import GroupProducts from '../components/GroupProductos'
import {comidaRapidaDominos} from "../services/productosComidaRapida"
import NavTop from '../components/NavTop'
import Loading from '../components/Loading'
export default function ProductosDominosView(){
    const[productos,setProductos] = useState([])
    const [authPending, setAuthPending] = useState(true);
    
    const getProductosKfc = async() =>{
        try{
            let productosObtenidos = await comidaRapidaDominos()  
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
