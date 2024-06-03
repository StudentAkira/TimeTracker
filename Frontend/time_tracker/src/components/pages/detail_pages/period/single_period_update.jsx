import { useParams } from "react-router-dom";
import { APIEndpoints, frontURLs } from "../../../enums.tsx";
import { useEffect, useState } from "react";
import NotFound from "../../notfound/notfound.jsx";

function SinglePeriodUpdate(){

    
    const params = useParams()

    const [item, setItem] = useState(null)
    const [fetching, setFetching] = useState(true)
    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);
    const [topic_title, setTopictitle] = useState(null);

    let new_title = null;
    let new_description = null;
    let new_topic_title = null;


    const get_item = async () => {
        const myHeaders = new Headers();
        myHeaders.append("accept", "application/json");
    
        const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
        credentials: "include"
        };
    
        const response =  await fetch(`${APIEndpoints.period_read_by_title}?title=${params.title}`, requestOptions)
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
        setDescription(response_json["description"])
        setTopictitle(response_json["topic_title"])

    }

    const update_item = async () => {
        const myHeaders = new Headers();
        myHeaders.append("accept", "application/json");
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
        "topic_title":  new_topic_title,
        "title": title,
        "new_title": new_title,
        "new_description": new_description,
        });

        const requestOptions = {
        method: "PATCH",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
        credentials: "include"
        };

        const response = await fetch(APIEndpoints.period_update, requestOptions)
        const response_json = await response.json()

        if ("detail" in response_json){
            alert(response_json["detail"]["error"]);
            return
          }
        alert('Period was updated');
        window.location.href = new_title == null ? title : new_title
    }

    const delete_period = async () => {
        const myHeaders = new Headers();
        myHeaders.append("accept", "application/json");
        myHeaders.append("Content-Type", "application/json");

        const requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        redirect: "follow",
        credentials: "include"
        };

        const response = await fetch(APIEndpoints.period_delete + `/?title=${title}`, requestOptions)
        const response_json = await response.json()

        if ("detail" in response_json){
            alert(response_json["detail"]["error"]);
            return
          }
        alert('Period was deleted');
        window.location.href = frontURLs.topic
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
        <div className="period">
            <h1 className="topic_title">topic title</h1><input type="text" id="topic_title" defaultValue={topic_title}  onChange={
                            (e) => {
                                topic_title == e.target.value? new_topic_title = null: new_topic_title = e.target.value;
                                }
                            }/>
            <h1 className="period_title">title :: </h1><input type="text" id="period_title" defaultValue={title}  onChange={
                            (e) => {
                                title == e.target.value? new_title = null: new_title = e.target.value;
                                }
                            }/>
            <br />
            <br />
            <h1 className="period_description">description :: </h1>
            <textarea name="period_description" id="period_description" cols="60" rows="30" defaultValue={description} onChange={
                            (e) => {
                                description == e.target.value? new_description = null: new_description = e.target.value;
                                }
                            }>
            </textarea>
                        
            <div className="buttons">
                <button className="update_period" onClick={update_item}>update</button>
                <button className="delete_period" onClick={delete_period}>delete</button>
            </div>

        </div>
    );
}

export default SinglePeriodUpdate;