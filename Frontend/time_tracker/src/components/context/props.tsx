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
  items: [{
    title: string
    description: string
    total_hours: undefined | string 
    datetime_: undefined | string
  }]
  item_link: string
} 