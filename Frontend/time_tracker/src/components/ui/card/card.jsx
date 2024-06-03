import React from 'react';
import './card.css'

function Card(props) {

  return (
    <div className="card">
        <div className='card_title'>{props.title}</div>
        <div className="card_description">{props.description}</div>
        <div className="card_additional_data">{props.additional_data}</div>
    </div>
  );
}

export default Card;
