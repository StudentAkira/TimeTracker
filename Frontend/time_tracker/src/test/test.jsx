import { useEffect, useState } from "react";

function Test(){

    const [now, setNow] = useState(Date.now())

    useEffect(() => {
        const i =setInterval(()=>{

            setNow(Date.now())

        }, 1000)

        return () => {
            clearInterval(i)
        }
    }, [now]);

    const timestamp = Date.now();
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return (
        <>
            <h1>{now}</h1>
        </>
    );
}

export default Test;