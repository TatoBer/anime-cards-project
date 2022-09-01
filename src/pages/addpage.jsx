import React, { useEffect, useState } from "react";
import { getAllPjs2, updatePj2 } from "../api-requests/requests";
import Card from "../components/card/card";

export default function AddPage() {
  const [pjs, setPjs] = useState(null);
  const [selector, setSelector] = useState(0);
  const [imgn, setImgn] = useState("");

  useEffect(() => {
    getAllPjs2().then((res) => {
      const noimg = res.filter((x) => x.img == "X");
      setPjs(noimg);
    });
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    const imagen = document.querySelector("input[name=imagen]").value;
    if (imagen.length > 0) {
      updatePj2({ ...pjs[selector], img: imagen });
      document.querySelector("input[name=imagen]").value = "";
      setSelector(selector + 1);
      setImgn("")
    } else alert("X");
  };

  const changeImageCard = () => {
    const imagen = document.querySelector("input[name=imagen]").value;
    setImgn(imagen);
  };

  return (
    <div className="app add-app">
      {pjs && (
        <>
          <br />
          <Card
            name={pjs[selector].name}
            serie={pjs[selector].serie}
            value={pjs[selector].value}
            img={imgn}
          />
          <br />
          <form>
            <input type="text" name="imagen" onChange={changeImageCard} />
            <button onClick={handleUpdate}>UPDATE</button>
          </form>
          <br />
          <h4>{pjs.length - selector}</h4>
        </>
      )}
    </div>
  );
}
