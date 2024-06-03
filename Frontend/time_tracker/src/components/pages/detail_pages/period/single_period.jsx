import { useEffect, useState } from "react";
import SinglePeriodCreate from "./single_period_create";
import SinglePeriodStarted from "./single_period_started";
import { APIEndpoints } from "../../../enums.tsx";

function SinglePeriod(){

    const [period, setPeriod] = useState()
    const [fetching, setFetching] = useState(true)


    const get_active_period = async () => {
        const myHeaders = new Headers();
        myHeaders.append("accept", "application/json");
        
        const requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
          credentials: "include"
        };
        
        const response = await fetch(APIEndpoints.get_active_period, requestOptions)
        const response_json = await response.json()

        if(response_json == null){
            setPeriod(response_json)
            setFetching(false)
            return
        }
        if ("detail" in response_json){
            setFetching(false)
            alert(response_json["detail"]["error"])
            return
          }
        setPeriod(response_json)
        setFetching(false)
    }

    useEffect(() => {
        get_active_period()
    }, []);

    if(fetching){
        return (
            <h1>Fetching...</h1>
        );
    }

    return (
        <>{period == null ? <SinglePeriodCreate /> : <SinglePeriodStarted period={period}/>}</>
    );
}

export default SinglePeriod;