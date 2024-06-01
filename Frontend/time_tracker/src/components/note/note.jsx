import React, { useEffect, useState } from 'react';
import { APIEndpoints, frontURLs } from '../enums.tsx';
import Card from '../card/card.jsx';
import "./note.css"


function Note() {


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

        const response = await fetch(`${APIEndpoints.note_read}?offset=${offset}&limit=${limit}`, requestOptions)
        const response_json = await response.json()

        if ("detail" in response_json){
            alert(response_json)
            return
          }
        sort_items_by_tile(response_json)
        setItems(response_json);
    }

    const is_auth = () => {
        if(localStorage.getItem("user_data") == null){
            return false;
        }
        return true 
    }

    const create_note = async () => {

        const myHeaders = new Headers();
        myHeaders.append("accept", "application/json");
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "title": document.getElementById("title").value,
            "content": document.getElementById("content").value,
        });

        const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
        credentials: "include"
        };

        const response = await fetch(APIEndpoints.note_create, requestOptions);
        const response_json = await response.json();
        if ("detail" in response_json){
            alert(response_json["detail"]["error"])
            return
          }
        alert(response_json["message"]);
    }

    const debounce = (cb, delay = 500) => {
        let timeout
        return (...args) => {
            clearTimeout(timeout)
            timeout = setTimeout(() => {
                cb(...args)
            }, delay)
        }
    }

    const sort_items_by_tile = (items) => {
        console.log(items);
        items.sort((a, b) => new Date(b.datetime_) - new Date(a.datetime_))
        console.log(items);
    }

    const search_by_title_starts_with = async () => {
        const myHeaders = new Headers();
        myHeaders.append("accept", "application/json");

        const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
        credentials: "include"
        };

        const response = await fetch(`${APIEndpoints.note_read_by_title_starts_witn}?title=${
            document.getElementById("title_input").value
        }&offset=${
            offset
        }&limit=${
            limit
        }`, requestOptions)

        const response_json = await response.json()

        if ("detail" in response_json){
            alert(response_json["detail"]["error"])
            return
          }
        sort_items_by_tile(response_json)  
        setItems(response_json);
    }

    useEffect(() => {
        if(!is_auth()){
            window.location.href = frontURLs.login
            return;
        }
        read_items()
    }, []);

  return (
        <div className="note">
            <div className="search_bar">
                <h1 className='search_label'>Search by title :: </h1>
                <div className='search_input_wrapper'><input type="text" id="title_input" onChange={debounce(search_by_title_starts_with)}/></div>
            </div>

            <div className="notes">
                {
                    items.map(
                        (item) => (
                            <div className="note_wrapper">
                                <Card title={
                                    <a href={`${frontURLs.note}/${item.title}`}>{item.title}</a>
                                    } content={item.content} additional_data={`${item.datetime_.substring(0, 19)}`}/>
                            </div>
                        )
                    )
                }
            </div>

            <div className="create_note">
                <h1>title :: </h1><input type="text" id="title"/><br />
                <textarea name="content" id="content" cols="60" rows="30"></textarea>
                <button onClick={()=>{
                    create_note()
                    read_items()
                }}>create</button>
            </div>
        </div>
  );
}

export default Note;
