import { useEffect, useState } from "react";
import NotFound from "../../notfound/notfound";
import { useParams } from "react-router-dom";
import { APIEndpoints, frontURLs } from "../../../enums.tsx";
import RequestService from "../../../../services/requests/request_service.js";
import UpdateItem from "../../../ui/update_item/update_item.tsx"

function SingleNote(){

    const params = useParams()

    const [item, setItem] = useState(null)
    const [fetching, setFetching] = useState(true)
    const [title, setTitle] = useState(params.title);
    const [description, setDescription] = useState(null);

    

    const request_service = new RequestService()

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
        request_service.get_item(
            APIEndpoints.note_read_by_title,
            title,
            setFetching, 
            setItem,
            setTitle,
            setDescription
        )
    }, []);


    if (fetching) {
        return (
            <>
            
            </>
        );
    }

    if (!fetching && item == null) {
        return (
            <NotFound />
        )
    }

    return (
        <div className="note">
           <UpdateItem 
                service={request_service}
                title={title}
                description={description}
           />
        </div>
    );
}

export default SingleNote;