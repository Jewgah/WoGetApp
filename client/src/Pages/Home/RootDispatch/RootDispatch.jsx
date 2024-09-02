import { isEmpty } from "lodash";
import React from "react";
import { useSelector } from "react-redux";
import SearchPage from "../../SearchPage/SearchPage";
import Home from "../Home";

export default function RootDispatch() {
	const isSearch = useSelector((state) => state.search.current);

	if (!isEmpty(isSearch)) {
		return <SearchPage />;
	} else {
		return <Home />;
	}
}
