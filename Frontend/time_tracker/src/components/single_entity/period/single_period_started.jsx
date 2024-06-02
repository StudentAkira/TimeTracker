import { useEffect, useState } from "react";
import "./single_period_started.css"
import { APIEndpoints } from "../../enums.tsx";


function SinglePeriodStarted(params){
  
    const [now, setNow] =  useState()

    useEffect(() => {
      const i =setInterval(()=>{

          setNow(Date.now())

      }, 1000)

      return () => {
          clearInterval(i)
      }
  }, [now]);

  const finish_period = async () => {
    const myHeaders = new Headers();
    myHeaders.append("accept", "application/json");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
      credentials: "include"
    };

    const response = await fetch(APIEndpoints.period_finish, requestOptions)
    const response_json = await response.json()

    if ("detail" in response_json){
      alert(response_json["detail"]["error"])
      return
    }
    window.location.href = "/period"

  }

  const timestamp =  Math.ceil((Date.now() - (params.period.start_time * 1000)) / 1000);
  console.log(timestamp);
  const seconds = Math.round(timestamp) % 60;
  const minutes = Math.round(timestamp / 60) % 60;
  const hours = Math.round(minutes / 60) % 24;
  const days = Math.round(hours / 24) / 31;
  
  

    return (
      <div className="period_wrapper">

        <div className="period_data_wrapper">
          <h1 className="period_title">{params.period.title}</h1>
          <div className="period_description">{params.period.description}</div>
          <div className="finish_button_wrapper">
            <button className="finish_button" onClick={finish_period}>
              FINISH
            </button>
          </div>
            
        </div>
        
        <div className="timer">
          <h1 className="timer">
          </h1>
          {/* topic started at :: {start_time_hours} {start_time_minute}<br />
          time now :: {hours_now} {minutes_now}<br /> */}
          {hours}h {minutes}m {seconds}s
        </div>
      </div>
    );
}

export default SinglePeriodStarted;