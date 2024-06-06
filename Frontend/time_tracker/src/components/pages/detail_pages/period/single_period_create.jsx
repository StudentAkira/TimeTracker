import { useEffect, useState } from "react";
import "./single_period_create.css"
import { APIEndpoints, frontURLs } from "../../../enums.tsx";
import RequestService from "../../../../services/requests/request_service.js";
import ChooseRelatedItems from "../../../ui/choose_related_items/choose_related_items.tsx";
import SearchBar from "../../../ui/search_bar/search_bar.tsx";
import validate_field_length from "../../../utils/validation_utio.tsx"

function SinglePeriodCreate(){

    const [starting, setStarting] = useState(false);
    const [items, setItems] = useState([]);
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(49);

    const start_period = async () => {
        const myHeaders = new Headers();
        myHeaders.append("accept", "application/json");
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
        "topic_title": document.getElementById("related_topic_title_field").value,
        "title": document.getElementById("period_title").value,
        "description": document.getElementById("period_description").value
        });

        console.log(raw)

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
            console.log(response_json);
            alert(response_json["detail"]["error"])
            setStarting(false)
            return
          }
        setStarting(false);
        window.location.href = "/period"
    }

    const request_service = new RequestService()

    const is_auth = () => {
        if(localStorage.getItem("user_data") == null){
            return false;
        }
        return true 
    }

    useEffect(() => {
        if(!is_auth()){
            window.location.href = frontURLs.login
            return;
        }
        request_service.read_items(
            setItems, 
            APIEndpoints.topic_read,
            `offset=${offset}&limit=${limit}`
            )
    }, []);

    if(starting){
        return (
            <h1>Starting...</h1>
        );
    }

    return (
        <div className="period_create_wrapper">
            <div className="period_data_wrapper">
                <div className="period_topic">
                    <div className="period_title_topic_wrapper">
                        <div className="period_title_wrapper">
                            <h1 className="period_title">title :: </h1><input type="text" id="period_title" className="period_title_field"/>
                        </div>
                        <div className="period_description_wrapper">
                            <h1 className="period_description">description :: </h1>
                            <textarea name="period_description" id="period_description" className="period_description_field" cols="30" rows="10">

                            </textarea>
                        </div>
                        <div className="period_timer_wrapper">
                            <div className="buttons_wrapper">
                                <button className="start_button" onClick={()=>{
                                    if(
                                        !validate_field_length(document.getElementById("related_topic_title_field").value) ||
                                        !validate_field_length(document.getElementById("period_title").value) ||
                                        !validate_field_length(document.getElementById("period_description").value)
                                        ){
                                            return;
                                        }
                                    setStarting(true);
                                    start_period();

                                }}>
                                    start
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="topic_of_period">
                        <div className="topic_title_wrapper">
                            <h1 className="related_topic_title">topic :: </h1><input type="text" id="related_topic_title_field" className="related_topic_title_field"/>
                        </div>
                        <SearchBar 
                            service={request_service} 
                            setItems={setItems}
                            path={APIEndpoints.topic_read_by_title_starts_with}
                            query_params={`offset=${offset}&limit=${limit}`}
                        />
                        <div className="topic_to_start_period_wrapper">
                        {
                            items.map(
                            (item, index) => (
                                    <div className="choose_item_wrapper" key={index}>
                                        <div className="item">
                                            <div className="item_title">
                                                {item.title}
                                            </div>
                                            <hr />
                                        </div>
                                    </div>
                                )
                            )
                        }
                        </div>
                    </div>
                </div>
                
                
            </div>
            
        </div>
    );
}

export default SinglePeriodCreate;