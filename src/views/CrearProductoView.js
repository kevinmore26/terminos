import {useState,useEffect} from 'react'
import {agregarProductos,obtenerProductos} from '../services/productosServices'
import {Container, Form} from 'react-bootstrap'
import FormProducto from '../components/FormProduct'
import Swal from 'sweetalert2' 
import { Navigate, useNavigate } from 'react-router-dom'
 
export default function CrearProductoView(){
    const[productos,setProductos] = useState([])
    const [value,setValue] = useState({
        nombre:"",
        descripcion:"",
        stockProducto:"",
        productoFoto:"",
        precio:"",
        productoTipo:"",
        productoSubTipo:"",
    });
     
    const actualizarInput = (e) =>{
        setValue({
            ...value,
            [e.target.name]:e.target.value
 
        })    
    };
    const navigate = useNavigate();
    const manejarSubmit = async(e) => {

        e.preventDefault();
        try{
            await agregarProductos(value);
            await Swal.fire({
                icon:"success",
                title:"Producto creado exitosamente",
                showConfirmButton:true,
                showDenyButton:true, 
                confirmButtonText:"Ver listado",
                denyButtonText:"Cancelar",
            })

            .then((resultado)=>{
                if(resultado.isConfirmed){
                    navigate('/administrador')
                }else{
                    navigate('/crear')
                }
            })
             
        }catch(error){
                console.log('errorrrrr')
        }
 
    };

    return(
        <Container> 
            <h2 className='mt-3 mb-4 mx-4' style={{margin:'0 auto'}}>Crear/Editar Productos</h2>
                <FormProducto value={value} manejarSubmit={manejarSubmit} actualizarInput={actualizarInput}/>
        </Container>
    )

}