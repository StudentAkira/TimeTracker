import React from "react";
import { update_item_props } from "../../context/props";
import { APIEndpoints, frontURLs } from "../../enums.tsx";

function UpdateItem(props : update_item_props){

    let new_title: null | string = null;
    let new_description: null | string = null;

    return (
        <>
            <h1 className="note_title">title :: </h1><input type="text" id="note_title" defaultValue={props.title}  onChange={
                        (e) => {
                            props.title == e.target.value?
                            new_title = null: new_title = e.target.value;
                            }
                        }/>
        <br />
        <br />
        <h1 className="note_description">description :: </h1>
        <textarea name="note_description" id="note_description" cols={60} rows={30} defaultValue={props.description} onChange={
                        (e) => {
                            props.description == e.target.value? new_description = null: new_description = e.target.value;
                            }
                        }>
        </textarea>
                    
        <div className="buttons">
            <button className="update_note" onClick={
                () => {
                    props.service.update_item(
                        props.title,
                        new_title,
                        new_description,
                        APIEndpoints.note_update,
                        "Note was updated"
                        )

                }
            }>update</button>
            <button className="delete_note" onClick={
                ()=>{
                    props.service.delete_item(
                        APIEndpoints.note_delete,
                        props.title,
                        frontURLs.note,
                        "note was deleted"
                    )
                }
                }>delete</button>
            </div>
        </>
    );
}

export default UpdateItem;