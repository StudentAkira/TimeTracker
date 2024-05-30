import React, { useEffect, useState } from 'react';
import { APIEndpoints, frontURLs } from '../enums.tsx';
import Card from '../card/card.jsx';
import "./subject.css"


function Subject() {


    const [items, setItems] = useState([]);
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(49);

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

    const check_auth = () => {
        if(localStorage.getItem("user_data") == null){
            window.location.href = frontURLs.login
        }
    }

    useEffect(() => {
        check_auth()
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
    }

  return (
    <div className="subject">
        <div className="subjects">
            {
                items.map(
                    (item) => (
                        <div className="subject_wrapper">
                            <Card title={item.title} content={item.description}/>
                        </div>
                    )
                )
            }
        </div>

        <div className="create_subject">
            <h1>title :: </h1><input type="text" id="title"/>
            <br />
            <br />
            <h1>description :: </h1>
            <textarea name="description" id="description" cols="60" rows="30"></textarea>
            <button onClick={create_subject}>create</button>
        </div>
    </div>
  );
}

export default Subject;
