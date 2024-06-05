import { Dispatch, SetStateAction } from "react"
import RequestService from "../../services/requests/request_service"

export interface new_item_form_props {
    service : RequestService
    setItems: Dispatch<SetStateAction<never[]>>//const [item, setItems <- this function] = useState()
    offset: Number
    limit: Number
    create_path: string
    read_path: string
  }

export interface search_bar_props {
    service : RequestService
    setItems: Dispatch<SetStateAction<never[]>>//const [item, setItems <- this function] = useState()
    path: string
    query_params: string
}

export interface item{
  title: string
  description: string
  total_hours: undefined | string 
  datetime_: undefined | string
  end_time: undefined | number
  start_time: undefined | number
}

export interface items_props {
  items: [item]
  item_link: string
} 

export interface create_item_args {
  path: string
}

export interface single_item_props {
  service: RequestService
  title: string
  description: string
  update_path: string
  delete_path: string
  redirect_path: string

  update_alert_message: string
  delete_alert_message: string
}

export interface choose_relate_items_props {
  service: RequestService
  path: string
  query_params: string
}