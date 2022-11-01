import Lottie from "lottie-react";
import shopanimation from "../lotties/lottiecarrito.json";
export default function LottieVistaPrincipal() {
  return (
    <div className="row d-flex">
      <div className="col-md-6 col-xs-12">
        <h5
          style={{
            fontWeight: "bold",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
           position:"relative",
           top:"200px",
           color:"rgb(106, 105, 110)"
          }}
        >
          {" "}
          Sabemos que es más cómodo desde tu celular, por ese motivo la versión
          móvil está en desarrollo!
        </h5>
      </div>
      <div className=" col-md-6 col-xs-12">
        <Lottie
          animationData={shopanimation}
          loop={true}
          style={{ width: "500px", height: "500px" }}
        />
      </div>
    </div>
  );
}
