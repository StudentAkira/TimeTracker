import React, { useEffect, useState } from 'react';
import { APIEndpoints, frontURLs } from "../../enums.tsx";
import Card from '../../ui/card/card.jsx';
import "./topic.css"
import RequestService from '../../../services/requests/request_service.js';
import NewItemForm from '../../ui/new_item_form/new_item_form.jsx';
import SearchBar from '../../ui/search_bar/search_bar.jsx';
import Items from '../../ui/items_section/items_section.jsx';


function Topic() {


    const [items, setItems] = useState([]);
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(49);

    const request_service = new RequestService()

    const read_items = async () => {
        
        const myHeaders = new Headers();
        myHeaders.append("accept", "application/json");

        const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
        credentials: "include"
        };

        const response = await fetch(`${APIEndpoints.topic_read}?offset=${offset}&limit=${limit}`, requestOptions)
        const response_json = await response.json()

        if ("detail" in response_json){
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
        read_items()
    }, []);

    const create_topic = async () => {

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

        const response = await fetch(APIEndpoints.topic_create, requestOptions);
        const response_json = await response.json();
        if ("detail" in response_json){
            alert(response_json["detail"]["error"])
            return
          }
        alert(response_json["message"]);
        read_items();
    }

  return (
        <div className="topic">
           <NewItemForm 
                    service={request_service} 
                    setItems={setItems}  
                    offset={offset} 
                    limit={limit} 
                    create_path={APIEndpoints.topic_create}
                    read_path={APIEndpoints.topic_read}
                />

            <SearchBar 
                service={request_service}
                setItems={setItems}
                offset={offset}
                limit={limit}
                path={APIEndpoints.topic_read_by_title_starts_with}
            />
            
            <Items 
                items={items}
                item_link={frontURLs.topic}
            />
        </div>
  );
}

export default Topic;
