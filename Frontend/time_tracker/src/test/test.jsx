import { useEffect, useState } from "react";
import Child from "./some_jsx.jsx"

function Test(){

    let title = "123"
    let new_title = "new_123"
    let new_description = "new_descr_123"

    let a = {}

    const raw = JSON.stringify({
        "title": title,
        "new_title": new_title,
        "new_description": new_description,
        });


    console.log(...raw);

    return (
        <>
        </>
    );
}

export default Test;