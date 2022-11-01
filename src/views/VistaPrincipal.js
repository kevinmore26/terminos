import NavTop from "../components/NavTop";
import TipoMarket from "../components/TipoMarket";
import SlickSlider from "../components/SlickSlider1";
import { Container } from "react-bootstrap";
import Footer from "../components/Footer";
import SlickSlider2 from "../components/SlickSlider2";
import SlickSlider3 from "../components/SlickSlider3";
import CarrouselPrincipal from "../components/CarrouselPrincipal";
import LottieVistaPrincipal from "../components/LottieVistaPrincipal";
import LottieVistaSecundario from "../components/LottieSecundario";
export default function VistaPrincipal() {
  return (
    <div>
      <NavTop />
      <Container style={{ position: "relative", top: "80px" }}>
        <CarrouselPrincipal style={{ position: "relative", top: "40px" }} />
        <SlickSlider3 />
        <LottieVistaPrincipal />

        <SlickSlider2 />
        <LottieVistaSecundario />
      </Container>
      <Footer />
    </div>
  );
}
