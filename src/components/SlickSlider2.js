import React, { Component } from "react";
import Slider from "react-slick";
import { Card, Container } from "react-bootstrap";
import bebidas from "../assets/bebidas.png";

import electro from "../assets/electro.png";
import envios from "../assets/envios.png";
import farmacia from "../assets/farmacia.png";
import canasta from "../assets/canasta.png";
import mascotas from "../assets/mascotas.png";
export default class Responsive extends Component {
  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 900,
      slidesToShow: 4,
      slidesToScroll: 4,
      autoplay: true,
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
      <div style={{position:'relative'  }}>
        <Container>
          <Slider {...settings}>
            <div >
              <Card style={{border:'none' ,padding:'20px',backgroundColor: '#F2F2F2' }}>
                <Card.Title className="text-center" style={{color:"rgb(106, 105, 110)"}}>Bebidas</Card.Title>
                <Card.Img
                 
                  src="https://images.rappi.pe/home-ab-objects/spirits-1617916616.png?e=webp&d=128x1"
                  style={{maxWidth:'150px',margin:'0 auto',padding:'10px' }}
                />
              </Card>
            </div>
            <div>
              <Card style={{border:'none' ,padding:'20px',backgroundColor: '#F2F2F2'  }}>
                <Card.Title className="text-center" style={{color:"rgb(106, 105, 110)"}}>Electro</Card.Title>
                <Card.Img
                  style={{maxWidth:'120px',margin:'0 auto'  }}
                  src={electro}
                  
                />
                <Card.Body></Card.Body>
              </Card>
            </div>
            <div>
             <Card style={{border:'none' ,padding:'20px',backgroundColor: '#F2F2F2' }}>
                <Card.Title className="text-center" style={{color:"rgb(106, 105, 110)"}}> Farmacia</Card.Title>
                <Card.Img
                  style={{maxWidth:'210px',margin:'0 auto'  }}
                  src={farmacia}
                  
                />
                <Card.Body></Card.Body>
              </Card>
            </div>
            <div>
             <Card style={{border:'none' ,padding:'20px',backgroundColor: '#F2F2F2' }}>
                <Card.Title className="text-center" style={{color:"rgb(106, 105, 110)"}}>Mascotas</Card.Title>
                <Card.Img
                  style={{maxWidth:'120px',margin:'0 auto'  }}
                  src="https://www.kindpng.com/picc/m/139-1396987_clip-art-cats-and-dogs-dibujos-de-perros.png"
                  
                />
                <Card.Body></Card.Body>
              </Card>
            </div>
            <div>
             <Card style={{border:'none' ,padding:'20px',backgroundColor: '#F2F2F2'  }}>
                <Card.Title className="text-center" style={{color:"rgb(106, 105, 110)"}}>Supermercado</Card.Title>
                <Card.Img
                  style={{maxWidth:'120px',margin:'0 auto'  }}
                  src="https://images.rappi.pe/home-ab-objects/cpgs-1617916528.png?e=webp&d=128x1"
                  
                />
                <Card.Body></Card.Body>
              </Card>
            </div>
            <div>
             <Card style={{border:'none' ,padding:'20px',backgroundColor: '#F2F2F2' }}>
                <Card.Title className="text-center" style={{color:"rgb(106, 105, 110)"}}>Bebidas</Card.Title>
                <Card.Img
                  style={{maxWidth:'120px',margin:'0 auto'  }}
                  src="https://images.rappi.pe/home-ab-objects/spirits-1617916616.png?e=webp&d=128x1"
                  
                />
                <Card.Body></Card.Body>
              </Card>
            </div>
            <div>
             <Card style={{border:'none' ,padding:'20px',backgroundColor: '#F2F2F2' }}>
                <Card.Title className="text-center" style={{color:"rgb(106, 105, 110)"}}>Electro</Card.Title>
                <Card.Img
                  style={{maxWidth:'120px',margin:'0 auto'  }}
                  src={electro}
                  
                />
                <Card.Body></Card.Body>
              </Card>
            </div>
            <div>
             <Card style={{border:'none'   ,padding:'20px',backgroundColor: '#F2F2F2'  }}>
                <Card.Title className="text-center" style={{color:"rgb(106, 105, 110)"}}>Farmacia</Card.Title>
                <Card.Img
                  style={{maxWidth:'120px',margin:'0 auto'  }}
                  src="https://images.rappi.pe/home-ab-objects/pharmacy-1617916569.png?e=webp&d=128x1"
                  
                />
                <Card.Body></Card.Body>
              </Card>
            </div>
            <div>
             <Card style={{border:'none' ,padding:'20px',backgroundColor: '#F2F2F2'  }}>
                <Card.Title className="text-center" style={{color:"rgb(106, 105, 110)"}}>Envios</Card.Title>
                <Card.Img
                  style={{maxWidth:'120px',margin:'0 auto'  }}
                  src={envios}
                  
                />
                <Card.Body></Card.Body>
              </Card>
            </div>
            <div>
             <Card style={{border:'none' ,padding:'20px',backgroundColor: '#F2F2F2'  }}>
                <Card.Title className="text-center" style={{color:"rgb(106, 105, 110)"}}>Mascotas</Card.Title>
                <Card.Img
                  style={{maxWidth:'120px',margin:'0 auto'  }}
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
