import StarRateIcon from "@mui/icons-material/StarRate";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import React from "react";
import "./SearchResult.css";
import { useNavigate } from "react-router-dom";

function SearchResult({
	img,
	location,
	title,
	description,
	star,
	price,
	total,
	id,
}) {
	let navigate = useNavigate();
	function handleClick() {
		navigate(`/product/${id}`);
	}
	return (
		<div className="searchResult" onClick={handleClick}>
			<img src={`data:image/png;base64,${img}`} />
			<FavoriteBorderIcon className="searchResult__heart" />

			<div className="searchResult__info">
				<div className="searchResult__infoTop">
					<p>{location}</p>
					<h3>{title}</h3>
					<p>{description}</p>
				</div>
				<div className="searchResult__infoBottom">
					<div className="searchResultat__stars">
						<StarRateIcon className="searchResultat__star" />
						<p>
							<strong>{star}</strong>
						</p>
					</div>
					<div className="searchResult__price">
						<h2>{price}</h2>
						<p>{total}</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SearchResult;
