import {
    Navbar,
    Nav,
    NavDropdown,
    Container,
    InputGroup,
    FormControl,
    Form,
    DropdownButton,
    ButtonGroup,
    Dropdown,
    ButtonToolbar,
    Button,
  } from "react-bootstrap";
  import * as actions from '../services/index';
  import pic from "../assets/casco-moto.png";
  import { Link } from "react-router-dom";
  import { BiUserCircle } from "react-icons/bi";
  import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
  import { AuthContext, AuthContextProvider } from "../context/authContext";
  import {
    AuthReactContext,
    AuthReactProvider,
  } from "../context/reactAuthContext";
  import Badge from "@material-ui/core/Badge";
  import Logo from "../assets/logollego.PNG";
  import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import { CarritoContext } from "../context/carritoContext";
  import { useContext } from "react";
  import "./Footer.css";
  import Search from "./widgets/searchbar";
  export default function NavTopCheckout() {
    const { carrito } = useContext(CarritoContext);
    const { userState } = useContext(AuthContext);
    const { signOut } = useContext(AuthContext);
    const { Out } = useContext(AuthReactContext);
    const totalCarrito = carrito.reduce((total, item) => {
      return total + item.cantidad;
    }, 0);
    const { user } = useContext(AuthReactContext);
    console.log(user);
    
    let searchAlbums=(term)=>{
      actions.getAlbums(term).then(item=>this.setState({
        albums:item
      }))
    }
    return (
      <div>
        <Navbar
          fixed="top"
          expand="lg"
          style={{
            backgroundColor : "#F2F2F2",
            display: "flex",
            justifyContent: "center",
            height: "68px",
          }}
        >
          <Container style={{ margin: "0 8%" }}>
            <NavDropdown
              title={
                <div className="pull-left">
                  <img
                    className="thumbnail-image"
                    src="https://www.samueldiosdado.com/wp-content/uploads/2017/08/Men%C3%BA-hamburguesa-herramienta-practica-o-icono-inutil.png"
                    alt="user pic"
                    style={{ width: "20px" }}
                  />
                </div>
              }
              bg="light"
              className="prueba"
              icon="account_circle_outline"
              style={{
                color: "white !important",
                position: "relative",
                top: "8px",
              }}
            >
              <NavDropdown.Item
                href="#action/3.2"
                id="nav-dropdown"
                className="dropdownWidth"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "0 auto",
                }}
              >
                Supermercado
                <FontAwesomeIcon
                  icon={faUserCircle}
                  style={{ fontSize: "25px" }}
                />
              </NavDropdown.Item>
              <NavDropdown.Item
                className="dropdownWidth"
                href="#action/3.2"
                id="nav-dropdown"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "0 auto",
                }}
              >
                Minimarket
                <FontAwesomeIcon
                  icon={faUserCircle}
                  style={{ fontSize: "25px" }}
                />
              </NavDropdown.Item>
              <NavDropdown.Item
                className="dropdownWidth"
                href="#action/3.2"
                id="nav-dropdown"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "0 auto",
                }}
              >
                Comida Rápida
                <FontAwesomeIcon
                  icon={faUserCircle}
                  style={{ fontSize: "25px" }}
                />
              </NavDropdown.Item>
              <NavDropdown.Item
                className="dropdownWidth"
                href="#action/3.2"
                id="nav-dropdown"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "0 auto",
                }}
              >
                Electro
                <FontAwesomeIcon
                  icon={faUserCircle}
                  style={{ fontSize: "25px" }}
                />
              </NavDropdown.Item>
              <NavDropdown.Item
                className="dropdownWidth"
                href="#action/3.2"
                id="nav-dropdown"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "0 auto",
                }}
              >
                Farmacia
                <FontAwesomeIcon
                  icon={faUserCircle}
                  style={{ fontSize: "25px" }}
                />
              </NavDropdown.Item>
              <NavDropdown.Item
                className="dropdownWidth"
                href="#action/3.2"
                id="nav-dropdown"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "0 auto",
                }}
              >
                Mascotas
                <FontAwesomeIcon
                  icon={faUserCircle}
                  style={{ fontSize: "25px" }}
                />
              </NavDropdown.Item>
              <NavDropdown.Item
                className="dropdownWidth"
                href="#action/3.2"
                id="nav-dropdown"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "0 auto",
                }}
              >
                Bebidas
                <FontAwesomeIcon
                  icon={faUserCircle}
                  style={{ fontSize: "25px" }}
                />
              </NavDropdown.Item>
            </NavDropdown>
            <Link to="/">
              <img
                className="d-block "
                src={Logo}
                alt="First slide"
                style={{ height: "50px", position: "relative", left: "10px" }}
              />
            </Link>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse
              id="navbarScroll"
              style={{ position: "relative", right: "20px" }}
            >
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll
              ></Nav>
                
              <Form className="d-flex">
                <Navbar.Collapse id="basic-navbar-nav  " expand="lg">
                  <Nav className="me-auto">
                    {user != null ? (
                      <Link
                        to={user.clienteTipo ==1 ? "/administrador" : "/carrito/mispedidos"}
                        style={{
                          textDecoration: "none",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            color: "white",
  
                            marginRight: "5px",
                          }}
                        >
                          {user.clienteTipo ==1 ? "Administrador" : " "}
                        </div>
                      </Link>
                    ) : (
                      <Link
                        to="/carrito"
                        style={{
                          textDecoration: "none",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            color: "black",
                            fontWeight:"500",  
                            marginRight: "5px",
                          }}
                        >
                          Mis Pedidos
                        </div>
                      </Link>
                    )}
  
                    {userState == null && user == null && (
                      
                      <NavDropdown
                        title={
                          <div className=" row d-inline text-black" >
                            <FontAwesomeIcon
                              className="col-2"
                              icon={faUserCircle}
                              style={{ fontSize: "25px",position:"relative",left:"15px",top:"3px" }}
                            />
                           <Link
                            to="/iniciarSesion"
                            className="col-7"
                            style={{ color: "black", textDecoration: "none",position:"relative",bottom:"2px" }}
                          >
                            Iniciar Sesión
                          </Link>
                          </div>
                        }
                        id="nav-dropdown"
                        bg="light"
                         
                        icon="account_circle_outline"
                        style={{
                          color: "white !important",
                          position: "relative",
                         
                        }}
                      >
                   
                      </NavDropdown>
                    )}
                    {user != null && (
                      <NavDropdown
                        color="#0651F2"
                        style={{
                          position: "relative",
                          color: "white !important",
                        }}
                        title={
                          <div className="d-inline text-#0651F2">
                            <img
                              src="https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png"
                              className="me-2"
                              style={{
                                borderRadius: "50%",
                                width: "30px",
                                color: "#0651F2 !important",
                              }}
                              alt="avatar"
                            />
                            <span
                              color="#0651F2"
                              style={{ color: "#0651F2 !important" }}
                            >
                              {user.clienteNombre}
                            </span>
                          </div>
                        }
                      >
                        <NavDropdown.Item
                          className="text-#0651F2"
                          onClick={Out}
                          style={{ color: "#0651F2 !important" }}
                        >
                          Cerrar Sesión
                        </NavDropdown.Item>
                      </NavDropdown>
                    )}
                    {userState != null && (
                      <NavDropdown
                        bg="light"
                        className="text-#0651F2"
                        menuVariant="#0651F2"
                        style={{
                          color: "#0651F2 !important",
                          height: "30px",
                        }}
                        title={
                          <div
                            className="text-#0651F2"
                            style={{ margin: "0 10px" }}
                          >
                            <img
                              src={userState.photoURL}
                              className="me-2"
                              style={{
                                borderRadius: "50%",
                                width: "30px",
                                color: "#0651F2 !important",
                              }}
                              alt="avatar"
                            />
                            <span style={{ color: "#0651F2", marginTop: "10px" }}>
                              {userState.displayName}
                            </span>
                          </div>
                        }
                      >
                        <NavDropdown.Item
                          onClick={signOut}
                          style={{ color: "#0651F2 !important" }}
                        >
                           Cerrar Sesión
                        </NavDropdown.Item>
                      </NavDropdown>
                    )}
                     
                    {/* ------------------------------------------------------- */}
  
                     
                  </Nav>
                </Navbar.Collapse>
              </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
  