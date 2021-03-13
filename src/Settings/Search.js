import React from "react";
import styled from "styled-components";
import fuzzy from "fuzzy";
import _ from "lodash";

import { backgroundColor2, fontSize2 } from "../Shared/Styles";
import { AppContext  } from "../App/AppProvider";

const SearchGrid = styled.div`
    display: grid;
    grid-template-columns: 200px 1fr;
`

const SearchInput = styled.input`
    ${backgroundColor2}
    ${fontSize2}
    border: 1px solid;
    height: 25px;
    place-self: center left;
    color: #1163c9;
`

// eslint-disable-next-line no-undef
const handleFilter = _.debounce((inputValue, coinList, setFilteredCoins) => {
    let coinSymbols = Object.keys(coinList);
    let coinNames = coinSymbols.map(sym => coinList[sym].CoinName);
    let allStringsToSearch = coinSymbols.concat(coinNames);
    let fuzzyResults = fuzzy
        .filter(inputValue, allStringsToSearch, {})
        .map(result => result.string);

    let filteredCoins = _.pickBy(coinList, (result, symKey) => {
        let coinName = result.CoinName
        return (
            _.includes(fuzzyResults, symKey) || _.includes(fuzzyResults, coinName)
            );
        });
        setFilteredCoins(filteredCoins);
}, 500);

const filterCoins = (e, setFilteredCoins, coinList) => {
    
    console.log(setFilteredCoins);

    let inputValue = e.target.value;
    if(!inputValue){
        setFilteredCoins(null);
        return;
    }
    handleFilter(inputValue, coinList, setFilteredCoins);   
};

const Search = () => (
        <AppContext.Consumer>
                {({setFilteredCoins, coinList}) => (
                    <SearchGrid>
                        <h2>Search all coins</h2>
                        <SearchInput 
                            onKeyUp={e => filterCoins(e, setFilteredCoins, coinList)}
                        />
                    </SearchGrid>
                )}
        </AppContext.Consumer>
)

export default Search;