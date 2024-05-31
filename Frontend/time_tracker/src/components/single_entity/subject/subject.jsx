import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { APIEndpoints, frontURLs } from "../../enums.tsx";
import NotFound from "../../notfound/notfound.jsx";
import "./subject.css"
import Card from "../../card/card.jsx";

function SingleSubject(){

    let params = useParams()

    const [item, setItem] = useState(null)
    const [fetching, setFetching] = useState(true)
    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);
    const [topics, setTopics] = useState([])

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
    
        const response =  await fetch(`${APIEndpoints.subject_read_by_title}?title=${params.title}`, requestOptions)
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
        setTopics(response_json["topics"])
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

        const response = await fetch(APIEndpoints.subject_update, requestOptions)
        const response_json = await response.json()

        if ("detail" in response_json){
            alert(response_json["detail"]["error"]);
            return
          }
        alert('Subject was updated');
        window.location.href = new_title == null ? title : new_title
    }

    useEffect(() => {
        get_item()
    }, []);

    const append_topic_to_subject = async () => {
        const myHeaders = new Headers();
        myHeaders.append("accept", "application/json");
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
        "topic_title": document.getElementById("topic_title_to_append").value,
        "subject_title": title
        });

        const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
        credentials: "include"
        };

        const response = await fetch(APIEndpoints.append_topic_to_subject, requestOptions)
        const response_json = await response.json()
        if ("detail" in response_json){
            alert(response_json["detail"]["error"]);
            return
          }
        
    }

    const remove_topic_from_subject = async () => {
        const myHeaders = new Headers();
        myHeaders.append("accept", "application/json");
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "topic_title": document.getElementById("topic_title_to_remove").value,
            "subject_title": title
        });

        const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
        credentials: "include"
        };

        const response = await fetch(APIEndpoints.remove_topic_from_subject, requestOptions)
        const response_json = await response.json()
        if ("detail" in response_json){
            alert(response_json["detail"]["error"]);
            return
          }
    }

    const delete_subject = async () => {
        const myHeaders = new Headers();
        myHeaders.append("accept", "application/json");
        myHeaders.append("Content-Type", "application/json");

        const requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        redirect: "follow",
        credentials: "include"
        };

        const response = await fetch(APIEndpoints.subject_delete + `/?subject_title=${title}`, requestOptions)
        const response_json = await response.json()

        console.log(response_json);

        if ("detail" in response_json){
            alert(response_json["detail"]["error"]);
            return
          }
        alert('Subject was deleted');
        window.location.href = frontURLs.subject
    }

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
            <div className="subject_edit">
                <div className="subject_create_wrapper">
                    <h1 className="subject_title">title :: </h1><input type="text" id="title" defaultValue={title}  onChange={
                        (e) => {
                            title == e.target.value? new_title = null: new_title = e.target.value;
                            }
                        }/>
                    <br />
                    <br />
                    <h1 className="subject_description">description :: </h1>
                    <div className="content">
                        <textarea name="subject_content" id="description" cols="60" rows="30" onChange={
                        (e) => {
                            description == e.target.value? new_description = null: new_description = e.target.value;
                            }
                        }>
                            {item.description}
                        </textarea>
                    </div>
                    <br />
                    <div className="buttons">
                        <button className="update_subject" onClick={update_item}>update</button>
                        <button className="delete_subject" onClick={delete_subject}>delete</button>
                    </div>
                </div>
                <div className="topic_to_subject_wrapper">
                    <div className="topic_append">
                        topic title :: <input type="text" id="topic_title_to_append"/>
                        <button onClick={() => {
                                setFetching(true)
                                append_topic_to_subject()
                                get_item()
                            }}>
                            append
                        </button>
                    </div>
                    <br />
                    <br />
                    <div className="topic_remove">
                        topic title :: <input type="text" id="topic_title_to_remove"/>
                        <button onClick={() => {
                                setFetching(true)
                                remove_topic_from_subject()
                                get_item()
                            }}>
                            remove
                        </button>
                    </div>
                </div>
            </div>
            <div className="subject_topics">
                {
                    topics.map(
                        (topic, index) => (
                            <div className="topic_wrapper" >
                                <Card 
                                    title={topic.title} 
                                    content={topic.description} 
                                    additional_data={
                                    <>
                                        <h3>{String(topic.total_hours).substring(0, 5)} hours</h3>
                                        <br />
                                        <br />
                                        <a href={`${frontURLs.topic}/${topic.title}`}>more....</a>
                                    </>
                                }
                                />
                            </div>
                        )
                    )
                }
            </div>
        </div>
    );
}

export default SingleSubject;