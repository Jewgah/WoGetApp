import React from 'react'
import '../Card/Card.css'
function BannerCard ({ src, title, description, price }) {
  return (
    <div className='card'>
      <img src={src} alt='' />
      <div className='card__info'>
        <h2>{title}</h2>
        <h3>{description}</h3>
        <h4>{price}</h4>
      </div>

    </div>
  )
}
export default BannerCard
