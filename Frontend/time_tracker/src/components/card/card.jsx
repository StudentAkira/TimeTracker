import React from 'react';
import './card.css'

function Card(data) {

  return (
    <div className="card">
        <h2 className='card_title'>{data.title}</h2>
        <p className='card_content'>{data.content}</p>
        <h2 className='card_additional_data'>{data.additional_data}</h2>
    </div>
  );
}

export default Card;
