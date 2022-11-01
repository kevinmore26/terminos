import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { Route, Navigate , Router} from "react-router-dom";
import CarritoView from "../views/CarritoView";
import { AuthReactContext } from "../context/reactAuthContext";

export default function ProtectedRoute({ component: Component, ...rest }) {
	const  userState = useContext(AuthReactContext);

	//Si el usuario no es null, lo doy pase
	return (
		<Route 
			{...rest}
			render={(props) =>
				userState ? (
                    // el usuario esta logueado, pasa
					<CarritoView/>
				) : (
                    //si no lo mando a login :D
					<Navigate to="/IniciarSesion" />
				)
			}
		/>
	);
	//si es null lo direcciono hacia el home
}
