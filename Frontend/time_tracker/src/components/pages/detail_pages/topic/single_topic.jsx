import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RequestService from "../../../../services/requests/request_service.js";
import { APIEndpoints, frontURLs } from "../../../enums.tsx";
import Items from "../../../ui/items_section/items_section.tsx";
import UpdateItem from "../../../ui/update_item/update_item.tsx";
import NotFound from "../../notfound/notfound.jsx";
import "./single_topic.css"

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
            APIEndpoints.topic_read_by_title,
            title,
            setFetching,
            setItem,
            setTitle,
            setDescription
        )
        request_service.read_items(
            setPeriods,
            APIEndpoints.period_read,
            `offset=${offset}&limit=${limit}&topic_title=${title}`
        )
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