import React, { useEffect, useState } from 'react';
import { APIEndpoints, frontURLs } from '../enums.tsx';


function Note() {


    const [items, setItems] = useState([]);

    const get_notes = async () => {
        const myHeaders = new Headers();
        myHeaders.append("accept", "application/json");

        const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
        credentials: "include"
        };

        const response = await fetch("http://127.0.0.1:8000/api/note/read?offset=0&limit=49", requestOptions)
        const response_json = await response.json()

        if ("detail" in response_json){
            alert(response_json)
            return
          }
        setItems(response_json);
    }

    useEffect(() => {
        get_notes()
    }, []);

    const logout = async () => {
        const myHeaders = new Headers();
        myHeaders.append("accept", "application/json");

        const requestOptions = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow",
        credentials:"include"
        };

        const response = await fetch(APIEndpoints.logout, requestOptions);
        const response_json = await response.json()

        window.location.href = frontURLs.login;
    }

    const create_note = async () => {

        const myHeaders = new Headers();
        myHeaders.append("accept", "application/json");
        myHeaders.append("Content-Type", "application/json");

        let d = new Date();
        const raw = JSON.stringify({
        "title": document.getElementById("title").value,
        "content": document.getElementById("note_content").value,
        "datetime_": d.toJSON()
        });

        const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
        credentials: "include"
        };

        const response = await fetch(APIEndpoints.create_note, requestOptions);
        const response_json = await response.json();
        if ("detail" in response_json){
            alert(response_json["detail"]["error"])
            return
          }
        alert(response_json["message"]);
    }

  return (
    <div className="Note">
        <button onClick={logout}>
            logout
        </button>


        <div className="notes">
            {
                items.map(
                    (item) => (
                        <div className="note_wrapper">
                            <h1 key={item.title}>{item.title}</h1>
                            <p>{item.content}</p>
                        </div>
                    )
                )
            }
        </div>

        <div className="create_note">
            <h1>title :: </h1><input type="text" id="title"/><br />
            <textarea name="note_content" id="note_content" cols="60" rows="30"></textarea>
            <button onClick={create_note}>create</button>
        </div>
    </div>
  );
}

export default Note;
