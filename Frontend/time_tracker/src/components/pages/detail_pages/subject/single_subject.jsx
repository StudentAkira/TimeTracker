import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RequestService from "../../../../services/requests/request_service.js";
import { APIEndpoints, frontURLs } from "../../../enums.tsx";
import Items from "../../../ui/items_section/items_section.tsx";
import UpdateItem from "../../../ui/update_item/update_item.tsx";
import NotFound from "../../notfound/notfound.jsx";
import "./single_subject.css";
import ChooseRelatedItems from "../../../ui/choose_related_items/choose_related_items.tsx";

function SingleSubject(){

    let params = useParams()

    const [item, setItem] = useState(null)
    const [fetching, setFetching] = useState(true)
    const [title, setTitle] = useState(params.title);
    const [description, setDescription] = useState(null);
    const [topics, setTopics] = useState([])

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
        request_service.get_item(
            APIEndpoints.subject_read_by_title,
            title,
            setFetching,
            setItem,
            setTitle,
            setDescription
        )
    }, []);

    const append_topic_to_subject = async () => {
        const myHeaders = new Headers();
        myHeaders.append("accept", "application/json");
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
        "topic_title": document.getElementById("topic_title_to_append").value,
        "subject_title": title
        });

        const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
        credentials: "include"
        };

        const response = await fetch(APIEndpoints.append_topic_to_subject, requestOptions)
        const response_json = await response.json()
        if ("detail" in response_json){
            alert(response_json["detail"]["error"]);
            return
          }
        
    }

    const remove_topic_from_subject = async () => {
        const myHeaders = new Headers();
        myHeaders.append("accept", "application/json");
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "topic_title": document.getElementById("topic_title_to_remove").value,
            "subject_title": title
        });

        const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
        credentials: "include"
        };

        const response = await fetch(APIEndpoints.remove_topic_from_subject, requestOptions)
        const response_json = await response.json()
        if ("detail" in response_json){
            alert(response_json["detail"]["error"]);
            return
          }
    }
    if (fetching) {
        return (
            <>
            
            </>
        );
    }

    if (!fetching && item == null) {
        return (
            <NotFound />
        )
    }

    return (
        <>
            <div className="subject_edit">
                <UpdateItem 
                    service={request_service}
                    title={title}
                    description={description}
                    update_path={APIEndpoints.subject_update}
                    delete_path={APIEndpoints.subject_delete}
                    redirect_path={frontURLs.subject}
                    update_alert_message="Subject updated"
                    delete_alert_message="Subject deleted"

                />
            
                <div className="topic_to_subject_wrapper">
                    <div className="topic_append">
                        <div className="topic_additional_label">Topics not related to subject</div>
                        <div className="edit_title_field_button">
                            <div className="edit_title_field_label">topic title :: </div><input type="text" id="topic_title_to_append"/>
                            <button onClick={() => {
                                    setFetching(true)
                                    append_topic_to_subject()
                                    request_service.get_item(
                                        APIEndpoints.subject_read_by_title,
                                        title,
                                        setFetching,
                                        setItem,
                                        setTitle,
                                        setDescription
                                    )
                                }}>
                                +
                            </button>
                        </div>
                        <ChooseRelatedItems
                            service={request_service}
                            query_params={`subject_title=${params.title}`}
                            path={APIEndpoints.subject_read_not_related_topics_by_title_starts_with}
                        />
                    </div>
                    <div className="topic_remove">
                        <div className="topic_additional_label">Topics related to subject</div>
                        <div className="edit_title_field_button">
                            <div className="edit_title_field_label">topic title ::</div> <input type="text" id="topic_title_to_remove"/>
                            <button onClick={() => {
                                    setFetching(true)
                                    remove_topic_from_subject()
                                    request_service.get_item(
                                        APIEndpoints.subject_read_by_title,
                                        title,
                                        setFetching,
                                        setItem,
                                        setTitle,
                                        setDescription
                                    )
                                }}>
                                -
                            </button>
                        </div>
                        <ChooseRelatedItems
                            service={request_service}
                            query_params={`subject_title=${params.title}`}
                            path={APIEndpoints.subject_read_related_topics_by_title_starts_with}
                        />
                    </div>
                </div>
            </div>

                <Items 
                    items={item.topics}
                    item_link={frontURLs.topic}
                />
        </>
    );
}

export default SingleSubject;