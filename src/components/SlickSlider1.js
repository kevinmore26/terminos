import React from "react";
import Card from "./Card"
import bebidas from '../assets/bebidas.png'
import Slider from "react-slick";
import electro from '../assets/electro.png'
import envios from '../assets/envios.png'
import farmacia from '../assets/farmacia.png'
import canasta from '../assets/canasta.png'
import mascotas from '../assets/mascotas.png'
import {Link} from "react-router-dom"
import './slickSlider.css'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
export default function SimpleSlider() {
    const settings = {
        dots: true,
        infinite: true,
        centerPadding: "160px",

        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
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
            breakpoint: 600,
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
        <div style={{marginTop:'60px',with:'98%'}}>
        
        <Slider {...settings}  style={{display:'flex',justifyContent:'center'}}>
          <div className="bordeCarrousel mx-3">
            <div>
            <h4 style={{textAlign:'center'}}>Bebidas </h4>
          <img src={bebidas} style={{height:'120px',margin:'0 auto' }} alt="perrito"></img></div>
          </div>
          <div className="bordeCarrousel">
          <h4 style={{textAlign:'center'}}>Electro </h4>
          <img src={electro} style={{height:'120px',margin:'0 auto' }} alt="perrito"></img>
          </div>
          <div className="bordeCarrousel">
          <h4 style={{textAlign:'center'}}>Farmacia </h4>
          <img src={farmacia} style={{height:'120px',margin:'0 auto' }} alt="perrito"></img>
          </div>
          <div className="bordeCarrousel">
          <h4 style={{textAlign:'center'}}>Envíos </h4>
          <img src={envios} style={{height:'120px',margin:'0 auto' }} alt="perrito"></img>
          </div>
          <div className="bordeCarrousel">
          <h4 style={{textAlign:'center'}}>Mascotas </h4>
          <img src={mascotas} style={{height:'120px',margin:'0 auto' }} alt="perrito"></img>
          </div>
          <div className="bordeCarrousel">
          <h4 style={{textAlign:'center'}}>Canasta </h4>
          <img src={canasta} style={{height:'120px',margin:'0 auto' }} alt="perrito"></img>
          </div>
          <div className="bordeCarrousel">
            <h4 style={{textAlign:'center'}}>Bebidas </h4>
          <img src={bebidas} style={{height:'120px',margin:'0 auto' }} alt="perrito"></img>
          </div>
          <div className="bordeCarrousel">
          <h4 style={{textAlign:'center'}}>Electro </h4>
          <img src={electro} style={{height:'120px',margin:'0 auto' }} alt="perrito"></img>
          </div>
          <div className="bordeCarrousel">
          <h4 style={{textAlign:'center'}}>Farmacia </h4>
          <img src={farmacia} style={{height:'120px',margin:'0 auto' }} alt="perrito"></img>
          </div>
          <div className="bordeCarrousel">
          <h4 style={{textAlign:'center'}}>Envíos </h4>
          <img src={envios} style={{height:'120px',margin:'0 auto' }} alt="perrito"></img>
          </div>
          <div className="bordeCarrousel">
          <h4 style={{textAlign:'center'}}>Mascotas </h4>
          <img src={mascotas} style={{height:'120px',margin:'0 auto' }} alt="perrito"></img>
          </div>
        </Slider>
      </div>
    );
  }