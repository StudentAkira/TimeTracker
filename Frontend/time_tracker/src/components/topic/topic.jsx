import React, { useEffect, useState } from 'react';
import { APIEndpoints, frontURLs } from '../enums.tsx';
import Card from '../card/card.jsx';
import "./topic.css"


function Topic() {


    const [items, setItems] = useState([]);
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(49);

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
        read_items()
    }, []);

    const create_topic = async () => {

        const myHeaders = new Headers();
        myHeaders.append("accept", "application/json");
        myHeaders.append("Content-Type", "application/json");

        let d = new Date();
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
    }

  return (
    <div className="topic">
        <div className="topics">
            {
                items.map(
                    (item) => (
                        <div className="topic_wrapper">
                            <Card title={item.title} content={item.description} additional_data={`${String(item.total_hours).substring(0, 5)} hours`}/>
                        </div>
                    )
                )
            }
        </div>

        <div className="create_topic">
        <h1>title :: </h1><input type="text" id="title"/>
            <br />
            <br />
            <h1>description :: </h1>
            <textarea name="description" id="description" cols="60" rows="30"></textarea>
            <button onClick={create_topic}>create</button>
        </div>
    </div>
  );
}

export default Topic;
