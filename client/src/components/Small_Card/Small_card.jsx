import React from 'react'
import './Small_card.css'

import Wifi from "../../../src/assets/images/icons_2/1.png"
import Clean from "../../../src/assets/images/icons_2/2.png"
import Clim from "../../../src/assets/images/icons_2/3.png"
import Snack from "../../../src/assets/images/icons_2/4.png"
import Coffee from "../../../src/assets/images/icons_2/9.png"
import Pleasant from "../../../src/assets/images/icons_2/7.png"
import Plus from "../../../src/assets/images/icons_2/8.png"

function Small_card ({ tag }) {

  let img = Wifi;
  switch (tag) {
    case "Pleasant  ❤️":
      img = Pleasant;
      break;
      case "coffee ☕":
      img = Coffee;
      break;
      case "Snack 🌮":
      img = Snack;
      break;
    case "Wifi 📶  🔴 (1-15 Mb/s)":
      img = Wifi;
      break;
    case "Wifi 📶  🟠 (15-100 Mb/s)":
      img = Wifi;
      break;
    case "Wifi 📶  🟢 (100 &+ Mb/s)":
      img = Wifi;
      break;
      case "Air Conditioning ❄️  ":
        img = Clim;
        break;
    case "Cleanliness  🧹":
        img = Clean;
        break;
    case "Add":
      img = Plus;
        break;
    default:
      break;
  }

  return (
    <div className='small_card'>
      <img src={img} alt='' />
      <div className='small_card__info'>
        <h2>{tag}</h2>
      </div>

    </div>
  )
}
export default Small_card
