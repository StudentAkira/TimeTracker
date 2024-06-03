import "./new_item_form.css"


function NewItemForm(props){


    return (
        <div className="create_item">
            <div className="title_input">
                <div className="title_label_wrapper">
                    <div className="title_label">title ::</div>
                </div>
                <input type="text" id="title" className="title"/>
            </div>
            <div className="item_description">
                <textarea name="description" id="description" cols="60" rows="30" className="description_field"></textarea>
            </div>
            <button onClick={()=>{
                props.service.create_item(props.create_path)
                props.service.read_items(props.setItems, props.offset, props.limit, props.read_path)
            }} className="create_button">create </button>
        </div>
    );
}

export default NewItemForm;