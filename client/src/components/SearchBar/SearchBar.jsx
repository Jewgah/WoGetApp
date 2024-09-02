import React from "react";
import SearchForm from "../../Store/features/Search/search";
import './SearchBar.css';

//TODO : REDIRECTION VERS LA PAGE DE RECHERCHE 

export const Cover = ({ children }) => (
  <div className="cover">{children}</div>
)

const SearchBar = () => (
  <Cover>
    <SearchForm />
  </Cover>
);

export default SearchBar;