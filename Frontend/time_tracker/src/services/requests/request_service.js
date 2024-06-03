class RequestService{


    async create_item(path) {
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

        const response = await fetch(path, requestOptions);
        const response_json = await response.json();
        if ("detail" in response_json){
            console.log(response_json);
            alert(response_json["detail"]["error"])
            return
        }
        alert(response_json["message"]);
    }
    async read_items(setItems, offset, limit, path) {
        
        const myHeaders = new Headers();
        myHeaders.append("accept", "application/json");

        const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
        credentials: "include"
        };

        const response = await fetch(`${path}?offset=${offset}&limit=${limit}`, requestOptions)
        const response_json = await response.json()

        if ("detail" in response_json){
            alert(response_json)
            return
          }
        this.sort_items_by_time(response_json)
        setItems(response_json);
    }

    async search_by_title_starts_with(setItems, offset, limit, path) {
        const myHeaders = new Headers();
        myHeaders.append("accept", "application/json");

        const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
        credentials: "include"
        };

        const response = await fetch(`${path}?title=${
            document.getElementById("title_input").value
        }&offset=${
            offset
        }&limit=${
            limit
        }`, requestOptions)

        const response_json = await response.json()

        if ("detail" in response_json){
            alert(response_json["detail"]["error"])
            return
          }
        this.sort_items_by_time(response_json)  
        setItems(response_json);
    }
    sort_items_by_time(items){
        items.sort((a, b) => new Date(b.datetime_) - new Date(a.datetime_))
    }
}

export default RequestService;