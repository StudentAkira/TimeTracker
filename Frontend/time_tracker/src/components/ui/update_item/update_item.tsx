import React from "react";
import { single_item_props } from "../../context/props";
import "./update_item.css"


function UpdateItem(props : single_item_props){

    let new_title: null | string = null;
    let new_description: null | string = null;

    return (
        <div className="update_item_wrapper">
            <h1 className="item_title">title :: </h1><input type="text" id="item_title" className="item_title_field" defaultValue={props.title}  onChange={
                        (e) => {
                            props.title == e.target.value?
                            new_title = null: new_title = e.target.value;
                            }
                        }/>
        <br />
        <br />
        <h1 className="item_description_label">description :: </h1>
        <textarea name="item_description" id="item_description" className="item_description_field" cols={60} rows={30} defaultValue={props.description} onChange={
                        (e) => {
                            props.description == e.target.value? new_description = null: new_description = e.target.value;
                            }
                        }>
        </textarea>
                    
        <div className="buttons">
            <button className="update_item" onClick={
                () => {
                    props.service.update_item(
                        props.title,
                        new_title,
                        new_description,
                        props.update_path,
                        props.update_alert_message
                        )

                }
            }>update</button>
            <button className="delete_item" onClick={
                ()=>{
                    props.service.delete_item(
                        props.delete_path,
                        props.title,
                        props.redirect_path,
                        props.delete_alert_message
                    )
                }
                }>delete</button>
            </div>
        </div>
    );
}

export default UpdateItem;