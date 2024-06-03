import "./search_bar.css"


function SearchBar(props){

    const debounce = (cb, delay = 500) => {
        let timeout
        return (...args) => {
            clearTimeout(timeout)
            timeout = setTimeout(() => {
                cb(...args)
            }, delay)
        }
    }
    // APIEndpoints.note_read_by_title_starts_with

    return (
        <div className="search_bar">
                <h1 className='search_label'>Search by title :: </h1>
                <div className='search_input_wrapper'><input type="text" id="title_input" className="title_input" onChange={
                    debounce(()=>{
                        props.service.search_by_title_starts_with(
                                props.setItems,
                                props.offset,
                                props.limit,
                                props.path
                            )
                    })
                    }/></div>
            </div>
    );
}

export default SearchBar;