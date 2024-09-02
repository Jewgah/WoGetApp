// import { Button } from '@mui/material'
import React from "react";
import "./SearchPage.css";
import SearchResult from "../../components/SearchResult/SearchResult";
import { useSelector } from "react-redux";
import { getAverage } from "../../lib/outilsForms";

//TODO :REMPLACER LES POST EN DUR PAR UNE IMPORTATION DE LA DB AVEC L'APPEL API GETALLPOST

function SearchPage() {
	const results = useSelector((state) => state.search.results);

	return (
		<div className="searchPage">
			<div className="searchPage__info">
				<h1>Stays nearby</h1>
			</div>
			{results.length === 0 ? (
				<div
					className="searchPage__noResult"
					style={{ textAlign: "center" }}
				>
					<h1>No results found</h1>
				</div>
			) : null}
			{results.length > 0 &&
				results?.map((item, key) => (
					<SearchResult
						key={key}
						id={item._id}
						img={item.pictures[0]}
						location="Professional WorkPlace"
						title={item.title}
						description={item.description}
						star={getAverage(item?.rate).toFixed(2)}
						total={"Days"}
						price={`₪ ${item?.pricebyday}`}
					/>
				))}
		</div>
	);
}

export default SearchPage;
