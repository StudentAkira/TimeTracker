import { useEffect, useState } from "react";
import NotFound from "../../notfound/notfound";
import { APIEndpoints, frontURLs } from "../../enums.tsx";
import { useParams } from "react-router-dom";

function SingleNote(){

    const params = useParams()

    const [item, setItem] = useState(null)
    const [fetching, setFetching] = useState(true)
    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);

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
    
        const response =  await fetch(`${APIEndpoints.note_read_by_title}?title=${params.title}`, requestOptions)
        const response_json = await response.json()

        if (response_json == null){
            setFetching(false)
            return
        }
        if ("detail" in response_json){
            return
          }
        
        setItem(response_json)
        setFetching(false)
        setTitle(response_json["title"])
        setDescription(response_json["content"])
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

        const response = await fetch(APIEndpoints.note_update, requestOptions)
        const response_json = await response.json()

        if ("detail" in response_json){
            alert(response_json["detail"]["error"]);
            return
          }
        alert('Note was updated');
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

        const response = await fetch(APIEndpoints.note_delete + `/?title=${title}`, requestOptions)
        const response_json = await response.json()

        console.log(response_json);

        if ("detail" in response_json){
            alert(response_json["detail"]["error"]);
            return
          }
        alert('Note was deleted');
        window.location.href = frontURLs.note
    }

    useEffect(() => {
        get_item()
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
        <div className="wrapper">
            <div className="note">
                <h1 className="note_title">title :: </h1><input type="text" id="note_title" defaultValue={title}  onChange={
                                (e) => {
                                    title == e.target.value? new_title = null: new_title = e.target.value;
                                    }
                                }/>
                <br />
                <br />
                <h1 className="note_description">description :: </h1>
                <textarea name="note_description" id="note_description" cols="60" rows="30" defaultValue={description} onChange={
                                (e) => {
                                    description == e.target.value? new_description = null: new_description = e.target.value;
                                    }
                                }>

                </textarea>

                <div className="buttons">
                    <button className="update_note" onClick={update_item}>update</button>
                    <button className="delete_note" onClick={delete_note}>delete</button>
                </div>
            </div>
        </div>
        
    );
}

export default SingleNote;