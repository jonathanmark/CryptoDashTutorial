import React from "react";
import styled, {css} from 'styled-components'


const CoinImage = styled.img`
    height: 50px;
    ${props => props.spotlight && css`
        height: 200px;
        margin: auto;
        display: block;
    `}
`

// eslint-disable-next-line import/no-anonymous-default-export
export default function({coin, spotlight}) {
    return (
        <CoinImage
            spotlight={spotlight}
            alt={coin.CoinSymbol}
            src={'https://' + `cryptocompare.com/${coin.ImageUrl}`}
        />
    )
}