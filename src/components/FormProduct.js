import {Container, Form} from 'react-bootstrap'
 
export default function FormProducto ({value,manejarSubmit,actualizarInput}){
    
    return(
        <Container>
            <Form onSubmit={(e)=>{manejarSubmit(e)}}>
                <div className='mb-3'>
                    <label>
                        Nombre producto
                    </label>
                    <input type="text"
                    className='form-control'
                    name='productoNombre' 
                    value={value.productoNombre}
                    onChange={(e)=>{actualizarInput(e)}}
                    >
                    </input>

                </div>
                <div className='mb-3'>
                    <label>
                        Descripción
                    </label>
                    <input type="text"
                    className='form-control'
                    value={value.productoDescripcion}    
                    onChange={(e)=>{actualizarInput(e)}}
                    name='productoDescripcion'> 
                    </input>

                </div>

                <div className='mb-3'>
                    <label>
                        Precio producto
                    </label>
                    <input type="text"
                    className='form-control'
                    value={value.productoPrecio} 
                    onChange={(e)=>{actualizarInput(e)}}
                    name='productoPrecio'>
                    </input>

                </div>
                <div className='mb-3'>
                    <label>
                        Imagen producto
                    </label>
                    <input type="text"
                    className='form-control'
                    value={value.productoFoto} 
                    onChange={(e)=>{actualizarInput(e)}}
                    name='productoFoto'>
                    </input>

                </div>
                <div className='mb-3'>
                    <label>
                        Stock producto
                    </label>
                    <input type="text"
                    className='form-control'
                    value={value.productoCantidad} 
                    onChange={(e)=>{actualizarInput(e)}}
                    name='productoCantidad'>
                    </input>

                </div>
                <div className='mb-3'>
                    <label>
                        Producto tipo :  1 - comidaRapida' | 2 - miniMarket" | 3 - supermercado"    
                    </label>
                    <input type="text"
                    className='form-control'
                    value={value.productoTipo} 
                    onChange={(e)=>{actualizarInput(e)}}
                    name='productoTipo'>
                    </input>
                </div>
                <div className='mb-3'>
                    <label>
                        Producto SubTipo (minusculas-junto)   
                    </label>
                    <input type="text"
                    className='form-control'
                    value={value.productoSubTipo} 
                    onChange={(e)=>{actualizarInput(e)}}
                    name='productoSubTipo'>
                    </input>

                </div>
                <div className='d-grid'>
                    <button className='btn btn-primary' type='submit'>
                       GUARDAR 
                            
                    </button>

                </div>
            </Form>
        </Container>
    )
}