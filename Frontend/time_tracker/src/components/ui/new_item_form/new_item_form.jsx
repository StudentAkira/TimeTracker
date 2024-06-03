import "./new_item_form.css"


function NewItemForm(props){


    return (
        <div className="create_item">
            <h1>title :: </h1><input type="text" id="title"/><br />
            <textarea name="description" id="description" cols="60" rows="30"></textarea>
            <button onClick={()=>{
                props.service.create_item()
                props.service.read_items(props.setItems, props.offset, props.limit)
            }}>create </button>
        </div>
    );
}

export default NewItemForm;