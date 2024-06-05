import { useState } from "react";

function Child(){

    const [count, setCount] = useState(0)

    return (
        <>
            {count} <button onClick={()=>{
                setCount((count)=>count + 1)
                setCount((count)=>count + 1)
                }}>child</button>
        </>
    );
}

export default Child;