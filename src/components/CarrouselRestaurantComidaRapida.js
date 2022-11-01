import React, { Component } from "react";
import Slider from "react-slick";
import { Card, Container } from "react-bootstrap";
import bebidas from "../assets/bebidas.png";
import {Link} from "react-router-dom";
import pizzahut from "../assets/dominos.png";
import envios from "../assets/envios.png";
import burguerking from "../assets/burguerking.png";
import canasta from "../assets/canasta.png";
import mascotas from "../assets/mascotas.png";
import kfc from "../assets/mc-donals.png"
export default class Responsive extends Component {
  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 900,
      slidesToShow: 4,
      slidesToScroll: 4,
      autoplay: false,
      autoplaySpeed: 2000,
      pauseOnHover: false,

      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 700,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };
    return (
      <div style={{ position: "relative", top: "130px" }}>
        <Container>
          <Slider {...settings}>
            <div>
              <Link to="/comidarapidalist/productoskfc" style={{textDecoration:"none"}}>
                <Card
                  style={{
                    border: "none",
                    padding: "10px",
                    backgroundColor: "#F2F2F2",
                    color: "rgb(106, 105, 110)",
                  }}
                >
                  <Card.Title className="text-center">Burguerlover</Card.Title>
                  <Card.Img
                    src={burguerking}
                    alt="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921"
                    style={{
                      maxWidth: "235px",
                      margin: "0 auto",
                      padding: "10px",
                    }}
                  />
                </Card>
              </Link>
            </div>
            <div>
              <Link  to="/comidarapidalist/productosDominos" style={{textDecoration:"none"}}>
              <Card
                style={{
                  border: "none",
                  padding: "20px",
                  backgroundColor: "#F2F2F2",
                  color: "rgb(106, 105, 110)",
                }}
              >
                <Card.Title className="text-center">Pizzalover</Card.Title>
                <Card.Img
                  style={{ maxWidth: "160px", margin: "0 auto" }}
                  src={pizzahut}
                />
                <Card.Body></Card.Body>
              </Card>
              </Link>
            </div>
            <div>
              <Card
                style={{
                  border: "none",
                  padding: "25px",
                  backgroundColor: "#F2F2F2",
                  color: "rgb(106, 105, 110)",
                }}
              >
                <Card.Title className="text-center">Mclover</Card.Title>
                <Card.Img
                  style={{ maxWidth: "180px", margin: "0 auto" }}
                  src={kfc}
                />
                <Card.Body></Card.Body>
              </Card>
            </div>
            <div>
              <Card
                style={{
                  border: "none",
                  padding: "20px",
                  backgroundColor: "#F2F2F2",
                  color: "rgb(106, 105, 110)",
                }}
              >
                <Card.Title className="text-center">Mascotas</Card.Title>
                <Card.Img
                  style={{ maxWidth: "140px", margin: "0 auto" }}
                  src={mascotas}
                />
                <Card.Body></Card.Body>
              </Card>
            </div>
            <div>
              <Card
                style={{
                  border: "none",
                  padding: "20px",
                  backgroundColor: "#F2F2F2",
                  color: "rgb(106, 105, 110)",
                }}
              >
                <Card.Title className="text-center">Supermercado</Card.Title>
                <Card.Img
                  style={{ maxWidth: "120px", margin: "0 auto" }}
                  src={canasta}
                />
                <Card.Body></Card.Body>
              </Card>
            </div>
            <div>
              <Card
                style={{
                  border: "none",
                  padding: "20px",
                  backgroundColor: "#F2F2F2",
                  color: "rgb(106, 105, 110)",
                }}
              >
                <Card.Title className="text-center">Bebidas</Card.Title>
                <Card.Img
                  style={{ maxWidth: "120px", margin: "0 auto" }}
                  src={bebidas}
                />
                <Card.Body></Card.Body>
              </Card>
            </div>
            <div>
              <Card
                style={{
                  border: "none",
                  padding: "20px",
                  backgroundColor: "#F2F2F2",
                  color: "rgb(106, 105, 110)",
                }}
              >
                <Card.Title className="text-center">Electro</Card.Title>
                <Card.Img
                  style={{ maxWidth: "160px", margin: "0 auto" }}
                  src={burguerking}
                />
                <Card.Body></Card.Body>
              </Card>
            </div>
            <div>
              <Card
                style={{
                  border: "none",
                  padding: "10px",
                  backgroundColor: "#F2F2F2",
                  color: "rgb(106, 105, 110)",
                }}
              >
                <Card.Title className="text-center">Farmacia</Card.Title>
                <Card.Img
                  style={{ maxWidth: "180px", margin: "0 auto" }}
                  src={burguerking}
                />
                <Card.Body></Card.Body>
              </Card>
            </div>
            <div>
              <Card
                style={{
                  border: "none",
                  padding: "20px",
                  backgroundColor: "#F2F2F2",
                  color: "rgb(106, 105, 110)",
                }}
              >
                <Card.Title className="text-center">Envios</Card.Title>
                <Card.Img
                  style={{ maxWidth: "120px", margin: "0 auto" }}
                  src={envios}
                />
                <Card.Body></Card.Body>
              </Card>
            </div>
            <div>
              <Card
                style={{
                  border: "none",
                  padding: "20px",
                  backgroundColor: "#F2F2F2",
                  color: "rgb(106, 105, 110)",
                }}
              >
                <Card.Title className="text-center">M ascotas</Card.Title>
                <Card.Img
                  style={{ maxWidth: "120px", margin: "0 auto" }}
                  src={mascotas}
                />
                <Card.Body></Card.Body>
              </Card>
            </div>
          </Slider>
        </Container>
      </div>
    );
  }
}
