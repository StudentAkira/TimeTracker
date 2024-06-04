import { item } from "../context/props";

function get_additional_data(item_ : item){

    if (item_.datetime_ != undefined){
        return item_.datetime_.substring(0, 19)
    }
    if (item_.start_time != undefined && item_.end_time != undefined){
        return (Math.ceil(item_.end_time - item_.start_time) / 3600).toPrecision(2) + " hours"
    }
    if (item_.total_hours != undefined){
        return Number(item_.total_hours).toPrecision(2) + " hours"
    }
}

export default get_additional_data;