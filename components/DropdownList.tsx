'use client'

import Image from "@/node_modules/next/image";
import { useState } from "react"

const DropdownList = () => {
    const [isOpen,setIsOpen ] = useState(false);
  return (
    <div className="relative">
        <div className="curser-pointer" onClick={()=> setIsOpen(!isOpen)}>
            <div className="filter-trigger">
                <figure>
                    <Image src="/assets/icons/hamburger.svg" alt="menu" width={14}  height={14}  />
                    Most recent
                </figure>
                <Image src="/assets/icons/arrow-down.svg" alt='arrow-down' width={20} height={20}  />

            </div>
        </div>
        {isOpen &&(
            <ul className="dropdown">
                {['Most Recent','Most Liked'].map((option)=>(
                    <li key={option} className="list-item">
                        {option}
                    </li>
                ))}
            </ul>
        )}
    </div>
  )
}

export default DropdownList