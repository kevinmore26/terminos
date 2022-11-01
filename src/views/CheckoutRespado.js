import { useState, useContext, useEffect } from "react";
import { CarritoContext } from "../context/carritoContext";
import { useForm } from "react-hook-form";
import NavTop from "../components/NavtopCheckout";
import Modalcheckout from "../components/Modalcheckout";
import { Link, useParams, useNavigate, Navigate } from "react-router-dom";
import {
  AuthReactContext,
  AuthReactProvider,
} from "../context/reactAuthContext";
import Modal from "react-modal";
import Swal from "sweetalert2";
import {
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  ButtonGroup,
  Image,
  Container,
} from "react-bootstrap";
import { editarUsuario } from "../services/usuarioService";
import FormProductoCheckout from "../components/FormCheckout";
import Loading from "../components/Loading";
import { AuthContext } from "../context/authContext";
import IniciarSecionView from "./IniciarSecionView";
import MercadoPagoForm from "../components/MercadoPago/MercadoPagoForm";

export default function CheckoutRespaldoView() {
  const customStyles = {
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
  const { carrito } = useContext(CarritoContext);
  const { id } = useParams();
  const { userState } = useContext(AuthContext);
  const [checked, setchecked] = useState(false);
  const [authPending, setAuthPending] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const userStorage = JSON.parse(localStorage.getItem("usuario"));
  console.log("userStorage");
  console.log(userStorage);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  let subtitle;
  const { user, Out } = useContext(AuthReactContext);
  console.log(user);
  const navigate = useNavigate();

  let [value, setValue] = useState({
    clienteApellido:
      userStorage == null ? "" : userStorage.content.clienteApellido,
    clienteCelular:
      userStorage == null ? "" : userStorage.content.clienteCelular,
    clienteCorreo: userStorage == null ? "" : userStorage.content.clienteCorreo,
    clienteDireccion:
      userStorage == null ? "" : userStorage.content.clienteDireccion,
    clienteNombre: userStorage == null ? "" : userStorage.content.clienteNombre,
    clienteDocumento:
      userStorage == null ? "" : userStorage.content.clienteDocumento,
  });
  console.log("checked");
  console.log(checked);
  useEffect(() => {
    if (checked == true) {
      console.log("estrueeee");
      const userStorage = JSON.parse(localStorage.getItem("usuario"));
      console.log("userStorage");
      console.log(userStorage);
      navigate("/checkout");
      return;
    }
  }, [checked]);

  const getUsuario = async () => {
    console.log("productoObtenido");
    user.clienteDireccion = userStorage.content.clienteDireccion;
    if (user.content != null) {
      console.log("errrrrrorrr");
      if (user.content.content) {
        console.log("entrando errrrrrorrr");
        Out();
        console.log("Out");
        navigate("/iniciarSesion");
      }
    }
    try {
      setAuthPending(true);
      const productoObtenido = user.content;
      setAuthPending(false);
      console.log(productoObtenido);
      setValue({ ...productoObtenido });
    } catch (error) {
      console.error(error);
    }
  };
  const getUsuarioCopia = async () => {
    console.log("productoObtenido");

    user.clienteDireccion = userStorage.content.clienteDireccion;
    try {
      setAuthPending(true);
      const productoObtenido = user.content;
      setAuthPending(false);
      console.log(productoObtenido);
      setValue({ ...user.content });
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const userStorage = JSON.parse(localStorage.getItem("usuario"));
    console.log(userStorage);
    getUsuario();
  }, []);
  useEffect(() => {
    getUsuarioCopia();
  }, []);
  useEffect(() => {
    console.log(user);
    getUsuarioCopia();
  }, []);

  console.log(user);
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }
  const actualizarInput = (e) => {
    user.clienteDireccion = value.clienteDireccion;
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };
  const manejarSubmit = async (e) => {
    e.preventDefault();

    console.log(value);
    try {
      console.log(value);
      if (value.clienteDireccion != "") {
        user.clienteDireccion = value.clienteDireccion;
      }
      await editarUsuario(user, userStorage.content.user_id);
      console.log(user);
      //user.content.clienteDireccion  = value.clienteDireccion
      await Swal.fire({
        icon: "success",
        title: "Información actualizada exitosamente",
        showConfirmButton: true,
        showDenyButton: true,
        confirmButtonText: "Volver",
        denyButtonText: "Cancelar",
      }).then((resultado) => {
        if (resultado.isConfirmed) {
          setAuthPending(true);
          navigate("/checkout");
          setAuthPending(false);
        } else {
          navigate("/checkout");
        }
      });
    } catch (error) {
      console.log("errorrrrr");
    }
  };

  let total = 0;
  let subTotal = 0;
  let envio = 3;
  subTotal = carrito.reduce((acum, item) => {
    return acum + item.cantidad * item.productoPrecio;
  }, 0);
  total = carrito.reduce((acum, item) => {
    return envio + acum + item.cantidad * item.productoPrecio;
  }, 0);
  if (authPending) {
    return <Loading />;
  }

  return (
    <div>
      {user == null && userState == null && userStorage == null ? (
        <IniciarSecionView />
      ) : (
        <div className="container">
          <NavTop />

          <div
            className="row justify-around "
            style={{
              position: "relative",
              top: "60px",
              justifyContent: "space-between",
            }}
          >
            <div
              className="col-4 col-md-5"
              style={{
                margin: "35px",
                textAlign: "left",
              }}
            >
              <section>
                <h3
                  style={{
                    textAlign: "left",
                    color: "#0651F2",
                  }}
                >
                  Datos de envío
                </h3>

                <h6
                  style={{
                    textAlign: "left",
                    color: "#0651F2",
                  }}
                >
                  Por favor ingrese su dirección de envío
                </h6>
                <hr></hr>

                {!userStorage && (
                  <Form>
                    <Form.Check
                      type="switch"
                      value={checked}
                      onClick={() => {
                        console.log("entrandocheck");
                        setchecked(!checked);
                        console.log(checked);
                      }}
                      id="custom-switch"
                      label="Usar mis datos personales"
                    />
                  </Form>
                )}
                {userStorage && (
                  <FormProductoCheckout
                    value={value}
                    actualizarInput={actualizarInput}
                    manejarSubmit={manejarSubmit}
                  />
                )}
              </section>
            </div>

            <div
              className="col-4 col-md-4"
              style={{
                marginTop: "38px",
                fontFamily: "Lato, Tahoma, Sans-Serif",
              }}
            >
              <p>
                Por favor verifique los productos e indique los datos
                solicitados
              </p>
              <div className="row">
                <div
                  className="col-sm-12 col-md-6"
                  style={{
                    width: "41vw",
                  }}
                >
                  <ul className="list-group">
                    {total !== 0 ? (
                      <div
                        style={{
                          boxShadow:
                            "rgb(50 50 93 / 11%) 0px 4px 6px, rgb(0 0 0 / 8%) 0px 1px 3px",
                          backgroundColor: "#F2F2F2",
                          padding: "30px",
                        }}
                      >
                        <div
                          style={{
                            textAlign: "center",
                            fontWeight: "bold",
                            color: "rgb(106, 105, 110)",
                          }}
                        >
                          RESUMEN DE LA ORDEN
                        </div>

                        <div>
                          <hr></hr>
                          {carrito.map((prod, i) => (
                            <li
                              className="  d-flex justify-content-between"
                              key={i}
                            >
                              <div>
                                <div
                                  className="fw-bold"
                                  style={{
                                    whiteSpace: "nowrap",
                                    textOverflow: "ellipsis",
                                    fontSize: "14px",
                                    lineHeight: "14px",
                                    padding: "2px 0px",
                                    width: "100px",
                                  }}
                                >
                                  {prod.productoNombre}
                                </div>
                                <small style={{ fontSize: "10px" }}>
                                  {prod.cantidad} un.
                                </small>
                                <br />
                              </div>
                              <div>
                                <small
                                  className="badge   "
                                  style={{
                                    fontSize: "14px",
                                    color: "black",
                                  }}
                                >
                                  S/{" "}
                                  {(
                                    prod.cantidad * prod.productoPrecio
                                  ).toFixed(2)}
                                </small>
                              </div>
                            </li>
                          ))}
                          <hr></hr>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <p>SubTotal </p>
                            <p>S/{subTotal.toFixed(2)}</p>
                          </div>

                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <p>Envío </p>
                            <p>S/6.00</p>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <h6
                              style={{ fontWeight: "bold", color: "#0651F2" }}
                            >
                              TOTAL{" "}
                            </h6>

                            <h6 style={{ fontWeight: "bold" }}>
                              S/{total.toFixed(2)}
                            </h6>
                          </div>
                          <hr></hr>
                          <div
                            disabled={
                              user.content &&
                              (user.content.clienteDireccion == null ||
                              user.content.clienteDireccion == ""
                                ? true
                                : false)
                            }
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              margin: "0 auto",
                            }}
                          >
                            <button
                              onClick={openModal}
                              style={{
                                color: "black",
                                border: "none",
                                backgroundColor: "#0651F2",
                                borderRadius: "5px",
                                color: "white",
                                padding: "10px",
                                margin: "0 auto",
                                marginTop: "10px",
                                textDecoration: "none",
                              }}
                            >
                              Confirmar pedido
                            </button>
                            <Modal
                              isOpen={modalIsOpen}
                              onAfterOpen={afterOpenModal}
                              onRequestClose={closeModal}
                              style={customStyles}
                              contentLabel="Example Modal"
                            >
                              <h5 style={{ color: "black iImportant" }}>
                                Ingresa los datos de tu tarjeta
                              </h5>

                              <MercadoPagoForm
                                modalIsOpen={modalIsOpen}
                                setIsOpen={setIsOpen}
                              />
                            </Modal>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <li className="list-group-item">
                        Todavía no ha agregado ningún producto.
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
