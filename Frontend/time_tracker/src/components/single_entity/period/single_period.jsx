function SinglePeriod(){
    return (
        <div className="wrapper">
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
        </div>
    );
}

export default SinglePeriod;