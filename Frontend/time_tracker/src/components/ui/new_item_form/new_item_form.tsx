import { new_item_form_props } from "../../context/props";
import "./new_item_form.css"
import React from "react";


function NewItemForm(props : new_item_form_props){


    return (
        <div className="create_item">

            <div className="item_title">
                <div className="title_label_wrapper">
                    <div className="title_label">title ::</div>
                </div>
                <input type="text" id="title" className="title"/>
            </div>

            <div className="item_description">
                <div className="description_label_wrapper">
                    :: description ::
                </div> 
                <textarea name="description" id="description" cols={60} rows={30} className="description_field"></textarea>
            </div>

            <button onClick={()=>{
                props.service.create_item(props.create_path)
                props.service.read_items(props.setItems, props.read_path, `offset=${props.offset}&limit=${props.limit}`)
            }} className="create_button">create </button>
        </div>
    );
}

export default NewItemForm;