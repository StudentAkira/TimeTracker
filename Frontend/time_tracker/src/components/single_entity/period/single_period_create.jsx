import { useState } from "react";
import "./single_period_create.css"
import { APIEndpoints } from "../../enums.tsx";


function SinglePeriodCreate(){

    const [starting, setStarting] = useState(false);

    const start_period = async () => {
        const myHeaders = new Headers();
        myHeaders.append("accept", "application/json");
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
        "topic_title": document.getElementById("related_topic_title").value,
        "title": document.getElementById("period_title").value,
        "description": document.getElementById("period_description").value
        });

        const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
        credentials: "include"
        };

        const response = await fetch(APIEndpoints.period_create, requestOptions)
        const response_json = await response.json()

        if ("detail" in response_json){
            alert(response_json["detail"]["error"])
            setStarting(false)
            return
          }
        setStarting(false);
        window.location.href = "/period"
    }

    if(starting){
        return (
            <h1>Starting...</h1>
        );
    }

    return (
        <div className="period_create_wrapper">
            <div className="period_data_wrapper">
                <div className="period_title_wrapper">
                    <h1 className="period_title">title :: </h1><input type="text" id="period_title"/>
                    <h1 className="related_topic_title">topic :: </h1><input type="text" id="related_topic_title"/>
                </div>
                <div className="period_description_wrapper">
                    <h1 className="period_description">description :: </h1>
                    <textarea name="period_description" id="period_description" cols="30" rows="10">

                    </textarea>
                </div>
            </div>
            <div className="period_timer_wrapper">
                <div className="buttons_wrapper">
                    <button className="start_button" onClick={()=>{
                        setStarting(true);
                        start_period();
                    }}>
                        start
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SinglePeriodCreate;