import React from 'react'
import "./coin.css"

export default function Coin({children, className, onClick}) {
  return (
    <div className={`coin ${className}`} onClick={onClick}>
        <span>
            <span>
                {children}
            </span>
        </span>
    </div>
  )
}
