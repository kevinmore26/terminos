import Carousel from "react-bootstrap/Carousel";
import banner1 from "../assets/baner2.jpg";
import {Container} from "react-bootstrap"
import  logo  from "../assets/portada.jpeg"
import cart1 from "../assets/Banner_Llego_Modelo1.png"
import cart2 from "../assets/Banner_Llego_Modelo2.png"
import cart3 from "../assets/Banner_Llego_Modelo3.png"
function CarrouselPrincipal() {
  return (
    <div >
      <Carousel variant="dark" interval={2000} >
        <Carousel.Item>
          <img className="d-block w-100" src={cart1} alt="First slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={cart2} alt="Second slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={cart3} alt="Third slide" />
        </Carousel.Item>
      </Carousel>
      </div>
  );
}

export default CarrouselPrincipal;
