import React from "react";
import { enGB } from "date-fns/locale";
import { DateRangePicker, START_DATE, END_DATE } from "react-nice-dates";
import "react-nice-dates/build/style.css";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { getDaysArray } from "../../lib/outilsForms";
function DateRangePickerCustom({
	startDate,
	setStartDate,
	endDate,
	setEndDate,
	dateOccupied = [],
}) {
	const handleDateChange = (date, type) => {
		const isValid = getDaysArray(startDate, date).every(
			(day) => !dateOccupied.includes(day)
		);
		if (type === START_DATE) {
			if (isValid || startDate === null) {
				setStartDate(date);
			} else {
				setStartDate(null);
				alert("Can't select this date, it's already booked");
			}
		} else if (type === END_DATE) {
			if (isValid) {
				setEndDate(date);
			} else {
				setEndDate(null);
				alert("Can't select this date, it's already booked");
			}
		}
	};
	return (
		<DateRangePicker
			startDate={startDate}
			endDate={endDate}
			onStartDateChange={(date) => handleDateChange(date, START_DATE)}
			onEndDateChange={(date) => handleDateChange(date, END_DATE)}
			minimumDate={new Date()}
			minimumLength={1}
			format="dd MMM yyyy"
			locale={enGB}
			modifiers={{
				disabled: (date) => dateOccupied.includes(date.toDateString()),
			}}
		>
			{({ startDateInputProps, endDateInputProps, focus }) => (
				<>
					<Stack
						direction="row"
						divider={<Divider orientation="vertical" flexItem />}
						spacing={2}
					>
						<TextField
							size="large"
							variant="standard"
							InputProps={{ disableUnderline: true }}
							className={
								"input" +
								(focus === START_DATE ? " -focused" : "")
							}
							{...startDateInputProps}
							placeholder="From"
						/>

						<TextField
							variant="standard"
							InputProps={{ disableUnderline: true }}
							className={
								"input" +
								(focus === END_DATE ? " -focused" : "")
							}
							{...endDateInputProps}
							placeholder="To"
						/>
					</Stack>
				</>
			)}
		</DateRangePicker>
	);
}
export default DateRangePickerCustom;
