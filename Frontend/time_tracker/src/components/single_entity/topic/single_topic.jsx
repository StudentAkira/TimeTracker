import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { APIEndpoints, frontURLs } from "../../enums.tsx";
import NotFound from "../../notfound/notfound.jsx";
import Card from "../../card/card.jsx";

function SingleTopic(){

    const params = useParams()

    const [item, setItem] = useState(null)
    const [fetching, setFetching] = useState(true)
    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);
    const [periods, setPeriods] = useState([])
    const [offset, setOffset] = useState(0)
    const [limit, setLimit] = useState(49)

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
    
        const response =  await fetch(`${APIEndpoints.topic_read_by_title}?title=${params.title}`, requestOptions)
        const response_json = await response.json()

        if (response_json == null){
            setFetching(false)
            return
        }
        if ("detail" in response_json){
            setFetching(false)
            setItem(null)
            return
          }
        
        setItem(response_json)
        setFetching(false)
        setTitle(response_json["title"])
        setDescription(response_json["description"])

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

        const response = await fetch(APIEndpoints.topic_update, requestOptions)
        const response_json = await response.json()

        if ("detail" in response_json){
            alert(response_json["detail"]["error"]);
            return
          }
        alert('Topic was updated');
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

        const response = await fetch(APIEndpoints.topic_delete + `/?title=${title}`, requestOptions)
        const response_json = await response.json()

        console.log(response_json);

        if ("detail" in response_json){
            alert(response_json["detail"]["error"]);
            return
          }
        alert('Topic was deleted');
        window.location.href = frontURLs.topic
    }

    const get_periods = async () => {
        const myHeaders = new Headers();
        myHeaders.append("accept", "application/json");

        const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
        credentials: "include"
        };

        const response = await fetch(`${APIEndpoints.period_read}?offset=${offset}&limit=${limit}&topic_title=${params.title}`, requestOptions)
        const response_json = await response.json()

        if ("detail" in response_json){
            return
          }
        setPeriods(response_json);
    }

    useEffect(() => {
        get_item()
        get_periods()
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
        <div className="topic_wrapper">
            <div className="topic">
                <h1 className="topic_title">title :: </h1><input type="text" id="topic_title" defaultValue={title}  onChange={
                                (e) => {
                                    title == e.target.value? new_title = null: new_title = e.target.value;
                                    }
                                }/>
                <br />
                <br />
                <h1 className="topic_description">description :: </h1>
                <textarea name="topic_description" id="topic_description" cols="60" rows="30" defaultValue={description} onChange={
                                (e) => {
                                    description == e.target.value? new_description = null: new_description = e.target.value;
                                    }
                                }>
                </textarea>

                <div className="buttons">
                    <button className="update_topic" onClick={
                                ()=>{
                                    update_item()
                                    get_item()
                            }
                        }>update</button>
                    <button className="delete_topic" onClick={delete_note}>delete</button>
                </div>
            </div>
            <div className="periods">
            {
                    periods.map(
                        (item, index) => (
                            <div className="subject_wrapper" >
                                <Card 
                                    title={<a href={`${frontURLs.period}/${item.title}`}>{item.title}</a>} 
                                    content={item.description} 
                                    additional_data={(Math.ceil(item.end_time - item.start_time) / 3600).toPrecision(2)}
                                />
                            </div>
                        )
                    )
                }
            </div>
        </div>
            
    );
}

export default SingleTopic;