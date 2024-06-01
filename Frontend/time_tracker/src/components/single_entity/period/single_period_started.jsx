import "./single_period_started.css"


function SinglePeriodStarted(params){
  
    return (
      <div className="period_wrapper">

        <div className="period_data_wrapper">
          <h1 className="period_title">{params.period.title}</h1>
          <div className="period_description">{params.period.description}</div>
          <div className="finish_button_wrapper">
            <button className="finish_button">
              FINISH
            </button>
          </div>
            {/* {params.period} */}
        </div>
        
        <div className="timer">
          <h1 className="timer">
          </h1>
        </div>
      </div>
    );
}

export default SinglePeriodStarted;