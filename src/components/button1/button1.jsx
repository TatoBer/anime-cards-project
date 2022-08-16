import React from 'react'
import "./button1.css"

export default function Button1({children, onClick, className}) {
  return (
    <button onClick={onClick} className={`button1 bg-main ${className}`}>
        {children}
    </button>
  )
}
