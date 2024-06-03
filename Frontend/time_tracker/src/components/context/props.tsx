import { Dispatch, SetStateAction } from "react"
import RequestService from "../../services/requests/request_service"

export interface new_item_form_props {
    service : RequestService
    setItems: Dispatch<SetStateAction<never[]>>
    offset: Number
    limit: Number
    create_path: string
    read_path: string
  }

export interface search_bar_props {
    service : RequestService
    setItems: Dispatch<SetStateAction<never[]>>
    offset: Number
    limit: Number
    path: string
}

export interface item{
  title: string
  description: string
  total_hours: undefined | string 
  datetime_: undefined | string
}

export interface items_props {
  items: [item]
  item_link: string
} 

export interface create_item_args {
  path: string
}

export interface update_item_props {
  service: RequestService
  title: string
  description: string
}