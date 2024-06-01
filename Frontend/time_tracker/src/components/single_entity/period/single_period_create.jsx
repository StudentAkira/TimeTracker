import { useState } from "react";
import "./single_period_create.css"


function SinglePeriodCreate(){

    return (
        <div className="period_create_wrapper">
            <div className="period_data_wrapper">
                <div className="period_title_wrapper">
                    <h1 className="period_title">title :: </h1><input type="text" />
                </div>
                <div className="period_description_wrapper">
                    <h1 className="period_description">description :: </h1>
                    <textarea name="period_description" id="period_description" cols="30" rows="10">

                    </textarea>
                </div>
            </div>
            <div className="period_timer_wrapper">
                <h1 className="time_spent">time spent :: {}</h1>
                <div className="buttons_wrapper">
                    <button className="start_button">
                        start
                    </button>
                    <button className="finish_button">
                        finish
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SinglePeriodCreate;