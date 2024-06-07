import { useEffect, useRef, useState } from "react";
import "./test.css"

function Test(){

    const itemsRef = useRef(null)

    const [isMouseDown, setIsMouseDown] = useState(false)

    const [startX, setStartX] = useState(0)
    const [scrollLeft, setScrollLeft] = useState(0)

    const [startY, setStartY] = useState(0)
    const [scrollTop, setScrollTop] = useState(0)

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
        setStartX(e.pageX - itemsRef.current.offsetLeft)
        setStartY(e.pageY - itemsRef.current.offsetTop)
        setScrollLeft(itemsRef.current.scrollLeft)
        setScrollTop(itemsRef.current.scrollTop)
        console.log("Down");
    }

    const handleMouseLeave = (e) => {
        setIsMouseDown(false)
        console.log("Leave");
    }

    const handleMouseUp = (e) => {
        setIsMouseDown(false)
        console.log("Up");
    }

    const handleMouseMove = (e) => {
        if(!isMouseDown)return;
        e.preventDefault()
        const x = e.pageX - itemsRef.current.offsetLeft
        const y = e.pageY - itemsRef.current.offsetTop
        const walkX = (x - startX)
        const walkY = (y - startY)
        itemsRef.current.scrollLeft = scrollLeft - walkX
        itemsRef.current.scrollTop = scrollTop - walkY
    }

    // console.log("rerender", itemsRef.current.scrollLeft, itemsRef.current.offsetLeft);

    return (
        <>
        <div className="wrapper">
            <div className="field-wrapper"
                    ref={itemsRef}
                    onMouseDown={handleMouseDown}
                    onMouseLeave={handleMouseLeave}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                >
                <div className="field" id="field"
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