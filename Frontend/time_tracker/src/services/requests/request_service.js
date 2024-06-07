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

        console.log(raw);

        const response = await fetch(path, requestOptions);
        const response_json = await response.json();
        if ("detail" in response_json){
            alert(response_json["detail"]["error"])
            console.log(response_json);
            return
        }
        alert(response_json["message"]);
    }
    async read_items(
            setItems,
            path,
            query_params
        ) {
        
        const myHeaders = new Headers();
        myHeaders.append("accept", "application/json");

        const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
        credentials: "include"
        };

        // const response = await fetch(`${path}?offset=${offset}&limit=${limit}`, requestOptions)
        const response = await fetch(`${path}?${query_params}`, requestOptions)
        const response_json = await response.json()

        if ("detail" in response_json){
            console.log(response_json);
            alert(response_json["detail"]["error"])
            return
          }
        this.sort_items_by_time(response_json)
        setItems(response_json);
        
    }

    async search_by_title_starts_with(setItems, path, query_params) {
        const myHeaders = new Headers();
        myHeaders.append("accept", "application/json");

        const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
        credentials: "include"
        };

        console.log(query_params);

        const response = await fetch(`${path}?${query_params}`, requestOptions)

        const response_json = await response.json()

        if ("detail" in response_json){
            console.log(response_json);
            alert(response_json["detail"]["error"])
            return
          }
        console.log(response_json);
        setItems((items)=>response_json);
    }
    sort_items_by_time(items){
        items.sort((a, b) => new Date(b.datetime_) - new Date(a.datetime_))
    }

    async get_item(path, title, setFetching, setItem, setTitle, setDescription, setAdditional) {
        const myHeaders = new Headers();
        myHeaders.append("accept", "application/json");
    
        const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
        credentials: "include"
        };
    
        const response =  await fetch(`${path}?title=${title}`, requestOptions)
        const response_json = await response.json()

        if (response_json == null){
            setFetching(false)
            return
        }
        if ("detail" in response_json){
            setFetching(false)
            setItem(null)
            return
          }
        
        setItem(response_json)
        setFetching(false)
        setTitle(response_json["title"])
        setDescription(response_json["description"])
        if(setAdditional != undefined){
            setAdditional(response_json["topic_title"])
        }
    }

    async update_item(title, new_title, new_description, path, alert_message) {
        const myHeaders = new Headers();
        myHeaders.append("accept", "application/json");
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
        "title": title,
        "new_title": new_title,
        "new_description": new_description,
        });

        const requestOptions = {
        method: "PATCH",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
        credentials: "include"
        };

        const response = await fetch(path, requestOptions)
        const response_json = await response.json()

        if ("detail" in response_json){
            console.log(response_json);
            alert(response_json["detail"]["error"]);
            return
          }
        alert(alert_message);
        window.location.href = new_title == null ? title : new_title
    }
    
    async delete_item(api_path, title, redirect_path, alert_message){
        const myHeaders = new Headers();
        myHeaders.append("accept", "application/json");
        myHeaders.append("Content-Type", "application/json");

        const requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        redirect: "follow",
        credentials: "include"
        };
        const response = await fetch(api_path + `/?title=${title}`, requestOptions)
        const response_json = await response.json()

        if ("detail" in response_json){
            alert(response_json["detail"]["error"]);
            return
          }
        alert(alert_message);
        window.location.href = redirect_path
    }
    
}

export default RequestService;