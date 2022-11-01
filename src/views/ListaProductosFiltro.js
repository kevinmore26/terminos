import GroupProducts from "../components/GroupProductos";
import {
  obtenerProductosFiltro,
  obtenerProductos,
} from "../services/productosServices";

import Loading from "../components/Loading";
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
import * as actions from "../services/index";
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
import { useContext, useState, useEffect } from "react";
import "../components/Footer.css";
import Search from "../components/widgets/searchbar";
export default function ProductosFiltroView() {
  const [productos, setProductos] = useState([]);
  const [miBusqueda, setmiBusqueda] = useState([]);
  const [authPending, setAuthPending] = useState(true);
  const { carrito, busquedaContext } = useContext(CarritoContext);
  const { musica, setMusica } = useState([]);
  const { userState } = useContext(AuthContext);
  const { signOut } = useContext(AuthContext);
  const { Out } = useContext(AuthReactContext);
  console.log("entrobusquedaContext");
  console.log(busquedaContext);
  const totalCarrito = carrito.reduce((total, item) => {
    return total + item.cantidad;
  }, 0);
  const { user } = useContext(AuthReactContext);
  let input = "";
  console.log(user);
  console.log(miBusqueda);

  let searchAlbums = async (term) => {
    console.log(term);
    input = term;
    setmiBusqueda(term);

    console.log(miBusqueda);
    const productosFiltrados = await obtenerProductosFiltro(term);
    setProductos(productosFiltrados);
  };
  const getProductos = async () => {
    const productosFiltrados = await obtenerProductosFiltro("");
    const productosFiltrados2 = await obtenerProductosFiltro(
      busquedaContext.value
    );
    setProductos(productosFiltrados2);

    if (
      miBusqueda == "" ||
      miBusqueda == [] ||
      miBusqueda == null ||
      miBusqueda == undefined
    ) {
      searchAlbums();
      const productosFiltrados = await obtenerProductosFiltro(
        busquedaContext.value
      );
      setProductos(productosFiltrados);
      setAuthPending(false);
    } else {
      searchAlbums();
      console.log("entroelse");
      console.log(miBusqueda);
      const productosFiltrados = await obtenerProductosFiltro(
        busquedaContext.value
      );
      setProductos(productosFiltrados);
      setAuthPending(false);
    }
    setAuthPending(false);
  };
  useEffect(() => {
    searchAlbums();
  }, []);
  useEffect(() => {
    getProductos();
  }, []);
  if (authPending) {
    return <Loading />;
  }

  return (
    <div>
      <Navbar
        fixed="top"
        expand="lg"
        style={{
          backgroundColor: "#F2F2F2",
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
              color: "rgb(106, 105, 110) !important",
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
              Comida RÃ¡pida
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
            <InputGroup className="me-auto " style={{ width: "50%" }}>
              <Search searchAlbums={searchAlbums} />
            </InputGroup>
            <Form className="d-flex">
              <Navbar.Collapse id="basic-navbar-nav  " expand="lg">
                <Nav className="me-auto">
                  {user != null ? (
                    <Link
                      to={
                        user.clienteTipo == 1
                          ? "/administrador"
                          : "/carrito/mispedidos"
                      }
                      style={{
                        textDecoration: "none",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          color: "rgb(106, 105, 110)",
                          fontWeight: "500",
                          marginRight: "5px",
                        }}
                      >
                        {user.clienteTipo == 1
                          ? "Administrador"
                          : "Mis pedidos"}
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
                          color: "rgb(106, 105, 110)",
                          fontWeight: "500",
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
                        <div className=" row d-inline text-rgb(106, 105, 110)">
                          <FontAwesomeIcon
                            className="col-2"
                            icon={faUserCircle}
                            style={{
                              fontSize: "25px",
                              position: "relative",
                              left: "15px",
                              top: "3px",
                            }}
                          />
                          <Link
                            to="/iniciarSesion"
                            className="col-7"
                            style={{
                              color: "rgb(106, 105, 110)",
                              textDecoration: "none",
                              position: "relative",
                              bottom: "2px",
                            }}
                          >
                            Iniciar Sesión
                          </Link>
                        </div>
                      }
                      id="nav-dropdown"
                      bg="light"
                      icon="account_circle_outline"
                      style={{
                        color: "rgb(106, 105, 110) !important",
                        position: "relative",
                      }}
                    ></NavDropdown>
                  )}
                  {user != null && (
                    <NavDropdown
                      color="rgb(106, 105, 110)"
                      style={{
                        position: "relative",
                        color: "rgb(106, 105, 110) !important",
                      }}
                      title={
                        <div className="d-inline text-rgb(106, 105, 110)">
                          <img
                            src="https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png"
                            className="me-2"
                            style={{
                              borderRadius: "50%",
                              width: "30px",
                              color: "rgb(106, 105, 110) !important",
                            }}
                            alt="avatar"
                          />
                          <span className="text-black">
                            {user.clienteNombre}
                          </span>
                        </div>
                      }
                    >
                      <NavDropdown.Item
                        className="text-rgb(106, 105, 110)"
                        onClick={Out}
                        style={{
                          color: "rgb(106, 105, 110) !important",
                          backgroundColor: "rgb(106, 105, 110) !important",
                        }}
                      >
                        Cerrar Sesión
                      </NavDropdown.Item>
                    </NavDropdown>
                  )}
                  {userState != null && (
                    <NavDropdown
                      bg="light"
                      className="text-black"
                      menuVariant="black"
                      style={{
                        color: "black !important",
                        height: "30px",
                        backgroundColor: "rgb(106, 105, 110) !important",
                      }}
                      title={
                        <div
                          className="text-black"
                          style={{ margin: "0 10px" }}
                        >
                          <img
                            src={userState.photoURL}
                            className="me-2"
                            style={{
                              borderRadius: "50%",
                              width: "30px",
                              color: "rgb(106, 105, 110) !important",
                            }}
                            alt="avatar"
                          />
                          <span
                            color="black"
                            style={{
                              color: "rgb(106, 105, 110) !important",
                              marginTop: "10px",
                            }}
                          >
                            {userState.displayName}
                          </span>
                        </div>
                      }
                    >
                      <NavDropdown.Item
                        onClick={signOut}
                        style={{
                          color: "rgb(106, 105, 110) !important",
                          backgroundColor: "rgb(106, 105, 110) !important",
                        }}
                      >
                        Cerrar Sesión
                      </NavDropdown.Item>
                    </NavDropdown>
                  )}

                  {/* ------------------------------------------------------- */}

                  <Link to="/carrito" className="nav-link">
                    <Badge color="primary" badgeContent={totalCarrito}>
                      <ShoppingCartIcon
                        style={{ color: "rgb(106, 105, 110)" }}
                      ></ShoppingCartIcon>
                    </Badge>
                  </Link>
                </Nav>
              </Navbar.Collapse>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <GroupProducts
        productos={productos}
        setsetmiBusqueda={setmiBusqueda}
        miBusqueda={miBusqueda}
        style={{ position: "relative", top: "150px !important" }}
      />
    </div>
  );
}
