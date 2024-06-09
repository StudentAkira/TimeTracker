import { useEffect, useRef, useState } from "react";
import "./test.css"

function Test(){

    const itemsRef = useRef(null)

    const [isMouseDown, setIsMouseDown] = useState(false)

    const [startX, setStartX] = useState(0)
    const [scrollLeft, setScrollLeft] = useState(0)

    const [startY, setStartY] = useState(0)
    const [scrollTop, setScrollTop] = useState(0)

    const [scrollZ, setScrollZ] = useState(100)

    const [prevWidth, setPrevWidth] = useState(0)
    const [prevHeight, setPrevHight] = useState(0)

    const items = [
        {team_name : "team"},
        {team_name : "team"},
        {team_name : "team"},
        {team_name : "team"},
        {team_name : "team"},
        {team_name : "team"},
        {team_name : "team"},
        {team_name : "team"},
        {team_name : "team"},
        {team_name : "team"},
        {team_name : "team"},
        {team_name : "team"},
        {team_name : "team"},
        {team_name : "team"},
        {team_name : "team"},
        {team_name : "team"},
        {team_name : "team"},
        {team_name : "team"},
        {team_name : "team"},
        {team_name : "team"},
        {team_name : "team"},
        {team_name : "team"},
        {team_name : "team"},
        {team_name : "team"},
        {team_name : "team"},
        {team_name : "team"},
        {team_name : "team"},
        {team_name : "team"},
        {team_name : "team"},
        {team_name : "team"},
        {team_name : "team"},
        {team_name : "team"},
        {team_name : "team"},
        {team_name : "team"},
        {team_name : "team"},
        {team_name : "team"},
        {team_name : "team"},
        {team_name : "team"},
        {team_name : "team"},
        {team_name : "team"},
        {team_name : "team"},
        {team_name : "team"},
        {team_name : "team"},
        {team_name : "team"},
        {team_name : "team"},
        {team_name : "team"},
        {team_name : "team"},
        {team_name : "team"},
        {team_name : "team"},
        {team_name : "team"},
        {team_name : "team"},
        {team_name : "team"},
        {team_name : "team"},
        {team_name : "team"},
        {team_name : "team"},
        {team_name : "team"},
        {team_name : "team"},
        {team_name : "team"},
        {team_name : "team"},
        {team_name : "team"},
        {team_name : "team"},
        {team_name : "team"},
        {team_name : "team"},
        {team_name : "team"},
    ]

    const handleMouseDown = (e) => {
        setIsMouseDown(true)
        setStartX(e.pageX)
        setStartY(e.pageY)
        setScrollLeft(itemsRef.current.scrollLeft)
        setScrollTop(itemsRef.current.scrollTop)
        // console.log("Down");
    }

    const handleMouseLeave = (e) => {
        setIsMouseDown(false)
        // console.log("Leave");
    }

    const handleMouseUp = (e) => {
        setIsMouseDown(false)
        // console.log("Up");
    }

    const handleMouseMove = (e) => {
        if(!isMouseDown)return;
        e.preventDefault()
        const x = e.pageX
        const y = e.pageY
        const walkX = (x - startX)
        const walkY = (y - startY)
        itemsRef.current.scrollLeft = scrollLeft - walkX
        itemsRef.current.scrollTop = scrollTop - walkY
    }


   const handleWheel = (e)=>{

        setPrevWidth((prevWidth)=>document.getElementById("field").clientWidth)
        setPrevHight((prevHeight)=>document.getElementById("field").clientHeight)

        setScrollZ((scrollZ)=> Math.max(5, scrollZ - e.deltaY / 25))
        const x = e.pageX - e.target.offsetLeft
        const y = e.pageY - e.target.offsetTop

        document.getElementById("field").style.transformOrigin = `${x}px ${y}px`

   }

    return (
        <>
        <div className="wrapper">
            <div className="field-wrapper" id="field-wrapper"
                    ref={itemsRef}
                    onMouseDown={handleMouseDown}
                    onMouseLeave={handleMouseLeave}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                    onWheel={handleWheel}
                >
                <div className="field" id="field"
                        // style={{zoom: `${scrollZ}%`}}
                    >
                    {
                        items.map((item, index)=>{
                            return (
                                <h1 className="team-wrapper" key={index}>
                                    {item.team_name} {index}
                                </h1>
                            );
                        })
                    }
                </div>
            </div>
        </div>
        </>
        
    );
}

export default Test;