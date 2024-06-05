import { useEffect, useState } from "react";
import Child from "./some_jsx.jsx"

function Test(){

    const [count, setCount] = useState(0)

    return (
        <>
            {count} 
            <button onClick={()=>{
                setCount((count)=>count + 1)
                setCount((count)=>count + 1)
                }}>append</button>
            <Child />
        </>
    );
}

export default Test;