import React from 'react'
import './Small_Card_Edit.css'

import Wifi from "../../../src/assets/images/icons_2/1.png"
import Clean from "../../../src/assets/images/icons_2/2.png"
import Clim from "../../../src/assets/images/icons_2/3.png"
import Snack from "../../../src/assets/images/icons_2/4.png"
import Coffee from "../../../src/assets/images/icons_2/8.png"
import Pleasant from "../../../src/assets/images/icons_2/7.png"
import ClearIcon from '@mui/icons-material/Clear';

function Small_Card_Edit ({ tag }) {

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
    default:
      break;
  }

  return (
    <>
    <ClearIcon size ={"large"} className='small_card_delete' />
    <div className='small_card'>
      <img src={img} alt='' />
      <div className='small_card__info'>
        <h2>{tag}</h2>
      </div>
    </div>
    </>
  )
}
export default Small_Card_Edit
