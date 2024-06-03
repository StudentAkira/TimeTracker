import Card from "../card/card";
import "./items_section.css"


function Items(props){
    return (
    <div className="items">
        {
            props.items.map(
                (item) => (
                    <div className="item_wrapper">
                        <Card 
                            title={
                            // <a href={`${frontURLs.note}/${item.title}`}>{item.title}</a>
                            <a href={`${props.item_link}/${item.title}`}>{item.title}</a>
                            } 
                            description={
                                item.description
                                } 
                            additional_data={
                                `${item.datetime_ == undefined ?  item.total_hours : item.datetime_.substring(0, 19)}`
                                }/>
                    </div>
                )
            )
        }
        </div>
    );
}

export default Items;