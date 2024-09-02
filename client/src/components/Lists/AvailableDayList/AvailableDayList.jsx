import * as React from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

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
	"Monday ",
	"Tuesday ",
	"Wednesday ",
	"Thursday ",
	"Friday ",
	"Saturday ",
	"Sunday ",
];

function getStyles(name, personDays, theme) {
	return {
		fontWeight:
			personDays.indexOf(name) === -1
				? theme.typography.fontWeightRegular
				: theme.typography.fontWeightMedium,
	};
}

export default function AvailableDayList({ personDays, setpersonDays }) {
	const theme = useTheme();

	const handleChange = (event) => {
		const {
			target: { value },
		} = event;
		setpersonDays(typeof value === "string" ? value.split(",") : value);
	};

	return (
		<div>
			<FormControl sx={{ width: 500 }}>
				<InputLabel id="demo-multiple-days-label">Days*</InputLabel>
				<Select
					labelId="demo-multiple-days-label"
					multiple
					id="demo-multiple-days"
					value={personDays}
					onChange={handleChange}
					input={<OutlinedInput label="Days" />}
					MenuProps={MenuProps}
				>
					{names.map((days) => (
						<MenuItem
							key={days}
							value={days}
							style={getStyles(days, personDays, theme)}
						>
							{days}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</div>
	);
}
