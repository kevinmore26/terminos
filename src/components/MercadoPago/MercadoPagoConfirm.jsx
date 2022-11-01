import React, { useEffect, useState, useContext } from "react";
import useScript from "../../hooks/useScript";
import { formConfig } from "./formConfig";
import Card from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import useMercadoPago from "../../hooks/useMercadoPago";
import NavTop from "../../components/NavtopCheckout";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Modal from "react-modal";
import gif from "../../assets/checkgif.gif";
import { CarritoContext } from "../../context/carritoContext";
import { Link } from "react-router-dom";
import emailjs from "@emailjs/browser";
import {
  AuthReactContext,
  AuthReactProvider,
} from "../../context/reactAuthContext";
import "../../main.css";
const INITIAL_STATE = {
  cvc: "",
  cardExpirationMonth: "",
  cardExpirationYear: "",
  focus: "cardNumber",
  cardholderName: "",
  cardNumber: "",
  issuer: "",
  placeholders: { name: "NOMBRE APELLIDO " },
};

export default function MercadoPagoForm2({ modalIsOpen, setIsOpen }) {
  const [modalIsOpen2, setIsOpen2] = useState(false);
  const [state, setState] = useState(INITIAL_STATE);
  const [cargandoPago, setCargandoPago] = useState(false);
  const resultPayment = useMercadoPago();
  const { hacerPedido } = useContext(CarritoContext);
  const { user } = useContext(AuthReactContext);
  const cliente = JSON.parse(localStorage.getItem("usuario"));
  console.log(cliente);

  console.log(modalIsOpen);
  console.log(resultPayment);
  const handleInputChange = (e) => {
    setState({
      ...state,
      [e.target.dataset.name || e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    hacerPedido();
  }, []);
  const customStyles2 = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "45vw",
      overflow: "none",
      border: "none",
      boxShadow: "0 4px 6px rgb(50 50 93 / 11%), 0 1px 3px rgb(0 0 0 / 8%)",
      backgroundColor: "white",
    },
  };
  let subtitle;
  const handleInputFocus = (e) => {
    setState({ ...state, focus: e.target.dataset.name || e.target.name });
  };
  function openModal() {
    setIsOpen2(true);
  }
  function closeModal() {
    setIsOpen2(false);
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    //subtitle.style.color = "#f00";
  }
  console.log(resultPayment);
  return (
    <div
      className="  row d-flex "
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: "25px",
      }}
    >
      <div className="col-12 row">
        <img
          src={gif}
          alt="img"
          style={{ margin: "0 auto", maxHeight: "150px", maxWidth: "150px " }}
        ></img>
        <h2 className="text-center">!Gracias por tu compra!</h2>
        <h2
          className="text-center"
          style={{ color: "rgb(106, 105, 110)", fontSize: "15px" }}
        >
          Tu compra fue procesada correctamente
        </h2>
        <p
          className="text-center"
          style={{ color: "rgb(106, 105, 110)", fontSize: "17px" }}
        >
          En breve nos comunicaremos contigo para la entrega de tu producto!
        </p>
      </div>
      <div
        className="col-12 d-flex justify-center"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Link to="/" style={{ margin: "10px" }}>
          <Button>Volver</Button>
        </Link>
        <Link to="/carrito/mispedidos" style={{ margin: "10px" }}>
          <Button>Ver mis pedidos</Button>
        </Link>
      </div>
      {resultPayment && (
        <Modal
          isOpen={modalIsOpen2}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles2}
          contentLabel="Example Modal"
        >
          <h5 style={{ color: "black iImportant" }}>
            Ingresa los datos de tu tarjeta
          </h5>
        </Modal>
      )}
    </div>
  );
}
