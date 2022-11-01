import React from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from "@material-ui/core";
import { useState } from "react";
// import {Modal} from '@material-ui/core';
// import Button from '@material-ui/core';

import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function Modalcheckout() {
  function sendEmail(e) {
    e.preventDefault();
  }
  const history = useNavigate();
  const mostrarAlerta = async () => {
    const resultado = await Swal.fire({
      icon: "success",
      title: "Gracias por preferinos! :)",
      text: "Vuelva pronto",
      width: 600,
      padding: "3em",
      showConfirmButton: true,
      showDenyButton: true,
      denyButtonText: "Home",
      confirmButtonText: "Volver a comprar!",
      background: "#ffff",
      zIndex: "2000",
      backdrop: `
              rgba(0,0,123,0.4)
              url("https://sweetalert2.github.io/images/nyan-cat.gif")
              left center
              no-repeat
            `,
    });
    if (resultado.isConfirmed) {
      history.push("/");
    } else if (resultado.isDenied) {
      history.push("/");
    }
  };
 
  const [modal, setModal] = useState(false);

  const abrirCerrarModal = () => {
    setModal(!modal);
  };

  const body = (
    <div
 
      style={{
        border: "none",
        borderRadius: "30px",
        padding: "85px",
        paddingBottom: "30px",
        paddingLeft: "30px",
        paddingRight: "30px",
      }}
    >
      <div align="center" style={{}}>
        {/* <div className="col-lg-8 col-sm-12 form-group pt-1 mx-auto">
                        <label>Email</label>
                            <input type="email" className="form-control" required placeholder="Seu email" name="email"/>
                        </div>    */}

        <section
          style={{
            position: "relative  ",
            buttom: "240px",
          }}
        >
          <Button
            onClick={() => mostrarAlerta()}
            style={{
              textDecoration: "none",
              // postition:'relative',
              // top:'70px',
            }}
          >
            <Link
              style={{
                textDecoration: "none",
              }}
            >
              Cancelar
            </Link>
          </Button>
          <Button
            color="primary"
            ype="submit"
            className="btn btn-info"
            value="Enviar mensagem"
            onClick={(e) => {
              mostrarAlerta();
              abrirCerrarModal();
            }}
            style={{
              textDecoration: "none",

              backgroundColor: "#33b665",
              color: "white",
              borderRadius: "37px",
              width: "132px",
              height: "37px",
            }}
          >
            Pagar
          </Button>

          {/* <div className="col-lg-8 col-sm-12 pt-3 mx-auto">
                            <input type="submit" className="btn btn-info" value="Enviar mensagem"></input>
                        </div> */}
        </section>
      </div>
    </div>
  );
  {
    return (
      <div
        className="Modalcheckout"
        style={{
          color: "skyblue",
          background:
            "linear-gradient(to top, rgb(54 146 74), rgb(129 218 100))",
          width: "45vw",
          height: "78px",
          borderRadius: "40px",
        }}
      >
        <Button
      
          onClick={() => abrirCerrarModal()}
          style={{
            width: "480px",
          }}
        >
          <h5
            style={{
              color: "white",
              position: "relative",
              top: "20px",
              width: "480px",
            }}
          >
            Comprar
          </h5>
        </Button>

        <Modal open={modal} onClose={abrirCerrarModal}>
          {body}
        </Modal>
      </div>
    );
  }
}

export default Modalcheckout;
