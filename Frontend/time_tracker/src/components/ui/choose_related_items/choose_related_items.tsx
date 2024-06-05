import React, { useEffect, useState } from "react";
import "./choose_related_items.css"
import { choose_relate_items_props } from "../../context/props";
import RequestService from "../../../services/requests/request_service";
import { APIEndpoints, frontURLs } from "../../enums";


function ChooseRelatedItems(props: choose_relate_items_props){

    const [items, setItems] = useState(null)

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

        request_service.read_related_items(
            request_service,
            APIEndpoints.subject_read_not_related_topics,
            `?offset=${offset}&limit=${limit}`
            )
    }, []);

    return (
        <div className="append_item_wrapper">
            {props.item_title_label} <input type="text" id="topic_title_to_append"/>

        </div>
    );
}

export default ChooseRelatedItems;