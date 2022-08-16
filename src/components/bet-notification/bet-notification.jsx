import { doc } from 'firebase/firestore'
import React from 'react'
import "./bet-notification.css"

export default function BetNotification({bet, win}) {
  return (
    <span className={`bet-notification`}>
      {!win ? "-" : "+" }${bet}
    </span>
  )
}
