import { useEffect, useContext, useState } from "react";
import useScript from "./useScript";
import { CarritoContext } from "../context/carritoContext";
import { formConfig } from "../components/MercadoPago/formConfig.js";
import emailjs from "@emailjs/browser";
export default function useMercadoPago() {
  const [resultPayment, setResultPayment] = useState(undefined);
  const { carrito } = useContext(CarritoContext);
  const { MercadoPago } = useScript(
    "https://sdk.mercadopago.com/js/v2",
    "MercadoPago"
  );
  let total = 0;
  let subTotal = 0;
  let envio = 3;
  subTotal = carrito.reduce((acum, item) => {
    return acum + item.cantidad * item.productoPrecio;
  }, 0);
  total = carrito.reduce((acum, item) => {
    return envio + acum + item.cantidad * item.productoPrecio;
  }, 0);
  console.log(MercadoPago);
  useEffect(() => {
    if (MercadoPago) {
      const mp = new MercadoPago("TEST-4fb9fcb5-8a04-4429-844a-18eea51c2460");
      const cardForm = mp.cardForm({
        amount: total.toString(),
        autoMount: true,
        form: formConfig,
        callbacks: {
          onFormMounted: (error) => {
            if (error)
              return console.warn("Form Mounted handling error: ", error);
          },

          onSubmit: (event) => {
            event.preventDefault();
            console.log(event.target)
            console.log("event.target")
            

            const {
              paymentMethodId: payment_method_id,
              issuerId: issuer_id,
              cardholderEmail: email,
              amount,
              token,
              installments,
              identificationNumber,
              identificationType,
            } = cardForm.getCardFormData();

            fetch(`http://localhost:4000/process-payment`, {
              // entry point backend
              method: "POST",
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Request-Method":
                  "GET, POST, DELETE, PUT, OPTIONS",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                token,
                issuer_id,
                payment_method_id,
                transaction_amount: total,
                installments: Number(installments),
                description: "DescripciÃ³n",
                payer: {
                  email,
                  identification: {
                    type: identificationType,
                    number: identificationNumber,
                  },
                },
              }),
            })
              .then((res) => res.json())
              .then((data) => setResultPayment(data))
              .catch((err) => {
                setResultPayment(err);
              });

              emailjs
              .sendForm(
                "service_dbyn1ba",
                "template_tmt8ie4",
                event.target,
                "WDWr2NULlTI7IojoS"
              )
              .then((response) => console.log(response))
              .catch((error) => console.log(error));
          },
          onFetching: (resource) => {
            // Animate progress bar
            const progressBar = document.querySelector(".progress-bar");
            progressBar.removeAttribute("value");

            return () => {
              progressBar.setAttribute("value", "0");
            };
          },
        },
      });
    }
  }, [MercadoPago]);

  return resultPayment;
}