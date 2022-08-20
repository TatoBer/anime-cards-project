import React from 'react'
import "./page-switch.css"
import { IoIosArrowDropleftCircle, IoIosArrowDropleft, IoIosArrowDropright, IoIosArrowDroprightCircle } from 'react-icons/io';

export default function PageSwitch({page, pageLength, setPage}) {

    const firstPage = ()=>{
        setPage(1)
    }

    const lastPage = ()=>{
        setPage(pageLength)
    }

    const prevPage = ()=>{
        if (!(page === 1)) {
            setPage(page-1)
        }
    }

    const nextPage = ()=>{
        if (!(page === pageLength)) {
            setPage(page+1)
        }
    }

  return (
    <div className="page-switch white-box">
        <IoIosArrowDropleftCircle onClick={firstPage} className={page === 1 ? "disabled" : ""} />
        <IoIosArrowDropleft onClick={prevPage} className={page === 1 ? "disabled" : ""} />
        <span>PAGE {page}/{pageLength}</span>
        <IoIosArrowDropright onClick={nextPage} className={page === pageLength ? "disabled" : ""} />
        <IoIosArrowDroprightCircle onClick={lastPage} className={page === pageLength ? "disabled" : ""} />
    </div>
  )
}
