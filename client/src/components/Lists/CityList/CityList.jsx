import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Tel-Aviv',
  'Netanya', 
  'Hadera',
  'Jerusalem', 
  'Afula',
  'Haifa',
  'Beer-Sheva',

];

function getStyles(name, personCity, theme) {
  return {
    fontWeight:
    personCity.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function CityList({personCity, setPersonCity}) {
  const theme = useTheme();
  const handleChange = (event) => {
    const {target: { value }} = event;
    setPersonCity( typeof value === 'string' ? value.split(',') : value  );
  };

  return (
    <div>
      <FormControl sx={{ width: 500 }}  >
        <InputLabel id="demo-multiple-city-label" >City*</InputLabel>
        <Select
          labelId="demo-multiple-city-label"
          id="demo-multiple-city"
          value={personCity}
          onChange={handleChange}
          input={<OutlinedInput label="City"/>}
          MenuProps={MenuProps}
        >
          {names.map((city) => (
            <MenuItem
              key={city}
              value={city}
              style={getStyles(city, personCity, theme)}
            >
              {city}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}