import { useEffect, useState } from "react";
import MyComponent from "../components/ui/items_section/items_section.jsx";

function Test(){

    // const [now, setNow] = useState(Date.now())

    // useEffect(() => {
    //     const i =setInterval(()=>{

    //         setNow(Date.now())

    //     }, 1000)

    //     return () => {
    //         clearInterval(i)
    //     }
    // }, [now]);

    return (
        <>
            <MyComponent />
        </>
    );
}

export default Test;