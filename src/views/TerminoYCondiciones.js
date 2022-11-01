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
            Términos & Condiciones – Llegoshop Perú
          </div>
        
          <div>
            1.ASPECTOS GENERALES:Llegoshop S.A.C. es una sociedad anónima
            cerrada constituida conforme a las leyes de la República del Perú,
            identificada con RUC N° 20609826496, con domicilio en Mza. A Lote.
            21 urb. Praderas de Pariachi Et. Dos, distrito de Ate, provincia y
            departamento de Lima, que para los efectos de los presentes Términos
            & Condiciones de uso de la Plataforma Llegoshop se denominará
            “Llegoshop”  <br ></br>.DEFINICIONES:  <br ></br>1.Aliado Comercial: persona natural o
            jurídica que exhibe, ofrece, y comercializa productos y/o servicios
            a través de la Plataforma Llegoshop, para que los mismos sean
            adquiridos por los Usuarios.  <br ></br>2.Créditos: significan los intangibles
            con los que cuenta el Usuario en la sección denominada “Promos y
            Créditos” al interior de la Plataforma Llegoshop, con los cuales
            puede adquirir los productos y/o servicios exhibidos en la
            Plataforma Llegoshop.  <br ></br>3.Datos Personales: es toda información que
            permite identificar o hacer identificable a una persona
            natural.4.Plataforma Llegoshop: plataforma virtual compuesta por una
            aplicación para dispositivos móviles y una página web por medio de
            la cual los Aliados Comerciales exhiben, ofrecen y comercializan
            productos y/o servicios para que sean adquiridos por los
            Usuarios.  <br ></br>5.Llegoshoptendero: repartidor independiente que, de manera
            libre y voluntaria, en calidad de mandatario de los Usuarios, acepta
            la gestión de las órdenes solicitadas por éstos por medio de la
            Plataforma Llegoshop.  <br ></br>6.Titular: persona natural cuyos Datos
            Personales son objeto de Tratamiento.  <br ></br>7.Tratamiento: es cualquier
            operación o conjunto de operaciones sobre Datos Personales, tales
            como la recolección, almacenamiento, uso, circulación o
            supresión.8.Usuario: persona natural que, como destinatario final,
            utiliza la Plataforma Llegoshop para adquirir los productos y/o
            servicios exhibidos, ofrecidos y comercializados por los Aliados
            Comerciales a través de la misma.  <br ></br><br ></br>FUNCIONAMIENTO DE LA PLATAFORMA
            LLEGOSHOP:La Plataforma Llegoshop es una herramienta tecnológica
            que, haciendo uso del internet, facilita la intermediación entre
            Llegoshoptenderos, Aliados Comerciales y los Usuarios, entendiéndose
            como el “Servicio de Reparto”, a la operación que se concreta entre
            los sujetos antes mencionados. Dicho Servicio de Reparto es
            ejecutado a través de un contrato de mandato, donde el
            Llegoshoptendero actúa como mandatario y el Usuario funge como
            mandante en dicha relación. Llegoshop actúa en todo momento como
            tercero intermediario entre Llegoshoptenderos, Usuarios y Aliados
            Comerciales.Asimismo, los Usuarios aceptan y entienden que Llegoshop
            no presta servicios de reparto, mensajería, transporte ni logística.
            Por lo tanto, bajo ninguna circunstancia los Llegoshoptenderos serán
            considerados empleados por Llegoshop ni por ninguno de sus
            afiliados. Los Llegoshoptenderos prestan el Servicio por cuenta y
            riesgo propio y liberan a Llegoshop de cualquier responsabilidad que
            pudiera surgir durante la prestación del Servicio de Reparto.Además,
            los Usuarios reconocen que Llegoshop no comercializa productos ni
            servicios, ni presta servicios de logística y/o entrega a los
            Usuarios. Los precios, cantidad, disponibilidad y características de
            los productos y/o servicios exhibidos en la Plataforma Llegoshop son
            determinados directamente por los Aliados Comerciales y no por
            Llegoshop.
          </div>
          <div>
            <br ></br>ACEPTACIÓN DE LOS TÉRMINOS & CONDICIONES:  <br ></br><br ></br>El Usuario, al momento de
            registrarse en la Plataforma Llegoshop, voluntariamente acepta de
            manera previa, expresa e informada el contenido de los presentes
            Términos & Condiciones en su totalidad, por lo cual, se obliga
            irrevocablemente a éstos.  <br ></br> Esto quiere decir, que el Usuario declara
            haber leído y entendido todas las condiciones en la Política de
            Privacidad y en los presentes Términos & Condiciones, manifestando
            su conformidad y aceptación al registrarse y hacer uso de la
            Plataforma Llegoshop.<br ></br>La persona natural que acepta los presentes
            Términos & Condiciones declara y garantiza ser el Usuario que hará
            uso de la Plataforma Llegoshop.<br ></br>Cualquier persona que no acepte o se
            encuentre en desacuerdo con estos Términos & Condiciones, los cuales
            tienen un carácter obligatorio y vinculante, deberá abstenerse de
            utilizar la Plataforma Llegoshop.<br ></br>Los presentes Términos &
            Condiciones de Uso de la Plataforma Llegoshop, regulan la relación
            contractual entre los Usuarios con Llegoshop. El servicio se
            encuentra dirigido exclusivamente a residentes en la zona de
            cobertura de Llegoshop en Santa Clara, distrito de Ate. Los Usuarios
            se encontrarán sujetos a los Términos & Condiciones Generales
            respectivos, junto con todas las demás políticas y principios que
            rigen Llegoshop y que son incorporados al presente por
            referencia.<br ></br>OBLIGACIONES DE LOS USUARIOS:En virtud de la aceptación
            de los presentes Términos & Condiciones, el Usuario se obliga a:{" "}
          </div>
          <div>
            <br ></br>Ingresar sus Datos Personales de manera veraz al momento de
            registrarse en la Plataforma Llegoshop.<br ></br>Abstenerse de transferir a
            terceros los datos de validación de su cuenta en la Plataforma
            Llegoshop.<br ></br>Notificar a Llegoshop respecto de cualquier uso no
            autorizado de su cuenta al interior de la Plataforma
            Llegoshop<br ></br>Abstenerse de utilizar la Plataforma Llegoshop para
            realizar actos contrarios a la moral, la ley, el orden público, y
            las buenas costumbres en contra de Llegoshop, los Repartidores
            Independientes, Aliados Comerciales, y/o de terceros.<br ></br>Disponer de
            fondos suficientes para procesar el pago de las órdenes solicitadas
            por medio de la Plataforma LLegoshop.<br ></br>Realizar al pago del valor
            total de la orden a través de la Plataforma Llegoshop de conformidad
            con el método de pago seleccionado en el Check-Out.<br ></br>Abstenerse de
            registrar métodos de pago de propiedad de terceros sin autorización
            de éstos.<br ></br>Registrar los métodos de pago de conformidad con el
            proceso de verificación al interior de la Plataforma
            Llegoshop.<br ></br>Pagar cualquier deuda que genere en virtud del uso de la
            Plataforma Llegoshop. Asimismo, el Usuario reconoce y acepta que
            Llegoshop podrá descontar el valor de la deuda de cualquier método
            de pago registrado en la Plataforma Llegoshop.<br ></br>Abstenerse de
            solicitar compensaciones, por cualquier medio, que falten a la
            verdad.<br ></br>Recibir los productos solicitados a través de la Plataforma
            Llegoshop.<br ></br>Verificar que los productos y/o servicios solicitados por
            medio de la Plataforma Llegoshop correspondan a los solicitados por
            el Usuario.<br ></br>Informarse sobre las instrucciones de uso y consumo de
            los productos solicitados a través de la Plataforma
            Llegoshop.<br ></br>Asegurarse que los datos de la orden (productos,
            dirección de entrega, entre otros) sean correctos antes de solicitar
            la misma.<br ></br>Abstenerse de realizar conductas que atenten en contra del
            funcionamiento de la Plataforma Llegoshop.<br ></br>Abstenerse de entablar
            relaciones con los Repartidores Independientes y/o los Aliados
            Comerciales para realizar actividades ilícitas y/o contrarias a la
            moral, al orden público y a las buenas costumbres.<br ></br>Abstenerse de
            suplantar la identidad de otros Usuarios.<br ></br>Abstenerse de descifrar,
            descompilar o desensamblar cualquier elemento de la Plataforma
            Llegoshop.<br ></br>Abstenerse de tener más de una (1) cuenta en la
            Plataforma Llegoshop con los mismos Datos Personales. El Usuario
            reconoce y acepta que Llegoshop se reserva el derecho de desactivar
            las cuentas que no cumplan con estos parámetros.<br ></br>Mantener custodia
            del dispositivo móvil o portátil por medio del cual accede a la
            Plataforma Llegoshop, garantizando que terceros no tengan acceso
            indebido a la Plataforma Llegoshop por acciones u omisiones del
            Usuario. Se aclara que, en caso de que se evidencie que el Usuario
            no ha custodiado en debida forma su dispositivo móvil
          </div>
          <div>
            o portátil, Llegoshop no tendrá ningún tipo de responsabilidad por
            accesos no autorizados por parte de terceros a la Plataforma
            Llegoshop.<br ></br>Mantener custodia de las tarjetas de crédito/débito
            registradas en la Plataforma Llegoshop, para evitar que terceros
            realicen transacciones no autorizadas, comprendiendo que, en caso
            ocurran, Llegoshop no tiene ni responsabilidad ni control por dichos
            hechos.<br ></br>Tratar de manera respetuosa a los Repartidores
            Independientes y a los agentes de servicio al cliente.<br ></br>Verificar
            cada uno de los montos indicados al final del proceso de compra
            (valor de los productos, costo de envío, tarifa de servicio, entre
            otros) entendiéndose que, al solicitar la orden, el Usuario acepta
            cada uno de ellos.<br ></br>Abstenerse de usar la propiedad intelectual de
            Llegoshop y/o los Aliados Comerciales para fines no autorizados
            expresamente por éstos.<br ></br>Los representantes legales de los Usuarios
            que sean menores de edad declaran expresamente que han autorizado a
            estos últimos su registro en la Plataforma Llegoshop, entendiéndose
            que son responsables por el uso de la Plataforma Llegoshop por parte
            de los Usuarios menores de edad.
          </div>

          <div>
            Ante el incumplimiento de cualquiera de las obligaciones contenidas
            en la presente sección, Llegoshop se reserva el derecho de bloquear
            definitivamente la cuenta del Usuario en la Plataforma
            Llegoshop.<br ></br>DEL REGISTRO DEL USUARIOEl acceso a la Plataforma
            Llegoshop es gratuito, salvo en lo relativo al costo de la conexión
            a través de la red de telecomunicaciones suministrada por el
            proveedor de acceso contratado (ISP) por el Usuario, que estará a su
            exclusivo cargo. El Usuario únicamente podrá acceder a la Plataforma
            a través de los medios autorizados.Para el acceso a los contenidos
            de la Plataforma Llegoshop será necesario el registro del Usuario.
            Por ello, para acceder al Servicio de Reparto prestado por los
            Llegoshoptenderos, el Usuario deberá contar con un Smartphone con
            sistema operativo IOS o Android y completar todos los campos del
            formulario de inscripción correspondiente a los Usuarios con datos
            válidos. Los Usuarios deberán verificar que la información que ponen
            a disposición de Llegoshop; es decir, sus Datos Personales, sean
            exactos, precisos y verdaderas. Asimismo, el Usuario asumirá el
            compromiso de actualizar sus Datos Personales cada vez que los
            mismos sufran modificaciones. Llegoshop podrá utilizar diversos
            medios para identificar a los Usuarios, pero Llegoshop no se
            responsabiliza por la certeza de los Datos Personales que los
            Usuarios pongan a su disposición. Los Usuarios garantizan y
            responden, en cualquier caso, por la veracidad, exactitud, vigencia
            y autenticidad de los Datos Personales puestos a disposición de
            Llegoshop.
          </div>

          <div>
            A los efectos de adquirir la condición de Usuario de Llegoshop, el
            Usuario deberá completar el formulario de registro, brindar su
            consentimiento para el tratamiento de sus Datos Personales, aceptar
            la Política de Privacidad y Tratamiento de Datos Personales, y los
            presentes Términos & Condiciones.Una vez efectuado el Registro,
            Llegoshop otorgará al Usuario una cuenta personal para acceder con
            la contraseña que elija (en adelante, la “Cuenta”). La Cuenta es
            personal, única e intransferible, y está prohibido que un mismo
            Usuario registre o posea más de una Cuenta. En caso que Llegoshop
            detecte distintas Cuentas que contengan datos coincidentes o
            relacionados, podrá cancelar, suspender o inhabilitarlas. El Usuario
            será el único responsable por el uso de su Cuenta.Los Datos
            Personales introducidos por el Usuario deberán ser exactos, actuales
            y veraces en todo momento. Llegoshop se reserva el derecho de
            solicitar algún comprobante y/o dato adicional a efectos de
            corroborar los Datos Personales, y de suspender temporal y/o
            definitivamente a aquel Usuario cuyos datos no hayan podido ser
            confirmados. Llegoshop NO se responsabiliza por la certeza de los
            datos consignados en el Registro. El Usuario garantiza y responde,
            en cualquier caso, por la veracidad, exactitud, vigencia y
            autenticidad de sus Datos Personales. Los Datos Personales que el
            Usuario proporcione se integrarán en una base de datos personales de
            la que es responsable Llegoshop. Para más información consultar la
            Política de Privacidad y Tratamiento de Datos Personales.<br ></br>USO DE LA
            PLATAFORMA LLEGOSHOPLlegoshop tendrá las facultades para denegar o
            restringir el uso a la Plataforma Llegoshop a cualquier Usuario en
            caso de incumplimiento de los presentes Términos & Condiciones, sin
            que ello genere perjuicio alguno al Usuario. Llegoshop no será
            responsable si el Usuario no cuenta con un teléfono celular
            compatible con el uso del aplicativo que contiene la Plataforma
            Llegoshop. El Usuario se compromete a hacer un uso adecuado y lícito
            de la Plataforma Llegoshop de conformidad con la legislación
            aplicable, los presentes Términos & Condiciones, la moral y buenas
            costumbres generalmente aceptadas y el orden público. Además de las
            obligaciones de los Usuarios, detalladas en los presentes Términos &
            Condiciones, al utilizar la Plataforma Llegoshop, el Usuario acuerda
            que:<br ></br>Solo utilizará el Servicio para su uso personal y no tendrá
            facultades para revender su Cuenta a un tercero.<br ></br>No autorizará a
            terceros a usar su Cuenta.<br ></br>No cederá ni transferirá de otro modo su
            Cuenta a ninguna otra persona o entidad legal.<br ></br>No utilizará una
            cuenta que esté sujeta a cualquier derecho de una persona que no sea
            ella sin la autorización adecuada.<br ></br>No solicitará el Servicio con
            fines ilícitos, ilegales, contrarios a lo establecido en los
            presentes Términos & Condiciones, a la buena fe y al orden público,
            lesivos de los derechos e intereses de terceros
          </div>

          <div>
            rindarán los Llegoshoptenderos se encuentra dirigido exclusivamente
            a los Usuarios.La solicitud de un Servicio de Reparto podrá pagarse
            en efectivo directamente a los Llegoshoptenderos o mediante la
            plataforma de pagos (en adelante, el “Procesador de Pagos”) asociada
            a la Plataforma. El procesamiento de pagos estará sujeto a todos los
            términos y condiciones y políticas de privacidad del Procesador de
            Pagos. Llegoshop no será responsable por ningún error u omisión
            cometido por el Procesador de Pagos. El Usuario podrá encontrar en
            la Plataforma Llegoshop, diversos productos ofrecidos por los
            Aliados Comerciales quienes se desempeñan como proveedores
            independientes y utilizan la Plataforma Llegoshop como medio para
            ofrecer sus productos. Es así, que a través de la Plataforma
            Llegoshop, el Usuario pueda dar aviso de manera inmediata a un
            Llegoshoptendero que desea el envío de un producto que ofrece un
            Aliado Comercial.Sin perjuicio de ello, el Usuario podrá solicitar a
            un Llegoshoptendero el envío de un producto ofrecido por cualquier
            otro comercio diferente a los Comercios Aliados, siempre y cuando
            dicho producto respete los presentes Términos & Condiciones. En este
            supuesto, el Usuario deberá abonar adicionalmente al precio del
            producto, el valor del Servicio de Reparto y un porcentaje (%)
            adicional sobre el valor del producto por el uso de la plataforma
            virtual el cual deberá aceptar el Usuario al momento de realizar la
            orden. Las condiciones de dicha funcionalidad, denominada “Comprar
            algo y llevártelo” se encuentran especificadas al final de los
            presentes Términos & Condiciones.Cualquier cambio en el Servicio de
            Reparto será informado al Usuario al teléfono de contacto, vía la
            Plataforma Llegoshop y/o al correo electrónico informado por el
            Usuario en su Cuenta. Una vez aceptado el precio y seleccionados los
            Servicios de Reparto que se deseen utilizar por intermedio de la
            Plataforma Llegoshop, será requisito indispensable que el Usuario
            incorpore los datos exigidos en los campos allí establecidos y, una
            vez cumplido ello, se podrá emitir la solicitud correspondiente.Es
            decir, una vez efectuada la solicitud, inmediatamente quedará
            confirmada la misma, asumiendo el Usuario las tarifas
            correspondientes. El Llegoshoptendero cumplirá el Servicio de
            Reparto entregando los productos a la persona que surge de los
            detalles de entrega, siendo el Usuario el único responsable por la
            veracidad de los datos allí introducidos.Se encuentra totalmente
            prohibido utilizar el Servicio de Reparto, para transportar
            mercadería con fines ilícitos, ilegales, contrarios a lo establecido
            en los presentes Términos & Condiciones, a la buena fe, al orden
            público y a las buenas costumbres, lesivos de los derechos e
            intereses de terceros incluyendo, sin limitación, el transporte de
            material ilegal, que constituya un peligro para la salud o
            integridad de las personas, o con fines fraudulentos.El Usuario
            reconoce y acepta que Llegoshop no es el productor, proveedor,
            comercializador, agente y/o distribuidor de los productos y/o
            servicios exhibidos en la Plataforma Llegoshop. Por lo anterior,
            Llegoshop no es responsable por la falta de disponibilidad de los
            productos y/o servicios exhibidos, ofrecidos y comercializados por
            los Aliados Comerciales a través de la Plataforma
            Llegoshop.Llegoshop se reserva la posibilidad de bloquear al
            Usuario, por cuestiones de seguridad ante posibilidades de fraude,
            estafa, uso de datos ajenos, o algún otro supuesto que se desprenda
            como infracción de los presentes Términos & Condiciones de uso de la
            Plataforma. Dicha situación será debidamente comunicada al Usuario.
            Asimismo, Llegoshop podrá rechazar y/o frenar cualquier orden de los
            Usuarios Registrados, en caso de identificar una infracción a los
            presentes Términos & Condiciones.
          </div>
          <div>
            <br ></br>CONDICIONES DE PAGO Y FACTURACIÓN Las tarifas aplicables al
            Servicio de Reparto las fijará Llegoshop conforme a la demanda de
            servicios que se encuentre activa en ese momento al momento en que
            el Usuario haga uso de la Plataforma Llegoshop. El Usuario acepta
            que sea Llegoshop quien fije estas tarifas. Estas tarifas serán
            cobradas directamente por el Llegoshoptendero de forma automática,
            mediante el Procesador de Pagos o, en su defecto, personalmente
            cuando el pago se realice en dinero en efectivo. Las tarifas
            cobradas por el Servicio de Reparto no serán reembolsables.Para los
            casos en los que el Servicio de Reparto sea pagado por el Usuario al
            Llegoshoptendero en efectivo y el monto entregado por el Usuario sea
            mayor a la tarifa cobrada por el mencionado servicio, el
            Llegoshoptendero deberá cumplir con entregarle al Usuario aquel
            monto sobrante existente entre el monto entregado como pago y la
            tarifa establecida por Llegoshop. Las tarifas aplicables a los
            productos y servicios solicitados por el Usuario serán cobradas
            directamente por Llegoshop a través del Procesador de Pagos. En el
            caso de los Comercios no Aliados, Llegoshop se reserva el derecho de
            exhibir un precio de los productos por encima del valor real
            encontrado en el establecimiento y el Usuario acepta pagar los
            productos con este valor adicional, por el uso de la plataforma
            virtual, teniendo en cuenta que el precio exhibido en la plataforma
            será el precio final a ser cobrado.En ese mismo sentido, Llegoshop
            se reserva el derecho de incrementar, hasta en un diez por ciento
            (10%), los precios de los productos exhibidos en las tiendas físicas
            de los Comercios Aliados y de los Comercios no Aliados. Los valores
            adicionales serán cobrados a título de uso de la plataforma virtual.
            En los supuestos en que el Servicio de Reparto se solicite para
            entregar los productos ofrecidos por los Comercios no Aliados, el
            Usuario adelantará el dinero correspondiente al precio de
            adquisición del producto y Llegoshop lo entregará al
            Llegoshoptendero. El Llegoshoptendero adquirirá el producto y
            realizará el pago del precio de venta a favor del proveedor por
            cuenta y orden del Usuario.El titular de la tarjeta de crédito es el
            responsable por los datos consignados al momento de la solicitud y/o
            reserva del Servicio de Reparto seleccionado y es el único obligado
            al pago frente al emisor de la misma. Cualquier desconocimiento
            deberá ser efectuado frente del Banco emisor de la tarjeta de
            crédito de conformidad con lo dispuesto por el Reglamento de
            Tarjetas de Crédito y Débito aprobado mediante Resolución SBS No.
            6523-2013.Llegoshop se reserva el derecho de tomar las medidas
            judiciales y extrajudiciales que estime pertinentes para obtener el
            pago del monto debido que pueda adeudar el Usuario. Llegoshop se
            reserva el derecho de modificar, cambiar, agregar, o eliminar las
            Tarifas Vigentes, en cualquier momento, lo cual será debidamente
            notificado al Usuario.El Usuario entiende y acepta que los Aliados
            Comerciales son los únicos encargados de otorgar los comprobantes de
            pago correspondientes (boletas/facturas) por las compras realizadas
            a dichos establecimientos comerciales por medio de la Plataforma
            Llegoshop. Por ende, Llegoshop no es el responsable de la emisión de
            dichos documentos ya que únicamente es una plataforma de
            intermediación que no comercializa ni vende productos. En este
            sentido, Llegoshop no se responsabiliza por la no entrega o la
            entrega defectuosa de los mismos, careciendo el Usuario el derecho a
            presentar cualquier tipo de reclamo en contra de Llegoshop por
            dichos hechos.
          </div>
          <div>
            <br ></br>MÉTODO DE PAGOEl pago de las órdenes solicitadas a través de la
            Plataforma Llegoshop se realizará a través del método de pago
            registrado y seleccionado por el Usuario en la Plataforma
            Llegoshop.En el caso en el que Llegoshop verifique que el método de
            pago seleccionado por el Usuario está vencido, no es válido, o no
            cuenta con fondos suficientes para realizar el pago de la orden, el
            Usuario acepta que Llegoshop realice el cobro del valor total de la
            orden a cualquier otra tarjeta o método de pago disponible que se
            encuentre vinculado a su cuenta en la Plataforma Llegoshop.1.
            CANCELACIONES Y DEVOLUCIONESUna vez emitida la Solicitud de Reparto,
            el Usuario podrá cancelarla (en adelante, la “Cancelación”) sin
            penalidad alguna, siempre que dicha Cancelación se realice a través
            de la Plataforma (al hacer clic en el pedido en curso) antes de que
            la tienda comience a preparar la orden (Cooking Time en el caso de
            Restaurantes) o antes que la tienda acepte la misma (los demás
            casos). Se aclara, que el estado de la orden podrá ser visualizado
            directamente por el Usuario a través de la Plataforma.De no
            efectuarse la Cancelación en el tiempo estipulado en el punto
            precedente, el Usuario estará obligado a abonar la totalidad de la
            orden; es decir, el 100% del monto correspondiente al pago del
            Servicio de Reparto y valor de los productos, sin perjuicio de que
            luego el Usuario pueda gestionar la devolución directamente con el
            Aliado Comercial, la misma que se regirá bajo las propias políticas
            y reglas del Aliado Comercial.El importe que se cobrará por la
            Cancelación de la orden, se mostrará al Usuario antes de que este
            concrete dicha solicitud a través de la Plataforma. El Usuario
            reconoce que la devolución de dicho monto podría no ser inmediato,
            dependiendo del proceso que deban efectuar las entidades financieras
            involucradas para la devolución.El Usuario en ningún caso podrá
            alegar falta de conocimiento de las limitaciones, restricciones y
            penalidades, dado que las mismas son informadas en forma previa a
            realizar la solicitud del Servicio de Reparto y posterior
            Cancelación a través de la Plataforma Llegoshop.
          </div>
          <div>
            Se aclara que, cuando corresponda una devolución, Llegoshop
            efectuará en una primera instancia cualquier devolución a través de
            Créditos de la Plataforma Llegoshop, los cuales se abonarán
            directamente a la Cuenta del Usuario. En caso que este último
            prefiera la devolución del dinero entregado, podrá señalarlo a
            Soporte, caso en el cual se anularán los Créditos abonados al
            respecto, procediendo a la devolución del dinero del Servicio, a la
            tarjeta utilizada para efectuar la compra, en caso ese haya sido el
            método de pago elegido. Lo anterior se sujetará a los tiempos que
            pueda tomar la entidad bancaria en reflejar en la cuenta bancaria
            del Usuario, la devolución efectuada. Dicho plazo puede extenderse a
            aproximadamente veinte (20) días hábiles desde que se efectúa la
            devolución.1. RESPONSABILIDADEl Usuario conoce y acepta que
            Llegoshop pone a disposición del Usuario sólo un espacio virtual
            que, en calidad de intermediador, les permite ponerse en
            comunicación mediante la Plataforma Llegoshop para que un
            Llegoshoptendero pueda brindar los Servicios de Reparto a favor del
            Usuario Registrado. Llegoshop no interviene en el perfeccionamiento
            de las operaciones, actividades o servicios realizados por el
            Llegoshoptendero a favor del Usuario. Por ello, el Llegoshoptendero
            y/o el Comercio (Aliado o no Aliado) serán responsables respecto de
            la calidad, cantidad, estado, integridad o legitimidad de la
            mercadería transportada por el Llegoshoptendero. Además, el
            Llegoshoptendero será responsable de su capacidad para contratar y
            la veracidad de los Datos Personales que haya ingresado.El Usuario
            conoce y acepta que al realizar operaciones con el Llegoshoptendero
            lo hace bajo su propio riesgo. Llegoshop no será responsable por
            lucro cesante, o por cualquier otro daño y/o perjuicio que haya
            podido sufrir el Usuario Registrado, o el Llegoshoptendero, debido
            al Servicio de Reparto prestado por el Llegoshoptendero, que no esté
            bajo la esfera de control de Llegoshop o respecto de daños y/o
            perjuicios atribuibles a un tercero. Por ello, Llegoshop recomienda
            actuar con prudencia y sentido común al momento de contratar el
            Servicio de Reparto. En caso que uno o más Usuarios Registrados o
            algún tercero inicien un reclamo o acción legal contra un
            Llegoshoptendero por actos no atribuibles a Llegoshop conforme a las
            reglas establecidas en estos Términos & Condiciones, todos y cada
            uno de los involucrados en dichos reclamos o acciones eximen de
            responsabilidad a Llegoshop y a sus directores, gerentes, empleados,
            agentes, operarios, representantes y apoderados.Por lo tanto, se
            deja expresa constancia de que Llegoshop, al ser una Plataforma que
            contacta diversos actores, solamente se encuentra obligada a
            responder por el servicio de uso de su plataforma, más no por ningún
            hecho generado por el Servicio de Reparto o por los productos
            adquiridos por el Usuario.
          </div>
          <div>. USO Y GARANTÍA DE LA PLATAFORMA LLEGOSHOP</div>
          <div>
            Llegoshop informa a sus Usuarios que la Plataforma Llegoshop podría
            presentar limitaciones de disponibilidad y continuidad en su
            funcionamiento, por razones de mantenimiento o acciones que escapen
            al control y manejo de Llegoshop. En estos casos, Llegoshop hará
            todo lo que se encuentre razonablemente a su alcance para retomar el
            adecuado funcionamiento de la Plataforma Llegoshop. Sin embargo,
            hace de conocimiento de los Usuarios para que tomen las precauciones
            correspondientes, siendo que Llegoshop no será responsable por
            eventuales daños y/o perjuicios que puedan derivarse de: (i) la
            falta de disponibilidad o accesibilidad a la Plataforma Llegoshop
            por las razones antes expuestas; (ii) la interrupción en el
            funcionamiento de la Plataforma Llegoshop o fallos informáticos
            ajenos al control de Llegoshop, averías telefónicas, desconexiones,
            retrasos o bloqueos causados por deficiencias o sobrecargas en las
            líneas telefónicas, centros de datos, en el sistema de Internet o en
            otros sistemas electrónicos, producidos en el curso de su
            funcionamiento; y, (iii) otros daños que puedan ser causados por
            terceros mediante intromisiones no autorizadas ajenas al control de
            Llegoshop.Llegoshop adopta las medidas de seguridad necesarias y
            razonables para el funcionamiento de la Plataforma Llegoshop. Sin
            embargo, estas medidas no necesariamente aseguran la ausencia de
            virus ni de otros elementos en la Plataforma Llegoshop, introducidos
            por terceros, ajenos al control de Llegoshop, que puedan producir
            alteraciones en los sistemas físicos o lógicos del Usuario en los
            documentos electrónicos y ficheros almacenados en sus sistemas. En
            consecuencia, Llegoshop no será responsable de los daños y
            perjuicios que pudieran derivarse de la presencia de virus u otros
            elementos, ajenos al control de Llegoshop, que puedan producir
            alteraciones en los sistemas físicos o lógicos, documentos
            electrónicos o ficheros del Usuario.Llegoshop adopta diversas
            medidas de protección para proteger la Plataforma Llegoshop y los
            contenidos contra ataques informáticos de terceros. No obstante,
            Llegoshop no garantiza que terceros no autorizados (utilizando
            ilegales o fraudulentos) no puedan conocer las condiciones,
            características y circunstancias en las cuales el Usuario accede a
            la Plataforma Llegoshop. En consecuencia, Llegoshop no será en
            ningún caso responsable de los daños y perjuicios que pudieran
            derivarse de dicho acceso no autorizado.Con la suscripción de los
            presentes Términos & Condiciones, el Usuario que suscribe el
            presente documento declara que mantendrá indemne frente a cualquier
            reclamación a Llegoshop, su sociedad matriz, directores, socios,
            empleados, abogados y agentes derivadas de: (i) el incumplimiento
            por parte del Usuario de cualquier disposición contenida las
            presentes en los Términos & Condiciones o de cualquier ley o
            regulación aplicable a las mismas; (ii) el incumplimiento o
            violación de los derechos de terceros incluyendo, a título meramente
            enunciativo, otros Usuarios, peatones; y, (iii) el incumplimiento
            del uso permitido de la Plataforma Llegoshop, siendo estas
            condiciones meramente enunciativas y no taxativas, por lo que el
            Usuario mantendrá indemne a Llegoshop por cualquier otra violación
            normativa o daño a terceros que pueda producirse como consecuencia
            de la utilización del Servicio de Reparto por parte del Usuario.
          </div>
          <div>
            1. PROPIEDAD INTELECTUALEl Usuario reconoce y acepta que todos los
            derechos de propiedad intelectual e industrial sobre los contenidos
            y/o cualesquiera otros elementos insertados en la Plataforma
            Llegoshop (incluyendo, sin limitación, marcas, logotipos, nombres
            comerciales, lemas comerciales textos, imágenes, gráficos, diseños,
            sonidos, bases de datos, software, diagramas de flujo, presentación,
            audio y vídeo y/o cualquier otro derecho de propiedad intelectual e
            industrial de cualquier naturaleza que éstos sean), pertenecen y son
            de propiedad exclusiva de Llegoshop. Por lo tanto, Llegoshop
            autoriza al Usuario a utilizar, visualizar, imprimir, descargar y
            almacenar los contenidos y/o los elementos insertados en la
            Plataforma Llegoshop exclusivamente para su uso personal, privado y
            no lucrativo, absteniéndose de realizar sobre los mismos cualquier
            acto de descompilación, ingeniería inversa, modificación,
            divulgación o suministro. Cualquier otro uso o explotación de
            cualesquiera contenidos y/u otros elementos insertados en la
            Plataforma Llegoshop distinto de los aquí expresamente previstos
            estará sujeto a la autorización previa de Llegoshop.Bajo ningún
            concepto se entenderá que el acceso a la Plataforma Llegoshop y/o la
            aceptación de los Términos & Condiciones generar algún derecho de
            cesión a favor de los Usuarios ni de cualquier tercero.1. PROTECCIÓN
            DE DATOS PERSONALESLos datos personales que los Usuarios
            proporcionen en el Registro, serán almacenados y tratados según lo
            dispone la Ley N° 29733, Ley de Protección de Datos Personales, su
            Reglamento, aprobado mediante Decreto Supremo N° 003-2013-JUS, demás
            normas conexas y la Política de Privacidad de Llegoshop y
            Tratamiento de Datos Personales que aceptan los Usuarios al momento
            del Registro.En ese sentido, Llegoshop se obliga al cumplimiento
            estricto de las normas anteriormente mencionadas, así como a
            mantener los estándares máximos de seguridad, protección, resguardo,
            conservación y confidencialidad de la información recibida o
            enviada.Los Usuarios declaran que los datos personales han sido
            entregados de forma absolutamente libre y voluntaria, sin ningún
            tipo de presión, obligación o condición de por medio.1. CESIÓNEl
            Usuario no podrá ceder sus derechos y obligaciones dimanantes de los
            presentes Términos & Condiciones sin el previo consentimiento
            escrito de Llegoshop. Asimismo, Llegoshop podrá ceder, sin necesidad
            de recabar el consentimiento previo del Usuario, los presentes
            Términos & Condiciones a cualquier entidad comprendida dentro de su
            grupo de sociedades, en todo el mundo, así como a cualquier persona
            o entidad que le suceda en el ejercicio de su negocio por
            cualesquiera títulos.
          </div>
          <div>
            1. LEY APLICABLE Y JURISDICCIÓNLos presentes Términos & Condiciones,
            así como la relación entre Llegoshop y el Usuario, se regirán e
            interpretarán con arreglo a la legislación vigente en la República
            del Perú.Los Términos & Condiciones específicos para cada botón que
            se encuentran descritos a continuación, deberán interpretarse junto
            con los Términos & Condiciones generales de Llegoshop, así como con
            los específicamente desarrollados por Llegoshop para promociones,
            campañas y otras actividades que se realicen a través de la
            plataforma virtual.1. SECCIÓN LLEGOSHOPFAVORA continuación, se
            mostrarán los Términos & Condiciones aplicables a los Usuarios que
            utilicen el botón o servicio de “LlegoshopFavor”, a través de la
            Plataforma Llegoshop y por ende se entenderán como leídos y
            aceptados por todos los Usuarios que utilicen dicho
            servicio:1.Opción: “Recoger algo y entregarlo”Mediante esta opción,
            el Usuario podrá solicitar a un Llegoshoptendero, el recojo y
            posterior entrega de algún producto, en ubicaciones que se
            encuentren dentro de la zona de cobertura de Llegoshop.Condiciones
            Generales:<br ></br>El Usuario no podrá realizar envíos que contengan una
            mercancía que supere un valor comercial de más de S/ 950.00
            (Novecientos Cincuenta y 00/100 Soles), pues la protección que
            brinda Llegoshop no asegura ningún tipo de mercancía por un valor
            superior a este.<br ></br>El Usuario reconoce y acepta que, en caso de enviar
            algún paquete que contenga mercancía por un valor superior al antes
            mencionado, lo hará bajo su propio riesgo, liberando al
            Llegoshoptendero y a Llegoshop de cualquier tipo de responsabilidad
            al respecto.<br ></br>En caso de pérdida, daño, menoscabo, merma, entre otros
            del producto enviado por causas directamente imputables a Llegoshop,
            solo se hará devolución del valor declarado del envío, con un tope
            máximo de S/ 950.00 (Novecientos Cincuenta y 00/100 Soles). Se
            aclara que, por la seguridad de los Usuarios, a partir del día 01 de
            junio de 2022, las devoluciones del valor declarado se realizarán
            únicamente mediante transferencia bancaria.<br ></br>Para todos los efectos,
            Llegoshop funge como una simple plataforma de contacto mediante la
            cual, el Usuario podrá solicitar a un Llegoshoptendero, el servicio
            de recojo y entrega, el cual se llevará a cabo por el mutuo acuerdo
            entre las partes. Llegoshop aclara que la relación será directamente
            entre el Usuario y el Llegoshoptendero y se mantendrá al margen de
            la misma, no siendo responsable ni siquiera solidariamente por
            cualquier hecho que pueda generarse de la relación entre las dos
            partes descritas anteriormente, incluyendo pérdidas, daños,
            menoscabo, merma, entre otros que puedan sufrir la mercancía
            enviada.<br ></br>El Usuario reconoce y acepta que no enviará ningún tipo de
            mercancía o productos que sean considerados como ilícitos bajo la
            normatividad peruana, así como tampoco solicitará o enviará divisas,
            joyas, bienes tecnológicos o cualquier otro tipo de objeto de valor.
            El Llegoshoptendero se reserva el derecho de rechazar el encargo de
            transportar cualquier tipo de paquete o documento, dejándolo a su
            libre discreción y autonomía. De esta manera, el Usuario acepta que
            es el único y entero responsable frente a las autoridades respecto
            de la mercancía o documentación que envía, liberando a Llegoshop y
            al Llegoshoptendero de cualquier tipo de responsabilidad que pueda
            surgir al respecto. Llegoshop podrá solicitar al Usuario que declare
            el contenido de lo que está enviando antes de solicitar la orden. El
            Usuario asume a su exclusivo cargo la responsabilidad que pueda
            derivarse de una declaración errónea, incompleta, dolosa, o que
            pueda admitir un delito, librando tanto a Llegoshop como al
            Llegoshoptendero de la falsedad u omisión de la declaración. Dicha
            declaración la realiza a modo de declaración jurada.<br ></br>El monto que
            deberá pagar el Usuario será establecido unilateralmente por
            Llegoshop, en consideración al valor declarado y la distancia de
            envío (costo de domicilio y tarifa por distancia), el cual es
            aceptado expresamente por el Usuario. Asimismo, dicho monto será
            cobrado directamente por el Llegoshoptendero. El Llegoshoptendero
            podrá negarse a aceptar la realización de un Servicio en caso de no
            estar de acuerdo con el valor a cobrar por dicho Servicio, toda vez
            que el acceso y uso de la Plataforma, como así también la aceptación
            de la Solicitud del Usuario, es de carácter voluntario y no
            obligatorio para el Llegoshoptendero. En este sentido, el monto que
            deberá pagar el Usuario, será la suma del valor correspondiente al
            costo de domicilio, tarifa por distancia, propina (opcional) y al
            monto por concepto de valor declarado, en caso así lo desee.<br ></br>Opción:
            “Comprar algo y llevártelo”Mediante esta opción, el Usuario podrá
            solicitar cualquier producto de establecimientos de comercio que no
            sean necesariamente aliados de Llegoshop y que se encuentren dentro
            de la zona de cobertura de Llegoshop para que sean entregados por
            parte de un Llegoshoptendero.Condiciones Generales:<br ></br>El Usuario
            reconoce y acepta el pago de un porcentaje adicional (%) del valor
            total de la orden cuando realiza órdenes a través de este botón.
            Este porcentaje, denominado “Comisión de Llegoshop” será exhibido en
            el “Check-out” y solo se procederá a su cobro una vez el Usuario de
            su consentimiento previo, expreso e informado dando click en el
            botón “Hacer pedido”. Este monto es independiente al valor cobrado
            por concepto de costo de domicilio, tarifa de distancia, propina
            (opcional) y el valor estimado del producto, los cuales también se
            exhiben en el “Check-out” de la orden.<br ></br>El Usuario inicialmente
            declarará un valor estimado de los productos que desea adquirir para
            que Llegoshop pueda realizar el recargo a su tarjeta por dicho
            valor. Una vez finalizada la orden su cuenta reflejará el valor
            total de los productos, procediéndose con el cobro de los mismos.<br ></br>El
            Usuario acepta abstenerse de realizar solicitudes de productos que
            se encuentren al margen de la ley y reconoce que está absolutamente
            prohibido solicitar productos que sean considerados ilegales. Lo
            anterior, sin perjuicio de ser reportado ante las autoridades
            competentes y de ser sujeto de las sanciones y penas
            correspondientes en caso de actuar en contrario.<br ></br>Los Usuarios se
            obligan, mediante la aceptación de estos Términos & Condiciones, a
            dar un uso adecuado y ajustado a las normas de la República de Perú
            y demás aplicables al botón de la referencia en este acápite, y a
            los demás activos en Llegoshop.<br ></br>Llegoshop no será responsable bajo
            ningún grado, por el uso indebido que los Usuarios hagan de este
            servicio ni por los productos que los mismos soliciten a través de
            este.<br ></br>El Llegoshoptendero cumplirá el servicio comprando y
            entregando el contenido de lo indicado en la orden a la dirección
            consignada en los Detalles de Entrega, a la persona que se indique
            en las instrucciones o a cualquier mayor de edad que se encuentre en
            la dirección señalada. El Usuario es el único responsable por la
            veracidad de los datos allí indicados.<br ></br>Llegoshop reconoce y acepta
            que rechazará y cancelará cualquier tipo de orden que vulnere
            derechos de terceros o que contravenga cualquier tipo de
            normatividad vigente.
          </div>
          <div>
            Cancelaciones y Penalidades – Sección LLEGOSHOPFAVOR:<br ></br>Una vez creada
            la orden, el Usuario podrá cancelarla sin penalidad alguna siempre
            que dicha Cancelación la realice a través de la Plataforma antes que
            un Llegoshoptendero haya aceptado/tomado la orden.<br ></br>De no efectuarse
            la Cancelación en el tiempo estipulado en el punto precedente, el
            Usuario estará obligado a abonar el 100% (cien por ciento) del monto
            total del servicio.<br ></br>El Usuario en ningún caso podrá alegar falta de
            conocimiento de las condiciones establecidas en los presentes
            Términos & Condiciones, para cumplir el cumplimiento de las
            obligaciones precedentes.
          </div>
          <div>
            Condiciones de Pago – Sección LLEGOSHOPFAVOR:<br ></br>Para efectos de
            realizar el envío, el Usuario pagará el Valor Total del Servicio (en
            adelante, la “Tarifa”), a través de la Plataforma Llegoshop o
            mediante entrega de dinero, en el caso en que sea posible. En caso
            de la opción “Recoger algo y entregarlo”, el pago deberá siempre
            efectuarlo la persona que realiza el encargo de la gestión.<br ></br>La
            Tarifa podrá variar según el tiempo que demore el Servicio. Así,
            desde el minuto sesenta (60) de realización del Servicio en
            adelante, aumentará la Tarifa por cada minuto que se
            concrete.<br ></br>Llegoshop se reserva el derecho de modificar, cambiar,
            agregar o eliminar la Tarifa, para cualquier Servicio, en cualquier
            momento, lo cual se verá reflejado automáticamente en la Solicitud
            que reciba el Llegoshoptendero en la Plataforma Llegoshop a través
            de su celular.<br ></br> Llegoshop se reserva el derecho de tomar las medidas
            judiciales y extrajudiciales que estime pertinentes para obtener el
            pago de cualquier monto que adeude el Usuario.1. SECCIÓN CAJERO ATMA
            continuación, se mostrarán los Términos & Condiciones aplicables a
            los Usuarios que utilicen el botón o servicio de “Cajero ATM”, a
            través de la Plataforma Llegoshop y por ende se entenderán como
            leídos y aceptados por los mismos:Condiciones Generales:<br ></br>El Servicio
            se encuentra dirigido a los Usuarios que utilicen la Plataforma
            Llegoshop y el mismo les permite solicitar a un Llegoshoptendero que
            les lleve dinero en efectivo a domicilio.<br ></br>Asimismo, solo podrán
            hacer uso del Servicio ofrecido a través de la sección “Cajero ATM”,
            aquellos Usuarios de Llegoshop que cuenten con una membresía Prime
            vigente (Plus o Basic).<br ></br>Para ello el Usuario reconoce y acepta el
            cobro de un porcentaje determinado de comisión sobre el monto total
            solicitado, por concepto de uso y alquiler de la Plataforma. Dicho
            valor porcentual se informará en la interfaz donde se solicita la
            orden.<br ></br>Por su parte, el Llegoshoptendero que tome la orden cobrará
            al Usuario el costo de envío, el cual podrá ser pagado directamente
            a través de la Plataforma al realizar la orden. Adicionalmente, el
            Usuario podrá, de manera opcional, dar al Llegoshoptendero la
            Propina que considere adecuada de acuerdo al nivel del Servicio
            prestado.<br ></br>Se deja constancia que el Servicio es prestado
            directamente por el Llegoshoptendero como mandatario del Usuario.
            Llegoshop no actúa como agente financiero ni como empresa de
            custodia, entre otros, únicamente facilita la Plataforma Llegoshop
            para conectar al Usuario con un Llegoshoptendero. Ninguna de las
            partes anteriormente mencionadas tiene un vínculo, de ninguna
            índole, con Llegoshop.<br ></br>El Servicio de Cajero ATM solo estará
            disponible para Usuarios que cuenten con una membresía Prime (de
            cualquier modalidad) vigente.<br ></br>El monto a solicitar por el Usuario
            estará determinado por lo que se muestre en la Plataforma. Dichos
            valores podrán ser modificados en la Plataforma Llegoshop, por lo
            que se entiende que el Usuario acepta los mismos al momento de
            solicitar la orden. <br ></br>El Usuario reconoce que el número máximo de
            pedidos a través del servicio de Cajero ATM corresponde a tres (03)
            en un día.<br ></br>Los Créditos no pueden ser canjeados en esta modalidad,
            por lo que no es posible retirarlos a través del botón Cajero ATM.
            Por dicho motivo, Llegoshop se reserva el derecho de cancelar
            cualquier orden en la cual se pretenda utilizar Créditos en este
            Servicio.<br ></br>Llegoshop se reserva el derecho de tener operativo el
            Servicio de Cajero ATM en las zonas de su cobertura que estime
            conveniente. No podrá efectuarse reclamos por parte del Usuario en
            relación a la falta de cobertura de dicho servicio en determinada
            zona.
          </div>
          <div>Última actualización: 26 de octubre de 2022</div>
        </div>
        <div></div>
      </div>
    </div>
  );
}
