import React from "react";

// eslint-disable-next-line import/no-anonymous-default-export
export default function({coin, style}) {
    return (
        <img 
            alt={coin.CoinSymbol}
            style = {style || {height: '80px'}}
            src={'https://' + `cryptocompare.com/${coin.ImageUrl}`}
        />
    )
}