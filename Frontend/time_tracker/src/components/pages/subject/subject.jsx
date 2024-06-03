import React, { useEffect, useState } from 'react';
import { APIEndpoints, frontURLs } from "../../enums.tsx";
import Card from '../../ui/card/card.jsx';
import "./subject.css"
import NewItemForm from '../../ui/new_item_form/new_item_form.jsx';
import RequestService from '../../../services/requests/request_service.js';
import Items from '../../ui/items_section/items_section.jsx';


function Subject() {


    const [items, setItems] = useState([]);
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(49);

    const request_service = new RequestService()

    const get_items = async () => {
        const myHeaders = new Headers();
        myHeaders.append("accept", "application/json");

        const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
        credentials: "include"
        };

        const response = await fetch(`${APIEndpoints.subject_read}?offset=${offset}&limit=${limit}`, requestOptions)
        const response_json = await response.json()

        if ("detail" in response_json){
            alert(response_json)
            return
          }
        setItems(response_json);
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
        get_items()
    }, []);

    const create_subject = async () => {

        const myHeaders = new Headers();
        myHeaders.append("accept", "application/json");
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
        "title": document.getElementById("title").value,
        "description": document.getElementById("description").value,
        });

        const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
        credentials: "include"
        };

        const response = await fetch(APIEndpoints.subject_create, requestOptions);
        const response_json = await response.json();
        if ("detail" in response_json){
            alert(response_json["detail"]["error"])
            return
          }
        alert(response_json["message"]);
        get_items()
    }

  return (
        <div className="subject">
            <NewItemForm 
                service={request_service} 
                setItems={setItems}  
                offset={offset} 
                limit={limit} 
                create_path={APIEndpoints.subject_create}
                read_path={APIEndpoints.subject_read}
            />

            <Items 
                items={items}
                item_link={frontURLs.subject}
            />


        </div>
  );
}

export default Subject;
