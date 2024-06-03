import { APIEndpoints } from "../components/enums.tsx";

class NoteService{
    async create_item() {
        const myHeaders = new Headers();
        myHeaders.append("accept", "application/json");
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "title": document.getElementById("title").value,
            "description": document.getElementById("description").value,
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
            credentials: "include"
        };

        const response = await fetch(APIEndpoints.note_create, requestOptions);
        const response_json = await response.json();
        if ("detail" in response_json){
            alert(response_json["detail"]["error"])
            return
        }
        alert(response_json["message"]);
    }
    
    sort_items_by_time(items){
        items.sort((a, b) => new Date(b.datetime_) - new Date(a.datetime_))
    }

    async read_items(setItems, offset, limit) {
        
        const myHeaders = new Headers();
        myHeaders.append("accept", "application/json");

        const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
        credentials: "include"
        };

        const response = await fetch(`${APIEndpoints.note_read}?offset=${offset}&limit=${limit}`, requestOptions)
        const response_json = await response.json()

        if ("detail" in response_json){
            alert(response_json)
            return
          }
        this.sort_items_by_time(response_json)
        setItems(response_json);
    }

   
}

export default NoteService;