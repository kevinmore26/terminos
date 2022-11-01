import React, { Component } from "react";
import Slider from "react-slick";
import {Link} from "react-router-dom"
import { Card, Container } from "react-bootstrap";
import bebidas from "../assets/bebidas.png";
import pic1 from '../assets/Junk-Food-Transparent-Background.png'
import pic2 from '../assets/canasta1.png'
import pic3 from '../assets/carrito.png'
import electro from "../assets/electro.png";
import envios from "../assets/envios.png";
import farmacia from "../assets/farmacia.png";
import canasta from "../assets/canasta.png";
import mascotas from "../assets/mascotas.png";
export default class Responsive extends Component {
  render() {
    var settings = {  
      slidesToShow: 3, 
      centerPadding: "360px", 
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 700,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 1,
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
      <div style={{position:'relative',top:'30px'  }}>
        <Container>
          <Slider {...settings}>
            <div >
             <Link to="/comidarapidalist" style={{textDecoration: 'none'}}>
              <Card  style={{border:'none' ,padding:'30px',backgroundColor: '#F2F2F2',color:'white', }}>
                <div className="row d-flex justify-between">
                <div  className="col-5">
                <img 
                  src="https://images.rappi.pe/home-ab-objects/restaurants-1617916506.png?e=webp&d=128x1"
                  style={{ width: "110px", position: "relative", right: "10px" , objectFit: "cover",top:"5px" }}
                />
                </div>
                <div className="col-7" style={{display:'flex',justifyContent:'center',fontSize:'25px',  color:'rgb(106, 105, 110)',alignItems:"center"}}  > Comida Rápida </div>
             
                </div>
              </Card>
              </Link>
            </div>
            <div >
             <Link to="/comidarapidalist" style={{textDecoration: 'none'}}>
              <Card  style={{border:'none' ,padding:'25px',backgroundColor: '#F2F2F2', }}>
                <div className="row d-flex justify-between">
                <div  className="col-5">
                <img 
                  src="https://images.rappi.pe/home-ab-objects/cpgs-1617916528.png?e=webp&d=128x1"
                  style={{ width: "120px", position: "relative", right: "10px" , objectFit: "cover" }}
                />
                </div>
                <div className="col-7" style={{display:'flex',justifyContent:'center',fontSize:'25px',  color:'rgb(106, 105, 110)',alignItems:"center"}}  > Mini Market </div>
             
                </div>
              </Card>
              </Link>
            </div>
            <div >
             <Link to="/comidarapidalist" style={{textDecoration: 'none'}}>
              <Card  style={{border:'none' ,padding:'23px',backgroundColor: '#F2F2F2',color:'white', }}>
                <div className="row d-flex justify-between">
                <div  className="col-5">
                <img 
                  src="https://images.rappi.com/home-ab-objects/ecommerce-glow-1613515344.png?e=webp&d=128x1"
                  style={{ width: "120px", position: "relative", right: "10px" , objectFit: "cover" }}
                />
                </div>
                <div className="col-7" style={{display:'flex',justifyContent:'center',fontSize:'25px',  color:'rgb(106, 105, 110)',alignItems:"center"}}  > Supermercado </div>
             
                </div>
              </Card>
              </Link>
            </div>
            
            {/* <div>
              <Card style={{border:'none' ,padding:'20px',background: 'linear-gradient(to right, rgb(195, 151, 197), rgb(0 91 252 / 73%))',color:'white',margin:'20px' }}>
                <Card.Title style={{display:'flex',justifyContent:'center',fontSize:'35px',position:'relative',top:'20px',fontFamily:'cursive',color:'white',margin:'0 auto'}}>Mini Market</Card.Title>
                <Card.Img
                    style={{ height: "300px", position: "relative", right: "10px",margin:'0 auto',padding:'40px',objectFit: "cover" }}
                  src={pic2} 
                />
                <Card.Body></Card.Body>
              </Card>
            </div> */}
           
           
            
          </Slider>
        </Container>
      </div>
    );
  }
}
