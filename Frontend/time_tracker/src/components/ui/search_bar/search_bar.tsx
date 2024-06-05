import "./search_bar.css"
import { search_bar_props } from "../../context/props";
import React from "react";

function SearchBar(props : search_bar_props){

    const debounce = (cb, delay = 500) => {
        let timeout
        return (...args) => {
            clearTimeout(timeout)
            timeout = setTimeout(() => {
                cb(...args)
            }, delay)
        }
    }


    return (
        <div className="search_bar">
                <h1 className='search_label'>Search by title :: </h1>
                <div className='search_input_wrapper'><input type="text" id="title_input" className="title_input" onChange={
                    debounce((e)=>{
                            props.service.search_by_title_starts_with(
                                props.setItems,
                                props.path,
                                `${props.query_params}&title=${e.target.value}`,
                                )   
                            }
                        )
                    }/>
                </div>
            </div>
    );
}

export default SearchBar;