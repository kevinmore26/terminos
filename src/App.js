import { BrowserRouter, Routes, Route } from "react-router-dom";
import VistaPrincipal from "./views/VistaPrincipal";
import ProductosComidaRapida from "./views/ProductosKfcView";
import CrearProductoView from "./views/CrearProductoView";
import ListaProductosView from "./views/ListarProductosView";
import { useContext, useEffect } from "react";
import EditarProductoView from "./views/EditarProductoView";
import EliminarProducto from "./views/EliminarProducto";
import ComidaRapidaListView from "./views/ComidaRapidaListView";
import ProductosKfcView from "./views/ProductosKfcView";
import ProductoView from "./views/ProductoView";
import CarritoContextProvider from "./context/carritoContext";
import CarritoView from "./views/CarritoView";
import { AuthContextProvider } from "./context/authContext";
import RegistroView from "./views/RegistroView";
import {
  AuthReactProvider,
  AuthReactContext,
} from "./context/reactAuthContext";
import IniciarSecionView from "./views/IniciarSecionView";

import ProtectedRoute from "./components/ProtectedRoute";
import IniciarSecionErrorView from "./views/ErrorLogin";
import RegistroErrorView from "./views/RegistroError";
import RegistroError2View from "./views/RegistroError2";
import CheckoutView from "./views/Checkout";
import TerminosCondiciones from "./views/TerminoYCondiciones";
import MapPrueba from "./components/PruebaMap";
import MapView from "./components/MapView";
import GoogleMapView from "./components/GoogleMaps";
import ProductosFiltroView from "./views/ListaProductosFiltro";
import ProductosDominosView from "./views/ProductosDominosView";
import MercadoPagoForm from "./components/MercadoPago/MercadoPagoForm";
import CheckoutRespaldoView from "./views/CheckoutRespado"; 
import PedidosUsuarioView from "./views/PedidosViewUsuario";
import PedidosUsuario from "./components/PedidosUsuarioGroup";
import { ContactUs } from "./views/PruebaEmail";
import BuscarPedidoUsuarioView from "./views/BuscarPedidoUsuarioView";
export default function App() {
  const userState = useContext(AuthReactContext);
  console.log("userState");
  console.log(userState);
  return (
    <BrowserRouter>
      <AuthReactProvider>
        <AuthContextProvider>
          <CarritoContextProvider>
            <Routes>
              {/* el Routes va verificar qué ruta necesitamos y que componente usar */}
              <Route exact path="/" element={<VistaPrincipal />} />
              
              <Route exact path="/buscarpedidos" element={<BuscarPedidoUsuarioView />} />
              <Route exact path="/contact" element={<ContactUs />} />
              <Route exact path="/mercadopago" element={<MercadoPagoForm />} />

              <Route exact path="/google" element={<GoogleMapView />} />
              <Route exact path="/checkoutInfo" element={<CheckoutRespaldoView />} />
              
              <Route exact path="/mispedidos" element={<PedidosUsuario />} />
              <Route exact path="/carrito/mispedidos" element={<PedidosUsuarioView />} />
              <Route
                exact
                path="/listadoFiltroProductos"
                element={<ProductosFiltroView />}
              />
              <Route
                exact
                path="/registroError2"
                element={<RegistroError2View />}
              />
              <Route exact path="/geolocator" element={<MapPrueba />} />
              <Route exact path="/map" element={<MapView />} />
              <Route
                exact
                path="/registroError"
                element={<RegistroErrorView />}
              />
              <Route exact path="/registro" element={<RegistroView />} />
              <Route
                exact
                path="/iniciarSesion"
                element={<IniciarSecionView />}
              />
              <Route exact path="/checkout" element={<CheckoutView />} />
              <Route exact path="/terminosycondiciones" element={<TerminosCondiciones />} />
              <Route
                exact
                path="/erroIniciarSesion"
                element={<IniciarSecionErrorView />}
              />

              <Route path="/carrito" element={<CarritoView />} />

              <Route
                exact
                path="/comidarapidalist/productoskfc"
                element={<ProductosKfcView />}
              />
              <Route
                exact
                path="/comidarapidalist/productosDominos"
                element={<ProductosDominosView />}
              />
              <Route
                exact
                path="/comidarapidalist/productoskfc/:id"
                element={<ProductoView />}
              />
              <Route
                exact
                path="/comidarapidalist"
                element={<ComidaRapidaListView />}
              />
              <Route exact path="/crear" element={<CrearProductoView />} />
              <Route
                exact
                path="/administrador"
                element={<ListaProductosView />}
              />
              <Route
                exact
                path="/editar/:id"
                element={<EditarProductoView />}
              />
              <Route
                exact
                path="/eliminar/:id"
                element={<EliminarProducto />}
              />
            </Routes>
          </CarritoContextProvider>
        </AuthContextProvider>
      </AuthReactProvider>
    </BrowserRouter>
  );
}
