import React from "react";
import { addNewPj } from "../../firebase/client";

export default function NewPj() {
  const sendNewPj = (e) => {
    e.preventDefault();
    const name = document.querySelector("input[name=name]");
    const serie = document.querySelector("input[name=serie]");
    const img = document.querySelector("input[name=img]");
    const value = document.querySelector("input[name=value]");

    addNewPj({name: name.value, serie: serie.value, img: img.value, value: value.value})

    name.value = "";
    serie.value = "";
    img.value = "";
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
