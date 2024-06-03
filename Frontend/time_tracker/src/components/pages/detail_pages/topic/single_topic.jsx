import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RequestService from "../../../../services/requests/request_service.js";
import { APIEndpoints, frontURLs } from "../../../enums.tsx";
import Items from "../../../ui/items_section/items_section.tsx";
import UpdateItem from "../../../ui/update_item/update_item.tsx";
import NotFound from "../../notfound/notfound.jsx";

function SingleTopic(){

    const params = useParams()

    const [item, setItem] = useState(null)
    const [fetching, setFetching] = useState(true)
    const [title, setTitle] = useState(params.title);
    const [description, setDescription] = useState(null);
    const [periods, setPeriods] = useState([])
    const [offset, setOffset] = useState(0)
    const [limit, setLimit] = useState(49)

    const request_service = new RequestService();

    let new_title = null;
    let new_description = null;

    const get_item = async () => {
        const myHeaders = new Headers();
        myHeaders.append("accept", "application/json");
    
        const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
        credentials: "include"
        };
    
        const response =  await fetch(`${APIEndpoints.topic_read_by_title}?title=${params.title}`, requestOptions)
        const response_json = await response.json()

        if (response_json == null){
            setFetching(false)
            return
        }
        if ("detail" in response_json){
            setFetching(false)
            setItem(null)
            return
          }
        
        setItem(response_json)
        setFetching(false)
        setTitle(response_json["title"])
        setDescription(response_json["description"])

    }

    const update_item = async () => {
        const myHeaders = new Headers();
        myHeaders.append("accept", "application/json");
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
        "title": title,
        "new_title": new_title == null ? null : new_title,
        "new_description": new_description == null ? null : new_description,
        });

        const requestOptions = {
        method: "PATCH",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
        credentials: "include"
        };

        const response = await fetch(APIEndpoints.topic_update, requestOptions)
        const response_json = await response.json()

        if ("detail" in response_json){
            alert(response_json["detail"]["error"]);
            return
          }
        alert('Topic was updated');
        window.location.href = new_title == null ? title : new_title
    }

    const delete_note = async () => {
        const myHeaders = new Headers();
        myHeaders.append("accept", "application/json");
        myHeaders.append("Content-Type", "application/json");

        const requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        redirect: "follow",
        credentials: "include"
        };

        const response = await fetch(APIEndpoints.topic_delete + `/?title=${title}`, requestOptions)
        const response_json = await response.json()

        if ("detail" in response_json){
            alert(response_json["detail"]["error"]);
            return
          }
        alert('Topic was deleted');
        window.location.href = frontURLs.topic
    }

    const get_periods = async () => {
        const myHeaders = new Headers();
        myHeaders.append("accept", "application/json");

        const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
        credentials: "include"
        };

        const response = await fetch(`${APIEndpoints.period_read}?offset=${offset}&limit=${limit}&topic_title=${params.title}`, requestOptions)
        const response_json = await response.json()

        if ("detail" in response_json){
            return
          }
        setPeriods(response_json);
    }

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
        get_item()
        request_service.read_items(
            setPeriods,
            APIEndpoints.period_read,
            `offset=${offset}&limit=${limit}&topic_title=${title}`
        )
        get_periods()
    }, []);

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
        <div className="topic_wrapper">
            <UpdateItem 
                service={request_service}
                title={title}
                description={description}
                update_path={APIEndpoints.topic_update}
                delete_path={APIEndpoints.topic_delete}
                redirect_path={frontURLs.topic}
                update_alert_message="Topic updated"
                delete_alert_message="Topic deleted"

           />
            <Items 
                    items={periods}
                    item_link={frontURLs.period}
                />
        </div>
            
    );
}

export default SingleTopic;