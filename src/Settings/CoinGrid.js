import { coinList } from "cryptocompare";
import React from "react";
import styled, {css} from "styled-components";
import { AppContext } from "../App/AppProvider";
import {Tile, SelectableTile} from "../Shared/Tile";
import CoinTile from "./CoinTile";

export const CoinGridStyled = styled.div`
    display:grid;
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
    grid-gap: 15px;
`

const getLowerSectionCoins = (filteredCoins) => {
    return (filteredCoins && Object.keys(filteredCoins)) || Object.keys(coinList).slice(0, 100)
}

const getCoinsToDisplay = (coinList, topSection, favorites, filterCoins) => {
    return topSection ? favorites : getLowerSectionCoins(coinList, filterCoins);
}

const CoinGrid = ({topSection}) => {
    return (
        <AppContext.Consumer>
            {({coinList, favorites, filteredCoins}) => <CoinGridStyled>
                {getCoinsToDisplay(coinList, topSection, favorites, filteredCoins).map((coinKey) => <CoinTile topSection={topSection} coinKey={coinKey}/>)}
            </CoinGridStyled>}
        </AppContext.Consumer>)
}

export default CoinGrid;