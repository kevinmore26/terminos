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

import {
  AuthReactContext,
  AuthReactProvider,
} from "../../context/reactAuthContext";
import "../../main.css";
import MercadoPagoForm2 from "./MercadoPagoConfirm";
import MercadoPagoDenied from "./MercadoPagoDenied";
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

export default function MercadoPagoForm({ modalIsOpen, setIsOpen }) {
  const [modalIsOpen2, setIsOpen2] = useState(false);
  const [state, setState] = useState(INITIAL_STATE);
  const [cargandoPago, setCargandoPago] = useState(false);
  const resultPayment = useMercadoPago();
  const { user } = useContext(AuthReactContext);
  console.log(modalIsOpen);
  console.log(resultPayment);
  const handleInputChange = (e) => {
    //console.log(e.target)
    setState({
      ...state,
      [e.target.dataset.name || e.target.name]: e.target.value,
    });
  };
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
      backgroundColor: "#F2F2F2",
    },
  };
  let subtitle;
  const handleInputFocus = (e) => {
    //console.log(e.target)
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
    subtitle.style.color = "#f00";
  }
  useEffect(() => {
    const carritoStorage = JSON.parse(localStorage.getItem("usuario"));
    const obtenerUsuarioId = `${usuario.content.user_id}-${usuario.content.clienteCelular}  `;
    console.log(obtenerUsuarioId);
  }, []);
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  console.log(usuario);

  return (
    <div
      className="  row d-flex "
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: "25px",
      }}
    >
      <div className="col-3">
        <Card
          cvc={state.cvc}
          expiry={state.cardExpirationMonth + state.cardExpirationYear}
          name={state.cardholderName}
          number={state.cardNumber}
          focused={state.focus}
          brand={state.issuer}
          cardholderName="hola"
          placeholders={state.placeholders}
        />
      </div>
      <div className="col-6 row">
        <form id="form-checkout">
          <div>
            <label className="form-label" style={{}}>
              Número de tarjeta
            </label>
            <input
              type="tel"
              className="form-control"
              name="cardNumber"
              placeholder="**** **** **** ****"
              id="form-checkout__cardNumber"
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
          </div>
          <div className="row">
            <div className="col-6">
              <label className="form-label" style={{}}>
                Fecha Exp.
              </label>
              <input
                type="tel"
                className="form-control"
                name="cardExpirationMonth"
                id="form-checkout__cardExpirationMonth"
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
            </div>
            <div className="col-6">
              <label className="form-label" style={{}}>
                Año Exp.
              </label>
              <input
                type="tel"
                className="form-control"
                name="cardExpirationYear"
                id="form-checkout__cardExpirationYear"
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
            </div>
          </div>
          <div>
            <label className="form-label" style={{}}>
              Código
            </label>
            <input
              type="tel"
              className="form-control"
              name="cvc"
              id="form-checkout__securityCode"
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
          </div>
          <div>
            <label className="form-label" style={{}}>
              Nombre del titular
            </label>
            <input
              type="text"
              className="form-control"
              name="cardholderName"
              id="form-checkout__cardholderName"
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
            <div style={{ visibility: "hidden", position: "absolute" }}>
              <label className="form-label" style={{}}>
                Correo
              </label>
              <input
                type="text"
                className="form-control"
                name="cardholderEmail"
                id="form-checkout__cardholderEmail"
                defaultValue={
                  usuario.content.user_id + usuario.content.clienteCorreo
                }
                onFocus={handleInputFocus}
              />
            </div>
          </div>
          <div style={{ visibility: "hidden", position: "absolute" }}>
            <select
              className="form-control"
              name="issuer"
              id="form-checkout__issuer"
              on
            ></select>
            <select
              className="form-control"
              name="identificationType"
              id="form-checkout__identificationType"
            ></select>
          </div>
          <div style={{ visibility: "hidden", position: "absolute" }}>
            <label className="form-label" style={{}}>
              Número de identidad
            </label>
            <input
              className="form-control"
              type="text"
              name="identificationNumber"
              id="form-checkout__identificationNumber"
              defaultValue={usuario.content.clienteCelular}
            />
          </div>
          <div style={{ visibility: "hidden", position: "absolute" }}>
            <select
              name="installments"
              className="form-control"
              id="form-checkout__installments"
            ></select>
          </div>
          <div className="d-flex">
            <button
              onClick={() => setIsOpen(false)}
              style={{
                color: "black",
                display: "inline-flex",
                border: "none",
                background: "#fff",
                borderRadius: "5px",
                color: "#000",
                padding: " 5px 14px",
                margin: "0 auto",
                marginTop: "10px",
                textDecoration: "none",
                boxShadow:
                  "0 4px 6px rgb(50 50 93 / 11%), 0 1px 3px rgb(0 0 0 / 8%)",
              }}
            >
              Cancelar
            </button>
            {!cargandoPago ? (
              <button
                onClick={() => {
                  openModal();
                }}
                type="submit"
                id="form-checkout__submit"
                style={{
                  color: "black",
                  border: "none",
                  background: "#0651F2",
                  borderRadius: "5px",
                  color: "white",
                  padding: " 5px 14px",
                  margin: "0 auto",
                  marginTop: "10px",
                  textDecoration: "none",
                  textTransform: "none",
                  letterSpacing: "0",
                  display: "inline-flex",
                  minWidth: "15px",
                  whiteSpace: "nowrap",
                  fontSize: "15px",
                  fontWeight: "600",
                }}
              >
                Pagar con esta tarjeta
              </button>
            ) : (
              <div></div>
            )}

            {cargandoPago ? (
              <div>
                <Button
                  style={{
                    color: "black",
                    border: "none",
                    background: "#0651F2",
                    borderRadius: "5px",
                    color: "white",
                    padding: " 5px 14px",
                    margin: "0 auto",
                    marginTop: "10px",
                    textDecoration: "none",
                    textTransform: "none",
                    letterSpacing: "0",
                    display: "inline-flex",
                    minWidth: "15px",
                    whiteSpace: "nowrap",
                    fontSize: "15px",
                    fontWeight: "600",
                  }}
                  disabled
                >
                  <Spinner
                    style={{ marginTop: "4px" }}
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  Espere...
                </Button>
              </div>
            ) : (
              <div></div>
            )}
          </div>
          <div style={{ color: "#999", fontSize: "14px", marginTop: "5px" }}>
            Asegúrese de colocar los datos correctamente.
          </div>
        </form>
        <div class="progress-bar">
          <span class="bar">
            <span class="progress"></span>
          </span>
        </div>
      </div>
      {resultPayment && (
        <Modal
          isOpen={modalIsOpen2}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles2}
          contentLabel="Example Modal"
        >
          {/*    <p>{JSON.stringify(resultPayment)}</p> */}
          {resultPayment.status == "approved" && (
            <MercadoPagoForm2
              ariaHideApp={false}
              resultPayment={resultPayment}
              modalIsOpen={modalIsOpen}
              setIsOpen={setIsOpen}
            />
          )}

          {resultPayment.status != "approved" && (
            <MercadoPagoDenied
              ariaHideApp={false}
              resultPayment={resultPayment}
              modalIsOpen={modalIsOpen}
              setIsOpen={setIsOpen}
            />
          )}
        </Modal>
      )}
    </div>
  );
}
