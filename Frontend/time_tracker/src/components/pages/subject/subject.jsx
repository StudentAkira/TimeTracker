import React, { useEffect, useState } from 'react';
import { APIEndpoints, frontURLs } from "../../enums.tsx";
import Card from '../../ui/card/card.jsx';
import "./subject.css"
import NewItemForm from '../../ui/new_item_form/new_item_form.jsx';


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
            <div className="subjects">
                {
                    items.map(
                        (item, index) => (
                            <div className="subject_wrapper" >
                                <Card 
                                    title={<a href={`${frontURLs.subject}/${item.title}`}>{item.title}</a>} 
                                    description={item.description} 
                                    additional_data={item.total_hours.toPrecision(2) + " hours"}
                                />
                            </div>
                        )
                    )
                }
            </div>
            <NewItemForm create_item={create_subject} read_items={get_items}/>
        </div>
  );
}

export default Subject;
