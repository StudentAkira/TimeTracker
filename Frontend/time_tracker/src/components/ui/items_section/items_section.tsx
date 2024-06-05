import React from "react";
import Card from "../card/card";
import "./items_section.css"
import { items_props } from "../../context/props";
import get_additional_data from "../../utils/additional_data_util.tsx";


function Items(props : items_props){

    return (
    <div className="items">
        {
            props.items.map(
                (item, index) => (
                    <div className="item_wrapper" key={index}>
                        <Card 
                            title={
                            // <a href={`${frontURLs.note}/${item.title}`}>{item.title}</a>
                            <a href={`${props.item_link}/${item.title}`}>{item.title}</a>
                            } 
                            description={
                                item.description
                                } 
                            additional_data={get_additional_data(item)}/>
                    </div>
                )
            )
        }
        </div>
    );
}

export default Items;