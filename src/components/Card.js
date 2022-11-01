import './cards.css'
import {Link} from "react-router-dom"

//agregar mas adelante un Pros de URL
export default function Card({title, imageSource, descripcion}) {
        
    return (
         
            <div className="magic card text-center">
                <div className="overflow">
                    <img src={imageSource} alt="" className="card-img-top"/>
                </div>

                <div className="card-body bg-success ">
                    <h4 className="card-title text-center fw-bold">{title}</h4>
                    <p className=" card-text text-white">{descripcion}</p>
                    <Link className="btn btn btn btn-warning" to="/Adoptar">
                        ¿Quieres adoptar?
                    </Link>
                    

                </div>           
            </div>

    
    )
}