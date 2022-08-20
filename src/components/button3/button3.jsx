import React from 'react'
import "./button3.css"

export default function Button3({children, click}) {
  return (
    <button onClick={click} className='button-3 white-box'>{children}</button>
  )
}
