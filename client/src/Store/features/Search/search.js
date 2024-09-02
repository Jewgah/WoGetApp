import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setResults, setSearch } from "./searchSlice";
import PostService from "../../../services/Api/Controllers/PostService";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import DateRangePickerCustom from "../../../components/DateP/DateP";

export default function SearchForm() {
	const dispatch = useDispatch();
	const [city, setCity] = useState("");
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [guest, setGuest] = useState("");
	const submitSearch = (e) => {
		e.preventDefault();
		console.log(city);
		const city_ = city?.label?.split(",")[0];
		const data = {
			city: city_,
			startDate,
			endDate,
			guest,
		};
		dispatch(setSearch(data));
		PostService.searchPost(data)
			.then((resp) => dispatch(setResults(resp)))
			.catch(() => dispatch(setResults([])));
	};
	return (
		<>
			<form className="flex-form">
				<div className="searchField">
					<GooglePlacesAutocomplete
						// styles={ styles }
						minLength={2}
						autoFocus={false}
						fetchDetails={true}
						apiKey={$apikey}
						autocompletionRequest={{
							componentRestrictions: {
								country: ["il"],
							},
							types: ["(cities)"],
						}}
						selectProps={{
							city,
							onChange: setCity,
							placeholder: "City",
							isClearable: true,
							styles: {
								control: (base, state) => ({
									...base,
									background: "white",
									borderColor: "white",
									borderWidth: 0,
									borderRadius: state.isFocused
										? "3px 3px 0 0"
										: 3,
								}),
								menu: (base) => ({
									...base,
									borderRadius: 0,
									marginTop: 0,
									borderColor: "transparent",
									borderWidth: 0,
								}),
								menuList: (base) => ({
									...base,
									padding: 0,
									background: "black",
									zIndex: 999,
									opacity: 1,
									borderColor: "transparent",
									borderWidth: 0,
								}),
								option: (base, state) => ({
									...base,
									background: state.isSelected
										? "black"
										: state.isFocused
										? "white"
										: "black",
									color: state.isSelected
										? "black"
										: state.isFocused
										? "black"
										: "white",
									padding: "10px",
									fontSize: "1.2rem",
									fontWeight: "bold",
									borderRadius: 0,
									borderColor: "transparent",
									borderWidth: 0,
								}),
							},
						}}
					/>
				</div>
				<DateRangePickerCustom
					startDate={startDate}
					setStartDate={setStartDate}
					endDate={endDate}
					setEndDate={setEndDate}
				/>
				<input
					type="number"
					placeholder="Guests"
					onChange={(e) => setGuest(e.target.value)}
				/>
				<button type="submit" onClick={submitSearch}>
					Search
				</button>
			</form>
		</>
	);
}
