import { useEffect, useRef, useState } from "react";
import "./test.css"

function Test(){

    const itemsRef = useRef(null)

    // const [isMouseDown, setIsMouseDown] = useState(false)

    // const [startX, setStartX] = useState(0)
    // const [scrollLeft, setScrollLeft] = useState(0)

    // const [startY, setStartY] = useState(0)
    // const [scrollTop, setScrollTop] = useState(0)

    // const [scrollZ, setScrollZ] = useState(1)

    // const [prevWidth, setPrevWidth] = useState(0)
    // const [prevHeight, setPrevHight] = useState(0)



    const [test, setTest] = useState(1)

    const [scale, setScale] = useState(1)
    const [panning, setPanning] = useState(false)
    const [pointX, setPointX] = useState(0)
    const [pointY, setPointY] = useState(0)
    const [start, setStart] = useState({x:0, y:0})

    const [zoompointX, setZoomPointX] = useState(0)
    const [zoompointY, setZoomPointY] = useState(0)

    const [transition, setTransition] = useState(Transition.None)

    const setTransform = ()=> {
        // itemsRef.current.style.transform = `translate(${pointX}px, ${pointY}px) scale(${scale})`
    }

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
        // setIsMouseDown(true)
        // setStartX(e.pageX)
        // setStartY(e.pageY)
        // setScrollLeft(itemsRef.current.scrollLeft)
        // setScrollTop(itemsRef.current.scrollTop)
        // console.log("Down");

        setStart({x: e.clientX - pointX, y: e.clientY - pointY})
        setPanning(true)

    }

    const handleMouseLeave = (e) => {
        // setIsMouseDown(false)

        setPanning(false)

    }

    const handleMouseUp = (e) => {
        // setIsMouseDown(false)
        // console.log("Up");

        setPanning(false)
    }

    const handleMouseMove = (e) => {
        // if(!isMouseDown)return;
        // e.preventDefault()
        // const x = e.pageX
        // const y = e.pageY
        // const walkX = (x - startX)
        // const walkY = (y - startY)
        // itemsRef.current.scrollLeft = scrollLeft - walkX
        // itemsRef.current.scrollTop = scrollTop - walkY

        if(!panning)return

        setTransition(Transition.None)

        let new_pointX = e.clientX - start.x;
        let new_pointY = e.clientY - start.y;

        // if (
        //     new_pointX > document.getElementById("field").clientWidth * 0.95
        // )new_pointX = document.getElementById("field").clientWidth * 0.95

        // if (
        //     new_pointY > document.getElementById("field").clientHeight * 0.4
        // )new_pointY = document.getElementById("field").clientHeight * 0.4


        // if (
        //     new_pointX < -document.getElementById("field").clientWidth * 0.45
        // )new_pointX = -document.getElementById("field").clientWidth * 0.45

        // if (
        //     new_pointY < -document.getElementById("field").clientHeight * 0.275
        // )new_pointY = -document.getElementById("field").clientHeight * 0.275


        setPointX((pointX) => new_pointX)
        setPointY((pointY) => new_pointY)


    }

    
   const handleWheel = (e)=>{
        if(panning)return

        setTransition(Transition.Transform)

        let xs = (e.clientX - pointX) / scale;
        let ys = (e.clientY - pointY) / scale;
        let new_scale = (-e.deltaY > 0) ? (scale * 1.2) : (scale / 1.2);

        if(new_scale > 5) new_scale = 5;
        if(new_scale < 0.3) new_scale = 0.3;


        setPointX((pointX)=> { 
            return e.clientX - xs * new_scale;
        });
        setPointY((pointY)=> {
            return e.clientY - ys * new_scale;
        });
        setScale((scale)=> new_scale)


   }

    return (
        <>
        <div className="wrapper">
            <div className="field-wrapper" id="field-wrapper"
                    onMouseDown={handleMouseDown}
                    onMouseLeave={handleMouseLeave}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                    onWheel={handleWheel}
                    style={{width: `${Size.width}px`, height: `${Size.height}px`}}
                >
                <div className="field" id="field"
                    ref={itemsRef}
                    style={{
                        transform: `translate(${pointX}px, ${pointY}px) scale(${scale})`, 
                        transition: transition
                    }}
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

const Transition  = {
    None: "none",
    Transform: "transform 0.2s linear"  
} 

const Size = {
    width: 1000,
    height: 900
}