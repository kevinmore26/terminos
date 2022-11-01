import React from "react";
import emailjs from "@emailjs/browser";

export const ContactUs = () => {
  const sendEmail = (event) => {
    event.preventDefault();
    console.log(event.target);
    emailjs
      .sendForm(
        "service_dbyn1ba",
        "template_tmt8ie4",
        event.target,
        "WDWr2NULlTI7IojoS"
      )
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };
  const cliente = JSON.parse(localStorage.getItem('usuario'))
  console.log(cliente)
  return (
    <div className="div-form">
      <h1 className="title-form">Contact Us</h1>
      <form className="form-mail" onSubmit={sendEmail}>
        <label>Name</label>
        <input type="text" name="user_name" value={cliente.content.clienteCelular}/>
        <hr />

        <label>Email</label>
        <input name="user_email" />
        <hr />

        <label>Message</label>
        <textarea name="user_message" id="" cols="30" rows="10"></textarea>
        <hr />
        <button>Send</button>
      </form>
    </div>
  );
};
