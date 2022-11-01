import { Navbar, Container } from "react-bootstrap";
import visa from "../assets/visa.png";
import mastercard from "../assets/mastercard.png";
import whatsApp from "../assets/whatsApp.png";
import facebook from "../assets/FACEBOOK.png";
import './Footer.css'
export default function Footer() {
  return (
    <div>
      <Navbar 
        style={{
          position: "relative",
          top: "200px",
          backgroundColor: "#2B39A8",width:'99.7vw'
        }} className="row   prueba"
      >
        
          <div className="col-4 itemFooter  " style={{margin:'0 auto',display:'flex',justifyContent:'center'}}>
            
            <ul className="list-unstyled"  >
              <li>
                {" "}
                <img src={visa} alt="" style={{ width: "70px" }} />{" "}
              </li>
              <li
                className="text-white"
                style={{ fontFamily: "cursive", fontSize: "20px" }}
              >
                {" "}
                Nosotros{" "}
              </li>
              <li>
                {" "}
                <a
                  href="https://github.com/kevinmore26"
                  target="blank"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Historia
                </a>
              </li>
              <li>
                {" "}
                <a
                  href="https://github.com/kevinmore26"
                  target="blank"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Ayuda
                </a>
              </li>
              <li>
                {" "}
                <a
                  href="https://github.com/kevinmore26"
                  target="blank"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Términos de uso
                </a>
              </li>
              <li>
                {" "}
                <a
                  href="https://github.com/kevinmore26"
                  target="blank"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Condición de entrega
                </a>
              </li>
              <li>
                {" "}
                <a
                  href="https://github.com/kevinmore26"
                  target="blank"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Envío
                </a>
              </li>
              <li>
                {" "}
                <a
                  href="https://github.com/kevinmore26"
                  target="blank"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Programas
                </a>
              </li>
              <li>
                {" "}
                <a
                  href="https://github.com/kevinmore26"
                  target="blank"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Grupo Llego!
                </a>
              </li>

              <li></li>
            </ul>
          </div>
          <div className="col-4 itemFooter " style={{margin:'0 auto',display:'flex',justifyContent:'center'}}>
          
            <ul className="list-unstyled">
              <li>
                {" "}
                <img src={mastercard} alt="" style={{ width: "180px" ,position:'relative',bottom:'5px'}} />{" "}
              </li>
              <li
                className="text-white"
                style={{ fontFamily: "cursive", fontSize: "20px" }}
              >
                {" "}
                Serv. al cliente{" "}
              </li>
              <li>
                {" "}
                <a
                  href="https://github.com/kevinmore26"
                  target="blank"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Preguntas
                </a>
              </li>
              <li>
                {" "}
                <a
                  href="https://github.com/kevinmore26"
                  target="blank"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Contacto
                </a>
              </li>
              <li>
                {" "}
                <a
                  href="https://github.com/kevinmore26"
                  target="blank"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Formas de pago
                </a>
              </li>
              <li>
                {" "}
                <a
                  href="https://github.com/kevinmore26"
                  target="blank"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Políticas de compra
                </a>
              </li>
              <li>
                {" "}
                <a
                  href="https://github.com/kevinmore26"
                  target="blank"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Aviso
                </a>
              </li>
              <li>
                {" "}
                <a
                  href="https://github.com/kevinmore26"
                  target="blank"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Política de garantía
                </a>
              </li>
               

              <li></li>
            </ul>
          </div>
          <div className="col-4  itemFooter" style={{margin:'0 auto',display:'flex',justifyContent:'center'}}>
           
            <ul className="list-unstyled">
             
              <li
                className="text-white"
                style={{ fontFamily: "cursive", fontSize: "20px" }}
              >
                {" "}
                Contáctanos{" "}
              </li>
              <li>
                {" "}
                <img src={whatsApp} style={{width:'150px',position:"relative",top:'10px'    }} alt=""/>
              </li>
              <li>
                {" "}
                <img src={facebook} alt="" style={{width:'150px',position:"relative",top:'20px'}}/>
              </li>
           

              <li></li>
            </ul>
          </div>
        
      </Navbar>
    </div>
  );
}
