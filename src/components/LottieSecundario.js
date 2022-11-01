import Lottie from "lottie-react";
import shopanimation from "../lotties/secondLottie.json";
export default function LottieVistaSecundario() {
  return (
    <div className="row d-flex">
      <div className=" col-md-6 col-xs-12">
        <Lottie
          animationData={shopanimation}
          loop={true}
          style={{ width: "500px", height: "500px" }}
        />
      </div>
      <div className="col-md-6 col-xs-12">
        <h5
          style={{
            fontWeight: "bold",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            position: "relative",
            top: "200px",
            color: "rgb(106, 105, 110)",
          }}
        >
          {" "}
          Sabemos que lo mereces, por eso creamos Llego!, la plataforma web que
          facilitará tus compras.
          Próximamente la app!
        </h5>
      </div>
    </div>
  );
}
