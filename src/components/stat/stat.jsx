import React from 'react'
import "./stat.css"

export default function Stat({children, title, stat}) {
  return (
    <div className="stat">
        <h5>{title}</h5>
        {children}
        <p>{stat}</p>
    </div>
  )
}
