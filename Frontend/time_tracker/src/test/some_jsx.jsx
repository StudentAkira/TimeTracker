import { useState } from "react";
import ChooseRelatedItems from "../components/ui/choose_related_items/choose_related_items.tsx";
import RequestService from "../services/requests/request_service";

function Child(){

    const request_service = new RequestService()

    return (
        <>
            <ChooseRelatedItems
                service={request_service}
                item_title_label={"test"}
                parent_item_title={"свободное время"}
            />
        </>
    );
}

export default Child;