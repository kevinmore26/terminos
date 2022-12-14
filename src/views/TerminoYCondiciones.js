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

export default function TerminosCondiciones() {
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
  const { userState, signOut } = useContext(AuthContext);
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
      navigate("/checkoutInfo");
      return;
    }
  }, [checked]);

  const getUsuario = async () => {
    console.log("productoObtenidog");
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
        title: "Informaci??n actualizada exitosamente",
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
            T??rminos & Condiciones ??? Llegoshop Per??
          </div>
        
          <div>
            1.ASPECTOS GENERALES:Llegoshop S.A.C. es una sociedad an??nima
            cerrada constituida conforme a las leyes de la Rep??blica del Per??,
            identificada con RUC N?? 20609826496, con domicilio en Mza. A Lote.
            21 urb. Praderas de Pariachi Et. Dos, distrito de Ate, provincia y
            departamento de Lima, que para los efectos de los presentes T??rminos
            & Condiciones de uso de la Plataforma Llegoshop se denominar??
            ???Llegoshop???  <br ></br>.DEFINICIONES:  <br ></br>1.Aliado Comercial: persona natural o
            jur??dica que exhibe, ofrece, y comercializa productos y/o servicios
            a trav??s de la Plataforma Llegoshop, para que los mismos sean
            adquiridos por los Usuarios.  <br ></br>2.Cr??ditos: significan los intangibles
            con los que cuenta el Usuario en la secci??n denominada ???Promos y
            Cr??ditos??? al interior de la Plataforma Llegoshop, con los cuales
            puede adquirir los productos y/o servicios exhibidos en la
            Plataforma Llegoshop.  <br ></br>3.Datos Personales: es toda informaci??n que
            permite identificar o hacer identificable a una persona
            natural.4.Plataforma Llegoshop: plataforma virtual compuesta por una
            aplicaci??n para dispositivos m??viles y una p??gina web por medio de
            la cual los Aliados Comerciales exhiben, ofrecen y comercializan
            productos y/o servicios para que sean adquiridos por los
            Usuarios.  <br ></br>5.Llegoshoptendero: repartidor independiente que, de manera
            libre y voluntaria, en calidad de mandatario de los Usuarios, acepta
            la gesti??n de las ??rdenes solicitadas por ??stos por medio de la
            Plataforma Llegoshop.  <br ></br>6.Titular: persona natural cuyos Datos
            Personales son objeto de Tratamiento.  <br ></br>7.Tratamiento: es cualquier
            operaci??n o conjunto de operaciones sobre Datos Personales, tales
            como la recolecci??n, almacenamiento, uso, circulaci??n o
            supresi??n.8.Usuario: persona natural que, como destinatario final,
            utiliza la Plataforma Llegoshop para adquirir los productos y/o
            servicios exhibidos, ofrecidos y comercializados por los Aliados
            Comerciales a trav??s de la misma.  <br ></br><br ></br>FUNCIONAMIENTO DE LA PLATAFORMA
            LLEGOSHOP:La Plataforma Llegoshop es una herramienta tecnol??gica
            que, haciendo uso del internet, facilita la intermediaci??n entre
            Llegoshoptenderos, Aliados Comerciales y los Usuarios, entendi??ndose
            como el ???Servicio de Reparto???, a la operaci??n que se concreta entre
            los sujetos antes mencionados. Dicho Servicio de Reparto es
            ejecutado a trav??s de un contrato de mandato, donde el
            Llegoshoptendero act??a como mandatario y el Usuario funge como
            mandante en dicha relaci??n. Llegoshop act??a en todo momento como
            tercero intermediario entre Llegoshoptenderos, Usuarios y Aliados
            Comerciales.Asimismo, los Usuarios aceptan y entienden que Llegoshop
            no presta servicios de reparto, mensajer??a, transporte ni log??stica.
            Por lo tanto, bajo ninguna circunstancia los Llegoshoptenderos ser??n
            considerados empleados por Llegoshop ni por ninguno de sus
            afiliados. Los Llegoshoptenderos prestan el Servicio por cuenta y
            riesgo propio y liberan a Llegoshop de cualquier responsabilidad que
            pudiera surgir durante la prestaci??n del Servicio de Reparto.Adem??s,
            los Usuarios reconocen que Llegoshop no comercializa productos ni
            servicios, ni presta servicios de log??stica y/o entrega a los
            Usuarios. Los precios, cantidad, disponibilidad y caracter??sticas de
            los productos y/o servicios exhibidos en la Plataforma Llegoshop son
            determinados directamente por los Aliados Comerciales y no por
            Llegoshop.
          </div>
          <div>
            <br ></br>ACEPTACI??N DE LOS T??RMINOS & CONDICIONES:  <br ></br><br ></br>El Usuario, al momento de
            registrarse en la Plataforma Llegoshop, voluntariamente acepta de
            manera previa, expresa e informada el contenido de los presentes
            T??rminos & Condiciones en su totalidad, por lo cual, se obliga
            irrevocablemente a ??stos.  <br ></br> Esto quiere decir, que el Usuario declara
            haber le??do y entendido todas las condiciones en la Pol??tica de
            Privacidad y en los presentes T??rminos & Condiciones, manifestando
            su conformidad y aceptaci??n al registrarse y hacer uso de la
            Plataforma Llegoshop.<br ></br>La persona natural que acepta los presentes
            T??rminos & Condiciones declara y garantiza ser el Usuario que har??
            uso de la Plataforma Llegoshop.<br ></br>Cualquier persona que no acepte o se
            encuentre en desacuerdo con estos T??rminos & Condiciones, los cuales
            tienen un car??cter obligatorio y vinculante, deber?? abstenerse de
            utilizar la Plataforma Llegoshop.<br ></br>Los presentes T??rminos &
            Condiciones de Uso de la Plataforma Llegoshop, regulan la relaci??n
            contractual entre los Usuarios con Llegoshop. El servicio se
            encuentra dirigido exclusivamente a residentes en la zona de
            cobertura de Llegoshop en Santa Clara, distrito de Ate. Los Usuarios
            se encontrar??n sujetos a los T??rminos & Condiciones Generales
            respectivos, junto con todas las dem??s pol??ticas y principios que
            rigen Llegoshop y que son incorporados al presente por
            referencia.<br ></br>OBLIGACIONES DE LOS USUARIOS:En virtud de la aceptaci??n
            de los presentes T??rminos & Condiciones, el Usuario se obliga a:{" "}
          </div>
          <div>
            <br ></br>Ingresar sus Datos Personales de manera veraz al momento de
            registrarse en la Plataforma Llegoshop.<br ></br>Abstenerse de transferir a
            terceros los datos de validaci??n de su cuenta en la Plataforma
            Llegoshop.<br ></br>Notificar a Llegoshop respecto de cualquier uso no
            autorizado de su cuenta al interior de la Plataforma
            Llegoshop<br ></br>Abstenerse de utilizar la Plataforma Llegoshop para
            realizar actos contrarios a la moral, la ley, el orden p??blico, y
            las buenas costumbres en contra de Llegoshop, los Repartidores
            Independientes, Aliados Comerciales, y/o de terceros.<br ></br>Disponer de
            fondos suficientes para procesar el pago de las ??rdenes solicitadas
            por medio de la Plataforma LLegoshop.<br ></br>Realizar al pago del valor
            total de la orden a trav??s de la Plataforma Llegoshop de conformidad
            con el m??todo de pago seleccionado en el Check-Out.<br ></br>Abstenerse de
            registrar m??todos de pago de propiedad de terceros sin autorizaci??n
            de ??stos.<br ></br>Registrar los m??todos de pago de conformidad con el
            proceso de verificaci??n al interior de la Plataforma
            Llegoshop.<br ></br>Pagar cualquier deuda que genere en virtud del uso de la
            Plataforma Llegoshop. Asimismo, el Usuario reconoce y acepta que
            Llegoshop podr?? descontar el valor de la deuda de cualquier m??todo
            de pago registrado en la Plataforma Llegoshop.<br ></br>Abstenerse de
            solicitar compensaciones, por cualquier medio, que falten a la
            verdad.<br ></br>Recibir los productos solicitados a trav??s de la Plataforma
            Llegoshop.<br ></br>Verificar que los productos y/o servicios solicitados por
            medio de la Plataforma Llegoshop correspondan a los solicitados por
            el Usuario.<br ></br>Informarse sobre las instrucciones de uso y consumo de
            los productos solicitados a trav??s de la Plataforma
            Llegoshop.<br ></br>Asegurarse que los datos de la orden (productos,
            direcci??n de entrega, entre otros) sean correctos antes de solicitar
            la misma.<br ></br>Abstenerse de realizar conductas que atenten en contra del
            funcionamiento de la Plataforma Llegoshop.<br ></br>Abstenerse de entablar
            relaciones con los Repartidores Independientes y/o los Aliados
            Comerciales para realizar actividades il??citas y/o contrarias a la
            moral, al orden p??blico y a las buenas costumbres.<br ></br>Abstenerse de
            suplantar la identidad de otros Usuarios.<br ></br>Abstenerse de descifrar,
            descompilar o desensamblar cualquier elemento de la Plataforma
            Llegoshop.<br ></br>Abstenerse de tener m??s de una (1) cuenta en la
            Plataforma Llegoshop con los mismos Datos Personales. El Usuario
            reconoce y acepta que Llegoshop se reserva el derecho de desactivar
            las cuentas que no cumplan con estos par??metros.<br ></br>Mantener custodia
            del dispositivo m??vil o port??til por medio del cual accede a la
            Plataforma Llegoshop, garantizando que terceros no tengan acceso
            indebido a la Plataforma Llegoshop por acciones u omisiones del
            Usuario. Se aclara que, en caso de que se evidencie que el Usuario
            no ha custodiado en debida forma su dispositivo m??vil
          </div>
          <div>
            o port??til, Llegoshop no tendr?? ning??n tipo de responsabilidad por
            accesos no autorizados por parte de terceros a la Plataforma
            Llegoshop.<br ></br>Mantener custodia de las tarjetas de cr??dito/d??bito
            registradas en la Plataforma Llegoshop, para evitar que terceros
            realicen transacciones no autorizadas, comprendiendo que, en caso
            ocurran, Llegoshop no tiene ni responsabilidad ni control por dichos
            hechos.<br ></br>Tratar de manera respetuosa a los Repartidores
            Independientes y a los agentes de servicio al cliente.<br ></br>Verificar
            cada uno de los montos indicados al final del proceso de compra
            (valor de los productos, costo de env??o, tarifa de servicio, entre
            otros) entendi??ndose que, al solicitar la orden, el Usuario acepta
            cada uno de ellos.<br ></br>Abstenerse de usar la propiedad intelectual de
            Llegoshop y/o los Aliados Comerciales para fines no autorizados
            expresamente por ??stos.<br ></br>Los representantes legales de los Usuarios
            que sean menores de edad declaran expresamente que han autorizado a
            estos ??ltimos su registro en la Plataforma Llegoshop, entendi??ndose
            que son responsables por el uso de la Plataforma Llegoshop por parte
            de los Usuarios menores de edad.
          </div>

          <div>
            Ante el incumplimiento de cualquiera de las obligaciones contenidas
            en la presente secci??n, Llegoshop se reserva el derecho de bloquear
            definitivamente la cuenta del Usuario en la Plataforma
            Llegoshop.<br ></br>DEL REGISTRO DEL USUARIOEl acceso a la Plataforma
            Llegoshop es gratuito, salvo en lo relativo al costo de la conexi??n
            a trav??s de la red de telecomunicaciones suministrada por el
            proveedor de acceso contratado (ISP) por el Usuario, que estar?? a su
            exclusivo cargo. El Usuario ??nicamente podr?? acceder a la Plataforma
            a trav??s de los medios autorizados.Para el acceso a los contenidos
            de la Plataforma Llegoshop ser?? necesario el registro del Usuario.
            Por ello, para acceder al Servicio de Reparto prestado por los
            Llegoshoptenderos, el Usuario deber?? contar con un Smartphone con
            sistema operativo IOS o Android y completar todos los campos del
            formulario de inscripci??n correspondiente a los Usuarios con datos
            v??lidos. Los Usuarios deber??n verificar que la informaci??n que ponen
            a disposici??n de Llegoshop; es decir, sus Datos Personales, sean
            exactos, precisos y verdaderas. Asimismo, el Usuario asumir?? el
            compromiso de actualizar sus Datos Personales cada vez que los
            mismos sufran modificaciones. Llegoshop podr?? utilizar diversos
            medios para identificar a los Usuarios, pero Llegoshop no se
            responsabiliza por la certeza de los Datos Personales que los
            Usuarios pongan a su disposici??n. Los Usuarios garantizan y
            responden, en cualquier caso, por la veracidad, exactitud, vigencia
            y autenticidad de los Datos Personales puestos a disposici??n de
            Llegoshop.
          </div>

          <div>
            A los efectos de adquirir la condici??n de Usuario de Llegoshop, el
            Usuario deber?? completar el formulario de registro, brindar su
            consentimiento para el tratamiento de sus Datos Personales, aceptar
            la Pol??tica de Privacidad y Tratamiento de Datos Personales, y los
            presentes T??rminos & Condiciones.Una vez efectuado el Registro,
            Llegoshop otorgar?? al Usuario una cuenta personal para acceder con
            la contrase??a que elija (en adelante, la ???Cuenta???). La Cuenta es
            personal, ??nica e intransferible, y est?? prohibido que un mismo
            Usuario registre o posea m??s de una Cuenta. En caso que Llegoshop
            detecte distintas Cuentas que contengan datos coincidentes o
            relacionados, podr?? cancelar, suspender o inhabilitarlas. El Usuario
            ser?? el ??nico responsable por el uso de su Cuenta.Los Datos
            Personales introducidos por el Usuario deber??n ser exactos, actuales
            y veraces en todo momento. Llegoshop se reserva el derecho de
            solicitar alg??n comprobante y/o dato adicional a efectos de
            corroborar los Datos Personales, y de suspender temporal y/o
            definitivamente a aquel Usuario cuyos datos no hayan podido ser
            confirmados. Llegoshop NO se responsabiliza por la certeza de los
            datos consignados en el Registro. El Usuario garantiza y responde,
            en cualquier caso, por la veracidad, exactitud, vigencia y
            autenticidad de sus Datos Personales. Los Datos Personales que el
            Usuario proporcione se integrar??n en una base de datos personales de
            la que es responsable Llegoshop. Para m??s informaci??n consultar la
            Pol??tica de Privacidad y Tratamiento de Datos Personales.<br ></br>USO DE LA
            PLATAFORMA LLEGOSHOPLlegoshop tendr?? las facultades para denegar o
            restringir el uso a la Plataforma Llegoshop a cualquier Usuario en
            caso de incumplimiento de los presentes T??rminos & Condiciones, sin
            que ello genere perjuicio alguno al Usuario. Llegoshop no ser??
            responsable si el Usuario no cuenta con un tel??fono celular
            compatible con el uso del aplicativo que contiene la Plataforma
            Llegoshop. El Usuario se compromete a hacer un uso adecuado y l??cito
            de la Plataforma Llegoshop de conformidad con la legislaci??n
            aplicable, los presentes T??rminos & Condiciones, la moral y buenas
            costumbres generalmente aceptadas y el orden p??blico. Adem??s de las
            obligaciones de los Usuarios, detalladas en los presentes T??rminos &
            Condiciones, al utilizar la Plataforma Llegoshop, el Usuario acuerda
            que:<br ></br>Solo utilizar?? el Servicio para su uso personal y no tendr??
            facultades para revender su Cuenta a un tercero.<br ></br>No autorizar?? a
            terceros a usar su Cuenta.<br ></br>No ceder?? ni transferir?? de otro modo su
            Cuenta a ninguna otra persona o entidad legal.<br ></br>No utilizar?? una
            cuenta que est?? sujeta a cualquier derecho de una persona que no sea
            ella sin la autorizaci??n adecuada.<br ></br>No solicitar?? el Servicio con
            fines il??citos, ilegales, contrarios a lo establecido en los
            presentes T??rminos & Condiciones, a la buena fe y al orden p??blico,
            lesivos de los derechos e intereses de terceros
          </div>

          <div>
            rindar??n los Llegoshoptenderos se encuentra dirigido exclusivamente
            a los Usuarios.La solicitud de un Servicio de Reparto podr?? pagarse
            en efectivo directamente a los Llegoshoptenderos o mediante la
            plataforma de pagos (en adelante, el ???Procesador de Pagos???) asociada
            a la Plataforma. El procesamiento de pagos estar?? sujeto a todos los
            t??rminos y condiciones y pol??ticas de privacidad del Procesador de
            Pagos. Llegoshop no ser?? responsable por ning??n error u omisi??n
            cometido por el Procesador de Pagos. El Usuario podr?? encontrar en
            la Plataforma Llegoshop, diversos productos ofrecidos por los
            Aliados Comerciales quienes se desempe??an como proveedores
            independientes y utilizan la Plataforma Llegoshop como medio para
            ofrecer sus productos. Es as??, que a trav??s de la Plataforma
            Llegoshop, el Usuario pueda dar aviso de manera inmediata a un
            Llegoshoptendero que desea el env??o de un producto que ofrece un
            Aliado Comercial.Sin perjuicio de ello, el Usuario podr?? solicitar a
            un Llegoshoptendero el env??o de un producto ofrecido por cualquier
            otro comercio diferente a los Comercios Aliados, siempre y cuando
            dicho producto respete los presentes T??rminos & Condiciones. En este
            supuesto, el Usuario deber?? abonar adicionalmente al precio del
            producto, el valor del Servicio de Reparto y un porcentaje (%)
            adicional sobre el valor del producto por el uso de la plataforma
            virtual el cual deber?? aceptar el Usuario al momento de realizar la
            orden. Las condiciones de dicha funcionalidad, denominada ???Comprar
            algo y llev??rtelo??? se encuentran especificadas al final de los
            presentes T??rminos & Condiciones.Cualquier cambio en el Servicio de
            Reparto ser?? informado al Usuario al tel??fono de contacto, v??a la
            Plataforma Llegoshop y/o al correo electr??nico informado por el
            Usuario en su Cuenta. Una vez aceptado el precio y seleccionados los
            Servicios de Reparto que se deseen utilizar por intermedio de la
            Plataforma Llegoshop, ser?? requisito indispensable que el Usuario
            incorpore los datos exigidos en los campos all?? establecidos y, una
            vez cumplido ello, se podr?? emitir la solicitud correspondiente.Es
            decir, una vez efectuada la solicitud, inmediatamente quedar??
            confirmada la misma, asumiendo el Usuario las tarifas
            correspondientes. El Llegoshoptendero cumplir?? el Servicio de
            Reparto entregando los productos a la persona que surge de los
            detalles de entrega, siendo el Usuario el ??nico responsable por la
            veracidad de los datos all?? introducidos.Se encuentra totalmente
            prohibido utilizar el Servicio de Reparto, para transportar
            mercader??a con fines il??citos, ilegales, contrarios a lo establecido
            en los presentes T??rminos & Condiciones, a la buena fe, al orden
            p??blico y a las buenas costumbres, lesivos de los derechos e
            intereses de terceros incluyendo, sin limitaci??n, el transporte de
            material ilegal, que constituya un peligro para la salud o
            integridad de las personas, o con fines fraudulentos.El Usuario
            reconoce y acepta que Llegoshop no es el productor, proveedor,
            comercializador, agente y/o distribuidor de los productos y/o
            servicios exhibidos en la Plataforma Llegoshop. Por lo anterior,
            Llegoshop no es responsable por la falta de disponibilidad de los
            productos y/o servicios exhibidos, ofrecidos y comercializados por
            los Aliados Comerciales a trav??s de la Plataforma
            Llegoshop.Llegoshop se reserva la posibilidad de bloquear al
            Usuario, por cuestiones de seguridad ante posibilidades de fraude,
            estafa, uso de datos ajenos, o alg??n otro supuesto que se desprenda
            como infracci??n de los presentes T??rminos & Condiciones de uso de la
            Plataforma. Dicha situaci??n ser?? debidamente comunicada al Usuario.
            Asimismo, Llegoshop podr?? rechazar y/o frenar cualquier orden de los
            Usuarios Registrados, en caso de identificar una infracci??n a los
            presentes T??rminos & Condiciones.
          </div>
          <div>
            <br ></br>CONDICIONES DE PAGO Y FACTURACI??N Las tarifas aplicables al
            Servicio de Reparto las fijar?? Llegoshop conforme a la demanda de
            servicios que se encuentre activa en ese momento al momento en que
            el Usuario haga uso de la Plataforma Llegoshop. El Usuario acepta
            que sea Llegoshop quien fije estas tarifas. Estas tarifas ser??n
            cobradas directamente por el Llegoshoptendero de forma autom??tica,
            mediante el Procesador de Pagos o, en su defecto, personalmente
            cuando el pago se realice en dinero en efectivo. Las tarifas
            cobradas por el Servicio de Reparto no ser??n reembolsables.Para los
            casos en los que el Servicio de Reparto sea pagado por el Usuario al
            Llegoshoptendero en efectivo y el monto entregado por el Usuario sea
            mayor a la tarifa cobrada por el mencionado servicio, el
            Llegoshoptendero deber?? cumplir con entregarle al Usuario aquel
            monto sobrante existente entre el monto entregado como pago y la
            tarifa establecida por Llegoshop. Las tarifas aplicables a los
            productos y servicios solicitados por el Usuario ser??n cobradas
            directamente por Llegoshop a trav??s del Procesador de Pagos. En el
            caso de los Comercios no Aliados, Llegoshop se reserva el derecho de
            exhibir un precio de los productos por encima del valor real
            encontrado en el establecimiento y el Usuario acepta pagar los
            productos con este valor adicional, por el uso de la plataforma
            virtual, teniendo en cuenta que el precio exhibido en la plataforma
            ser?? el precio final a ser cobrado.En ese mismo sentido, Llegoshop
            se reserva el derecho de incrementar, hasta en un diez por ciento
            (10%), los precios de los productos exhibidos en las tiendas f??sicas
            de los Comercios Aliados y de los Comercios no Aliados. Los valores
            adicionales ser??n cobrados a t??tulo de uso de la plataforma virtual.
            En los supuestos en que el Servicio de Reparto se solicite para
            entregar los productos ofrecidos por los Comercios no Aliados, el
            Usuario adelantar?? el dinero correspondiente al precio de
            adquisici??n del producto y Llegoshop lo entregar?? al
            Llegoshoptendero. El Llegoshoptendero adquirir?? el producto y
            realizar?? el pago del precio de venta a favor del proveedor por
            cuenta y orden del Usuario.El titular de la tarjeta de cr??dito es el
            responsable por los datos consignados al momento de la solicitud y/o
            reserva del Servicio de Reparto seleccionado y es el ??nico obligado
            al pago frente al emisor de la misma. Cualquier desconocimiento
            deber?? ser efectuado frente del Banco emisor de la tarjeta de
            cr??dito de conformidad con lo dispuesto por el Reglamento de
            Tarjetas de Cr??dito y D??bito aprobado mediante Resoluci??n SBS No.
            6523-2013.Llegoshop se reserva el derecho de tomar las medidas
            judiciales y extrajudiciales que estime pertinentes para obtener el
            pago del monto debido que pueda adeudar el Usuario. Llegoshop se
            reserva el derecho de modificar, cambiar, agregar, o eliminar las
            Tarifas Vigentes, en cualquier momento, lo cual ser?? debidamente
            notificado al Usuario.El Usuario entiende y acepta que los Aliados
            Comerciales son los ??nicos encargados de otorgar los comprobantes de
            pago correspondientes (boletas/facturas) por las compras realizadas
            a dichos establecimientos comerciales por medio de la Plataforma
            Llegoshop. Por ende, Llegoshop no es el responsable de la emisi??n de
            dichos documentos ya que ??nicamente es una plataforma de
            intermediaci??n que no comercializa ni vende productos. En este
            sentido, Llegoshop no se responsabiliza por la no entrega o la
            entrega defectuosa de los mismos, careciendo el Usuario el derecho a
            presentar cualquier tipo de reclamo en contra de Llegoshop por
            dichos hechos.
          </div>
          <div>
            <br ></br>M??TODO DE PAGOEl pago de las ??rdenes solicitadas a trav??s de la
            Plataforma Llegoshop se realizar?? a trav??s del m??todo de pago
            registrado y seleccionado por el Usuario en la Plataforma
            Llegoshop.En el caso en el que Llegoshop verifique que el m??todo de
            pago seleccionado por el Usuario est?? vencido, no es v??lido, o no
            cuenta con fondos suficientes para realizar el pago de la orden, el
            Usuario acepta que Llegoshop realice el cobro del valor total de la
            orden a cualquier otra tarjeta o m??todo de pago disponible que se
            encuentre vinculado a su cuenta en la Plataforma Llegoshop.1.
            CANCELACIONES Y DEVOLUCIONESUna vez emitida la Solicitud de Reparto,
            el Usuario podr?? cancelarla (en adelante, la ???Cancelaci??n???) sin
            penalidad alguna, siempre que dicha Cancelaci??n se realice a trav??s
            de la Plataforma (al hacer clic en el pedido en curso) antes de que
            la tienda comience a preparar la orden (Cooking Time en el caso de
            Restaurantes) o antes que la tienda acepte la misma (los dem??s
            casos). Se aclara, que el estado de la orden podr?? ser visualizado
            directamente por el Usuario a trav??s de la Plataforma.De no
            efectuarse la Cancelaci??n en el tiempo estipulado en el punto
            precedente, el Usuario estar?? obligado a abonar la totalidad de la
            orden; es decir, el 100% del monto correspondiente al pago del
            Servicio de Reparto y valor de los productos, sin perjuicio de que
            luego el Usuario pueda gestionar la devoluci??n directamente con el
            Aliado Comercial, la misma que se regir?? bajo las propias pol??ticas
            y reglas del Aliado Comercial.El importe que se cobrar?? por la
            Cancelaci??n de la orden, se mostrar?? al Usuario antes de que este
            concrete dicha solicitud a trav??s de la Plataforma. El Usuario
            reconoce que la devoluci??n de dicho monto podr??a no ser inmediato,
            dependiendo del proceso que deban efectuar las entidades financieras
            involucradas para la devoluci??n.El Usuario en ning??n caso podr??
            alegar falta de conocimiento de las limitaciones, restricciones y
            penalidades, dado que las mismas son informadas en forma previa a
            realizar la solicitud del Servicio de Reparto y posterior
            Cancelaci??n a trav??s de la Plataforma Llegoshop.
          </div>
          <div>
            Se aclara que, cuando corresponda una devoluci??n, Llegoshop
            efectuar?? en una primera instancia cualquier devoluci??n a trav??s de
            Cr??ditos de la Plataforma Llegoshop, los cuales se abonar??n
            directamente a la Cuenta del Usuario. En caso que este ??ltimo
            prefiera la devoluci??n del dinero entregado, podr?? se??alarlo a
            Soporte, caso en el cual se anular??n los Cr??ditos abonados al
            respecto, procediendo a la devoluci??n del dinero del Servicio, a la
            tarjeta utilizada para efectuar la compra, en caso ese haya sido el
            m??todo de pago elegido. Lo anterior se sujetar?? a los tiempos que
            pueda tomar la entidad bancaria en reflejar en la cuenta bancaria
            del Usuario, la devoluci??n efectuada. Dicho plazo puede extenderse a
            aproximadamente veinte (20) d??as h??biles desde que se efect??a la
            devoluci??n.1. RESPONSABILIDADEl Usuario conoce y acepta que
            Llegoshop pone a disposici??n del Usuario s??lo un espacio virtual
            que, en calidad de intermediador, les permite ponerse en
            comunicaci??n mediante la Plataforma Llegoshop para que un
            Llegoshoptendero pueda brindar los Servicios de Reparto a favor del
            Usuario Registrado. Llegoshop no interviene en el perfeccionamiento
            de las operaciones, actividades o servicios realizados por el
            Llegoshoptendero a favor del Usuario. Por ello, el Llegoshoptendero
            y/o el Comercio (Aliado o no Aliado) ser??n responsables respecto de
            la calidad, cantidad, estado, integridad o legitimidad de la
            mercader??a transportada por el Llegoshoptendero. Adem??s, el
            Llegoshoptendero ser?? responsable de su capacidad para contratar y
            la veracidad de los Datos Personales que haya ingresado.El Usuario
            conoce y acepta que al realizar operaciones con el Llegoshoptendero
            lo hace bajo su propio riesgo. Llegoshop no ser?? responsable por
            lucro cesante, o por cualquier otro da??o y/o perjuicio que haya
            podido sufrir el Usuario Registrado, o el Llegoshoptendero, debido
            al Servicio de Reparto prestado por el Llegoshoptendero, que no est??
            bajo la esfera de control de Llegoshop o respecto de da??os y/o
            perjuicios atribuibles a un tercero. Por ello, Llegoshop recomienda
            actuar con prudencia y sentido com??n al momento de contratar el
            Servicio de Reparto. En caso que uno o m??s Usuarios Registrados o
            alg??n tercero inicien un reclamo o acci??n legal contra un
            Llegoshoptendero por actos no atribuibles a Llegoshop conforme a las
            reglas establecidas en estos T??rminos & Condiciones, todos y cada
            uno de los involucrados en dichos reclamos o acciones eximen de
            responsabilidad a Llegoshop y a sus directores, gerentes, empleados,
            agentes, operarios, representantes y apoderados.Por lo tanto, se
            deja expresa constancia de que Llegoshop, al ser una Plataforma que
            contacta diversos actores, solamente se encuentra obligada a
            responder por el servicio de uso de su plataforma, m??s no por ning??n
            hecho generado por el Servicio de Reparto o por los productos
            adquiridos por el Usuario.
          </div>
          <div>. USO Y GARANT??A DE LA PLATAFORMA LLEGOSHOP</div>
          <div>
            Llegoshop informa a sus Usuarios que la Plataforma Llegoshop podr??a
            presentar limitaciones de disponibilidad y continuidad en su
            funcionamiento, por razones de mantenimiento o acciones que escapen
            al control y manejo de Llegoshop. En estos casos, Llegoshop har??
            todo lo que se encuentre razonablemente a su alcance para retomar el
            adecuado funcionamiento de la Plataforma Llegoshop. Sin embargo,
            hace de conocimiento de los Usuarios para que tomen las precauciones
            correspondientes, siendo que Llegoshop no ser?? responsable por
            eventuales da??os y/o perjuicios que puedan derivarse de: (i) la
            falta de disponibilidad o accesibilidad a la Plataforma Llegoshop
            por las razones antes expuestas; (ii) la interrupci??n en el
            funcionamiento de la Plataforma Llegoshop o fallos inform??ticos
            ajenos al control de Llegoshop, aver??as telef??nicas, desconexiones,
            retrasos o bloqueos causados por deficiencias o sobrecargas en las
            l??neas telef??nicas, centros de datos, en el sistema de Internet o en
            otros sistemas electr??nicos, producidos en el curso de su
            funcionamiento; y, (iii) otros da??os que puedan ser causados por
            terceros mediante intromisiones no autorizadas ajenas al control de
            Llegoshop.Llegoshop adopta las medidas de seguridad necesarias y
            razonables para el funcionamiento de la Plataforma Llegoshop. Sin
            embargo, estas medidas no necesariamente aseguran la ausencia de
            virus ni de otros elementos en la Plataforma Llegoshop, introducidos
            por terceros, ajenos al control de Llegoshop, que puedan producir
            alteraciones en los sistemas f??sicos o l??gicos del Usuario en los
            documentos electr??nicos y ficheros almacenados en sus sistemas. En
            consecuencia, Llegoshop no ser?? responsable de los da??os y
            perjuicios que pudieran derivarse de la presencia de virus u otros
            elementos, ajenos al control de Llegoshop, que puedan producir
            alteraciones en los sistemas f??sicos o l??gicos, documentos
            electr??nicos o ficheros del Usuario.Llegoshop adopta diversas
            medidas de protecci??n para proteger la Plataforma Llegoshop y los
            contenidos contra ataques inform??ticos de terceros. No obstante,
            Llegoshop no garantiza que terceros no autorizados (utilizando
            ilegales o fraudulentos) no puedan conocer las condiciones,
            caracter??sticas y circunstancias en las cuales el Usuario accede a
            la Plataforma Llegoshop. En consecuencia, Llegoshop no ser?? en
            ning??n caso responsable de los da??os y perjuicios que pudieran
            derivarse de dicho acceso no autorizado.Con la suscripci??n de los
            presentes T??rminos & Condiciones, el Usuario que suscribe el
            presente documento declara que mantendr?? indemne frente a cualquier
            reclamaci??n a Llegoshop, su sociedad matriz, directores, socios,
            empleados, abogados y agentes derivadas de: (i) el incumplimiento
            por parte del Usuario de cualquier disposici??n contenida las
            presentes en los T??rminos & Condiciones o de cualquier ley o
            regulaci??n aplicable a las mismas; (ii) el incumplimiento o
            violaci??n de los derechos de terceros incluyendo, a t??tulo meramente
            enunciativo, otros Usuarios, peatones; y, (iii) el incumplimiento
            del uso permitido de la Plataforma Llegoshop, siendo estas
            condiciones meramente enunciativas y no taxativas, por lo que el
            Usuario mantendr?? indemne a Llegoshop por cualquier otra violaci??n
            normativa o da??o a terceros que pueda producirse como consecuencia
            de la utilizaci??n del Servicio de Reparto por parte del Usuario.
          </div>
          <div>
            1. PROPIEDAD INTELECTUALEl Usuario reconoce y acepta que todos los
            derechos de propiedad intelectual e industrial sobre los contenidos
            y/o cualesquiera otros elementos insertados en la Plataforma
            Llegoshop (incluyendo, sin limitaci??n, marcas, logotipos, nombres
            comerciales, lemas comerciales textos, im??genes, gr??ficos, dise??os,
            sonidos, bases de datos, software, diagramas de flujo, presentaci??n,
            audio y v??deo y/o cualquier otro derecho de propiedad intelectual e
            industrial de cualquier naturaleza que ??stos sean), pertenecen y son
            de propiedad exclusiva de Llegoshop. Por lo tanto, Llegoshop
            autoriza al Usuario a utilizar, visualizar, imprimir, descargar y
            almacenar los contenidos y/o los elementos insertados en la
            Plataforma Llegoshop exclusivamente para su uso personal, privado y
            no lucrativo, absteni??ndose de realizar sobre los mismos cualquier
            acto de descompilaci??n, ingenier??a inversa, modificaci??n,
            divulgaci??n o suministro. Cualquier otro uso o explotaci??n de
            cualesquiera contenidos y/u otros elementos insertados en la
            Plataforma Llegoshop distinto de los aqu?? expresamente previstos
            estar?? sujeto a la autorizaci??n previa de Llegoshop.Bajo ning??n
            concepto se entender?? que el acceso a la Plataforma Llegoshop y/o la
            aceptaci??n de los T??rminos & Condiciones generar alg??n derecho de
            cesi??n a favor de los Usuarios ni de cualquier tercero.1. PROTECCI??N
            DE DATOS PERSONALESLos datos personales que los Usuarios
            proporcionen en el Registro, ser??n almacenados y tratados seg??n lo
            dispone la Ley N?? 29733, Ley de Protecci??n de Datos Personales, su
            Reglamento, aprobado mediante Decreto Supremo N?? 003-2013-JUS, dem??s
            normas conexas y la Pol??tica de Privacidad de Llegoshop y
            Tratamiento de Datos Personales que aceptan los Usuarios al momento
            del Registro.En ese sentido, Llegoshop se obliga al cumplimiento
            estricto de las normas anteriormente mencionadas, as?? como a
            mantener los est??ndares m??ximos de seguridad, protecci??n, resguardo,
            conservaci??n y confidencialidad de la informaci??n recibida o
            enviada.Los Usuarios declaran que los datos personales han sido
            entregados de forma absolutamente libre y voluntaria, sin ning??n
            tipo de presi??n, obligaci??n o condici??n de por medio.1. CESI??NEl
            Usuario no podr?? ceder sus derechos y obligaciones dimanantes de los
            presentes T??rminos & Condiciones sin el previo consentimiento
            escrito de Llegoshop. Asimismo, Llegoshop podr?? ceder, sin necesidad
            de recabar el consentimiento previo del Usuario, los presentes
            T??rminos & Condiciones a cualquier entidad comprendida dentro de su
            grupo de sociedades, en todo el mundo, as?? como a cualquier persona
            o entidad que le suceda en el ejercicio de su negocio por
            cualesquiera t??tulos.
          </div>
          <div>
            1. LEY APLICABLE Y JURISDICCI??NLos presentes T??rminos & Condiciones,
            as?? como la relaci??n entre Llegoshop y el Usuario, se regir??n e
            interpretar??n con arreglo a la legislaci??n vigente en la Rep??blica
            del Per??.Los T??rminos & Condiciones espec??ficos para cada bot??n que
            se encuentran descritos a continuaci??n, deber??n interpretarse junto
            con los T??rminos & Condiciones generales de Llegoshop, as?? como con
            los espec??ficamente desarrollados por Llegoshop para promociones,
            campa??as y otras actividades que se realicen a trav??s de la
            plataforma virtual.1. SECCI??N LLEGOSHOPFAVORA continuaci??n, se
            mostrar??n los T??rminos & Condiciones aplicables a los Usuarios que
            utilicen el bot??n o servicio de ???LlegoshopFavor???, a trav??s de la
            Plataforma Llegoshop y por ende se entender??n como le??dos y
            aceptados por todos los Usuarios que utilicen dicho
            servicio:1.Opci??n: ???Recoger algo y entregarlo???Mediante esta opci??n,
            el Usuario podr?? solicitar a un Llegoshoptendero, el recojo y
            posterior entrega de alg??n producto, en ubicaciones que se
            encuentren dentro de la zona de cobertura de Llegoshop.Condiciones
            Generales:<br ></br>El Usuario no podr?? realizar env??os que contengan una
            mercanc??a que supere un valor comercial de m??s de S/ 950.00
            (Novecientos Cincuenta y 00/100 Soles), pues la protecci??n que
            brinda Llegoshop no asegura ning??n tipo de mercanc??a por un valor
            superior a este.<br ></br>El Usuario reconoce y acepta que, en caso de enviar
            alg??n paquete que contenga mercanc??a por un valor superior al antes
            mencionado, lo har?? bajo su propio riesgo, liberando al
            Llegoshoptendero y a Llegoshop de cualquier tipo de responsabilidad
            al respecto.<br ></br>En caso de p??rdida, da??o, menoscabo, merma, entre otros
            del producto enviado por causas directamente imputables a Llegoshop,
            solo se har?? devoluci??n del valor declarado del env??o, con un tope
            m??ximo de S/ 950.00 (Novecientos Cincuenta y 00/100 Soles). Se
            aclara que, por la seguridad de los Usuarios, a partir del d??a 01 de
            junio de 2022, las devoluciones del valor declarado se realizar??n
            ??nicamente mediante transferencia bancaria.<br ></br>Para todos los efectos,
            Llegoshop funge como una simple plataforma de contacto mediante la
            cual, el Usuario podr?? solicitar a un Llegoshoptendero, el servicio
            de recojo y entrega, el cual se llevar?? a cabo por el mutuo acuerdo
            entre las partes. Llegoshop aclara que la relaci??n ser?? directamente
            entre el Usuario y el Llegoshoptendero y se mantendr?? al margen de
            la misma, no siendo responsable ni siquiera solidariamente por
            cualquier hecho que pueda generarse de la relaci??n entre las dos
            partes descritas anteriormente, incluyendo p??rdidas, da??os,
            menoscabo, merma, entre otros que puedan sufrir la mercanc??a
            enviada.<br ></br>El Usuario reconoce y acepta que no enviar?? ning??n tipo de
            mercanc??a o productos que sean considerados como il??citos bajo la
            normatividad peruana, as?? como tampoco solicitar?? o enviar?? divisas,
            joyas, bienes tecnol??gicos o cualquier otro tipo de objeto de valor.
            El Llegoshoptendero se reserva el derecho de rechazar el encargo de
            transportar cualquier tipo de paquete o documento, dej??ndolo a su
            libre discreci??n y autonom??a. De esta manera, el Usuario acepta que
            es el ??nico y entero responsable frente a las autoridades respecto
            de la mercanc??a o documentaci??n que env??a, liberando a Llegoshop y
            al Llegoshoptendero de cualquier tipo de responsabilidad que pueda
            surgir al respecto. Llegoshop podr?? solicitar al Usuario que declare
            el contenido de lo que est?? enviando antes de solicitar la orden. El
            Usuario asume a su exclusivo cargo la responsabilidad que pueda
            derivarse de una declaraci??n err??nea, incompleta, dolosa, o que
            pueda admitir un delito, librando tanto a Llegoshop como al
            Llegoshoptendero de la falsedad u omisi??n de la declaraci??n. Dicha
            declaraci??n la realiza a modo de declaraci??n jurada.<br ></br>El monto que
            deber?? pagar el Usuario ser?? establecido unilateralmente por
            Llegoshop, en consideraci??n al valor declarado y la distancia de
            env??o (costo de domicilio y tarifa por distancia), el cual es
            aceptado expresamente por el Usuario. Asimismo, dicho monto ser??
            cobrado directamente por el Llegoshoptendero. El Llegoshoptendero
            podr?? negarse a aceptar la realizaci??n de un Servicio en caso de no
            estar de acuerdo con el valor a cobrar por dicho Servicio, toda vez
            que el acceso y uso de la Plataforma, como as?? tambi??n la aceptaci??n
            de la Solicitud del Usuario, es de car??cter voluntario y no
            obligatorio para el Llegoshoptendero. En este sentido, el monto que
            deber?? pagar el Usuario, ser?? la suma del valor correspondiente al
            costo de domicilio, tarifa por distancia, propina (opcional) y al
            monto por concepto de valor declarado, en caso as?? lo desee.<br ></br>Opci??n:
            ???Comprar algo y llev??rtelo???Mediante esta opci??n, el Usuario podr??
            solicitar cualquier producto de establecimientos de comercio que no
            sean necesariamente aliados de Llegoshop y que se encuentren dentro
            de la zona de cobertura de Llegoshop para que sean entregados por
            parte de un Llegoshoptendero.Condiciones Generales:<br ></br>El Usuario
            reconoce y acepta el pago de un porcentaje adicional (%) del valor
            total de la orden cuando realiza ??rdenes a trav??s de este bot??n.
            Este porcentaje, denominado ???Comisi??n de Llegoshop??? ser?? exhibido en
            el ???Check-out??? y solo se proceder?? a su cobro una vez el Usuario de
            su consentimiento previo, expreso e informado dando click en el
            bot??n ???Hacer pedido???. Este monto es independiente al valor cobrado
            por concepto de costo de domicilio, tarifa de distancia, propina
            (opcional) y el valor estimado del producto, los cuales tambi??n se
            exhiben en el ???Check-out??? de la orden.<br ></br>El Usuario inicialmente
            declarar?? un valor estimado de los productos que desea adquirir para
            que Llegoshop pueda realizar el recargo a su tarjeta por dicho
            valor. Una vez finalizada la orden su cuenta reflejar?? el valor
            total de los productos, procedi??ndose con el cobro de los mismos.<br ></br>El
            Usuario acepta abstenerse de realizar solicitudes de productos que
            se encuentren al margen de la ley y reconoce que est?? absolutamente
            prohibido solicitar productos que sean considerados ilegales. Lo
            anterior, sin perjuicio de ser reportado ante las autoridades
            competentes y de ser sujeto de las sanciones y penas
            correspondientes en caso de actuar en contrario.<br ></br>Los Usuarios se
            obligan, mediante la aceptaci??n de estos T??rminos & Condiciones, a
            dar un uso adecuado y ajustado a las normas de la Rep??blica de Per??
            y dem??s aplicables al bot??n de la referencia en este ac??pite, y a
            los dem??s activos en Llegoshop.<br ></br>Llegoshop no ser?? responsable bajo
            ning??n grado, por el uso indebido que los Usuarios hagan de este
            servicio ni por los productos que los mismos soliciten a trav??s de
            este.<br ></br>El Llegoshoptendero cumplir?? el servicio comprando y
            entregando el contenido de lo indicado en la orden a la direcci??n
            consignada en los Detalles de Entrega, a la persona que se indique
            en las instrucciones o a cualquier mayor de edad que se encuentre en
            la direcci??n se??alada. El Usuario es el ??nico responsable por la
            veracidad de los datos all?? indicados.<br ></br>Llegoshop reconoce y acepta
            que rechazar?? y cancelar?? cualquier tipo de orden que vulnere
            derechos de terceros o que contravenga cualquier tipo de
            normatividad vigente.
          </div>
          <div>
            Cancelaciones y Penalidades ??? Secci??n LLEGOSHOPFAVOR:<br ></br>Una vez creada
            la orden, el Usuario podr?? cancelarla sin penalidad alguna siempre
            que dicha Cancelaci??n la realice a trav??s de la Plataforma antes que
            un Llegoshoptendero haya aceptado/tomado la orden.<br ></br>De no efectuarse
            la Cancelaci??n en el tiempo estipulado en el punto precedente, el
            Usuario estar?? obligado a abonar el 100% (cien por ciento) del monto
            total del servicio.<br ></br>El Usuario en ning??n caso podr?? alegar falta de
            conocimiento de las condiciones establecidas en los presentes
            T??rminos & Condiciones, para cumplir el cumplimiento de las
            obligaciones precedentes.
          </div>
          <div>
            Condiciones de Pago ??? Secci??n LLEGOSHOPFAVOR:<br ></br>Para efectos de
            realizar el env??o, el Usuario pagar?? el Valor Total del Servicio (en
            adelante, la ???Tarifa???), a trav??s de la Plataforma Llegoshop o
            mediante entrega de dinero, en el caso en que sea posible. En caso
            de la opci??n ???Recoger algo y entregarlo???, el pago deber?? siempre
            efectuarlo la persona que realiza el encargo de la gesti??n.<br ></br>La
            Tarifa podr?? variar seg??n el tiempo que demore el Servicio. As??,
            desde el minuto sesenta (60) de realizaci??n del Servicio en
            adelante, aumentar?? la Tarifa por cada minuto que se
            concrete.<br ></br>Llegoshop se reserva el derecho de modificar, cambiar,
            agregar o eliminar la Tarifa, para cualquier Servicio, en cualquier
            momento, lo cual se ver?? reflejado autom??ticamente en la Solicitud
            que reciba el Llegoshoptendero en la Plataforma Llegoshop a trav??s
            de su celular.<br ></br> Llegoshop se reserva el derecho de tomar las medidas
            judiciales y extrajudiciales que estime pertinentes para obtener el
            pago de cualquier monto que adeude el Usuario.1. SECCI??N CAJERO ATMA
            continuaci??n, se mostrar??n los T??rminos & Condiciones aplicables a
            los Usuarios que utilicen el bot??n o servicio de ???Cajero ATM???, a
            trav??s de la Plataforma Llegoshop y por ende se entender??n como
            le??dos y aceptados por los mismos:Condiciones Generales:<br ></br>El Servicio
            se encuentra dirigido a los Usuarios que utilicen la Plataforma
            Llegoshop y el mismo les permite solicitar a un Llegoshoptendero que
            les lleve dinero en efectivo a domicilio.<br ></br>Asimismo, solo podr??n
            hacer uso del Servicio ofrecido a trav??s de la secci??n ???Cajero ATM???,
            aquellos Usuarios de Llegoshop que cuenten con una membres??a Prime
            vigente (Plus o Basic).<br ></br>Para ello el Usuario reconoce y acepta el
            cobro de un porcentaje determinado de comisi??n sobre el monto total
            solicitado, por concepto de uso y alquiler de la Plataforma. Dicho
            valor porcentual se informar?? en la interfaz donde se solicita la
            orden.<br ></br>Por su parte, el Llegoshoptendero que tome la orden cobrar??
            al Usuario el costo de env??o, el cual podr?? ser pagado directamente
            a trav??s de la Plataforma al realizar la orden. Adicionalmente, el
            Usuario podr??, de manera opcional, dar al Llegoshoptendero la
            Propina que considere adecuada de acuerdo al nivel del Servicio
            prestado.<br ></br>Se deja constancia que el Servicio es prestado
            directamente por el Llegoshoptendero como mandatario del Usuario.
            Llegoshop no act??a como agente financiero ni como empresa de
            custodia, entre otros, ??nicamente facilita la Plataforma Llegoshop
            para conectar al Usuario con un Llegoshoptendero. Ninguna de las
            partes anteriormente mencionadas tiene un v??nculo, de ninguna
            ??ndole, con Llegoshop.<br ></br>El Servicio de Cajero ATM solo estar??
            disponible para Usuarios que cuenten con una membres??a Prime (de
            cualquier modalidad) vigente.<br ></br>El monto a solicitar por el Usuario
            estar?? determinado por lo que se muestre en la Plataforma. Dichos
            valores podr??n ser modificados en la Plataforma Llegoshop, por lo
            que se entiende que el Usuario acepta los mismos al momento de
            solicitar la orden. <br ></br>El Usuario reconoce que el n??mero m??ximo de
            pedidos a trav??s del servicio de Cajero ATM corresponde a tres (03)
            en un d??a.<br ></br>Los Cr??ditos no pueden ser canjeados en esta modalidad,
            por lo que no es posible retirarlos a trav??s del bot??n Cajero ATM.
            Por dicho motivo, Llegoshop se reserva el derecho de cancelar
            cualquier orden en la cual se pretenda utilizar Cr??ditos en este
            Servicio.<br ></br>Llegoshop se reserva el derecho de tener operativo el
            Servicio de Cajero ATM en las zonas de su cobertura que estime
            conveniente. No podr?? efectuarse reclamos por parte del Usuario en
            relaci??n a la falta de cobertura de dicho servicio en determinada
            zona.
          </div>
          <div>??ltima actualizaci??n: 26 de octubre de 2022</div>
        </div>
        <div></div>
      </div>
    </div>
  );
}
