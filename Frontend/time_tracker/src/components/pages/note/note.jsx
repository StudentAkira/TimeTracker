import React, { useEffect, useState } from 'react';
import { APIEndpoints, frontURLs } from "../../enums.tsx";
import Card from '../../ui/card/card.jsx';
import "./note.css"
import NewItemForm from '../../ui/new_item_form/new_item_form.jsx';
import RequestService from "../../../services/requests/request_service.js"
import SearchBar from '../../ui/search_bar/search_bar.jsx';
import Items from '../../ui/items_section/items_section.jsx';



function Note() {

    const [items, setItems] = useState([]);
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(49);

    const request_service = new RequestService()

    const is_auth = () => {
        if(localStorage.getItem("user_data") == null){
            return false;
        }
        return true 
    }

    console.log(items);

    useEffect(() => {
        if(!is_auth()){
            window.location.href = frontURLs.login
            return;
        }
        request_service.read_items(setItems, offset, limit, APIEndpoints.note_read)
    }, []);

    return (
            <div className="note">

                <NewItemForm 
                    service={request_service} 
                    setItems={setItems}  
                    offset={offset} 
                    limit={limit} 
                    create_path={APIEndpoints.note_create}
                    read_path={APIEndpoints.note_read}
                />

                <SearchBar 
                    service={request_service}
                    setItems={setItems}
                    offset={offset}
                    limit={limit}
                    path={APIEndpoints.note_read_by_title_starts_with}
                />
                
                <Items 
                    items={items}
                    item_link={frontURLs.note}
                />

            </div>
    );
}

export default Note;
