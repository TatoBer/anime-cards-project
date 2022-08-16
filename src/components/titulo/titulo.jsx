import React from 'react'
import "./titulo.css"

export default function Titulo({children, svg}) {
  return (
    <div className='titulo'>
    <h1>{children}</h1>
    {svg}
    </div>
  )
}
