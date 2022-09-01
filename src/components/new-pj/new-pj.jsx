import React from "react";
import { createPj2 } from "../../api-requests/requests";

export default function NewPj() {
  const sendNewPj = (e) => {
    e.preventDefault();
    const name = document.querySelector("input[name=name]");
    const serie = document.querySelector("input[name=serie]");
    const img = document.querySelector("input[name=img]");
    const value = document.querySelector("input[name=value]");

    const newValue = (value.value*10)+(Math.round(Math.random()*10))

    createPj2({name: name.value, serie: serie.value, img: img.value, value: newValue})

    name.value = "";
    // serie.value = "";
    // img.value = "";
    value.value = "";
  };

  return (
    <form className="new-pj">
        <p>NAME</p>
      <input type="text" name="name" />
        <p>SERIE</p>
      <input type="text" name="serie" />
        <p>IMG</p>
      <input type="text" name="img" />
        <p>VALUE</p>
      <input type="number" name="value" />
      <br />
      <button onClick={sendNewPj}>SEND</button>
    </form>
  );
}
