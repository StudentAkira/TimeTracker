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
  const seconds = Math.floor(timestamp) % 60;
  const minutes = Math.floor(timestamp / 60) % 60;
  const hours = Math.floor(minutes / 60) % 24;
  const days = Math.floor(hours / 24) / 31;
  
  const test = Math.ceil((Date.now() - (params.period.start_time * 1000)) / 1000)
  console.log("seconds :: ", Math.floor(timestamp) % 60);
  console.log("minutes :: ", Math.floor(timestamp / 60) % 60);
  console.log("hours :: ", Math.floor(minutes / 60) % 24);

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
          {hours}h {minutes}m {seconds}s
        </div>
      </div>
    );
}

export default SinglePeriodStarted;