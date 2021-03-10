import _ from 'lodash';
import React from 'react';

const cc = require('cryptocompare')

export const AppContext = React.createContext();

const MAX_FAVORITES = 10;

export class AppProvider extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            page: 'settings',
            favorites: ['BTC', 'ETH','XMR', 'DOGE'],
            ...this.savedSettings(),
            setPage: this.setPage,
            confirmFavorites: this.confirmFavorites,
            addCoin: this.addCoin,
            isInFavorites: this.isInFavorites,
            removeCoin: this.removeCoin
        }
    }

    isInFavorites = key => _.includes(this.state.favorites, key)

    addCoin = (key) => {
        let favorites = [...this.state.favorites];

        if(favorites.length < MAX_FAVORITES){
            favorites.push(key);
            this.setState({favorites});
        }
    }

    removeCoin = (key) => {
        let favorites = [...this.state.favorites];
        this.setState({favorites:_.pull(favorites, key)})
    }

    componentDidMount = () => {
        this.fetchCoins();
    }

    fetchCoins = async () => {
        let coinList = (await cc.coinList()).Data;
        this.setState({coinList});
    }

    confirmFavorites = () =>{
        this.setState({
            firstVisit:false,
            page:'dashboard'
        });
        localStorage.setItem('cryptoDash', JSON.stringify({
            favorites: this.state.favorites
        }));
    }

    savedSettings(){
        let cryptoDashData = JSON.parse(localStorage.getItem('cryptoDash'))
        if(!cryptoDashData){
            return {page: 'settings', firstVisit: true}
        }
        let {favorites} = cryptoDashData;
        return favorites;
    }

    setPage = page => this.setState({page})

    render(){
        return(
            <AppContext.Provider value={this.state}>
                {this.props.children}
            </AppContext.Provider>
        )
    }
}