import React, { useEffect, useState } from "react";
import "./choose_related_items.css"
import { choose_relate_items_props, item } from "../../context/props";
import RequestService from "../../../services/requests/request_service";
import { APIEndpoints, frontURLs } from "../../enums.tsx";
import Items from "../items_section/items_section";
import SearchBar from "../search_bar/search_bar.tsx";


function ChooseRelatedItems(props: choose_relate_items_props){


    const [items, setItems] = useState([])
    const [startitems, setStartItmes] = useState([])
    const [page, setPage] = useState(1)

    const [offset, setOffset] = useState(0)
    const [limit, setLimit] = useState(3)

    const request_service = new RequestService();

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
        request_service.read_items(
            setItems,
            props.path,
            `${props.query_params}&offset=${offset}&limit=${limit}&title=${""}`
            )
        setStartItmes((startitems)=> items)
    }, []);

    return (
        <div className="choose_items_wrapper">
            <SearchBar 
                service={request_service}
                setItems={setItems}
                path={props.path}
                query_params={`${props.query_params}&offset=${offset}&limit=${limit}`}
            />
            <div className="related_items_wrapper">
            {
                items.map(
                (item: item, index) => (
                        <div className="choose_item_wrapper" key={index}>
                            <div className="item">
                                <div className="item_title">
                                    {item.title}
                                </div>
                                <hr />
                            </div>
                        </div>
                    )
                )
            }
            <button className="prev_page_button"
                onClick={() => {
                        setOffset((offset) => {
                            if(offset > 0)return offset - limit
                            return 0;
                        })
                        setPage((page) => page == 0? page + 1:page - 1)
                        request_service.read_items(
                            setItems,
                            props.path,
                            `${props.query_params}&offset=${offset}&limit=${limit}&title=${""}`
                            )
                        setStartItmes((startitems)=> items)
                    }
                }
            >
                {"<-"}
            </button>
                {page - 1}
            <button className="next_page_button"
                onClick={() => {
                        setOffset((offset) => offset + limit)
                        setPage((page) => page + 1)
                        request_service.read_items(
                            setItems,
                            props.path,
                            `${props.query_params}&offset=${offset}&limit=${limit}&title=${""}`
                            )
                        setStartItmes((startitems)=> items)
                    }
                }
            >
                {"->"}
            </button>
            </div>
        </div>
    );
}

export default ChooseRelatedItems;