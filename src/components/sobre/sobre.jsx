import React from 'react'
import "./sobre.css"
import { FaQuestionCircle } from 'react-icons/fa';
import { AiOutlineLoading } from "react-icons/ai";

export default function Sobre({bg, children, price, dis, click, buton}) {

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

  return (
    <div className='sobre' style={{background: bg}}>
        <div>
            { buton ?
            <button price={price} onClick={click} disabled={!dis} style={{background: bg}}>${numberWithCommas(Number(price))}</button>
            : 
            <AiOutlineLoading className='loading' />
            }
            <FaQuestionCircle className='info' />
        </div>
        <span>
            <span>
                {children}
            </span>
        </span>
    </div>
  )
}
