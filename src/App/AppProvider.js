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
            removeCoin: this.removeCoin,
            setFilteredCoins : this.setFilteredCoins, 
            setCurrentFavorite: this.setCurrentFavorite
        }
    }

    isInFavorites = key => _.includes(this.state.favorites, key)

    addCoin = key => {
        let favorites = [...this.state.favorites];

        if(favorites.length < MAX_FAVORITES){
            favorites.push(key);
            this.setState({favorites});
        }
    }

    removeCoin = key => {
        let favorites = [...this.state.favorites];
        this.setState({favorites:_.pull(favorites, key)})
    }

    componentDidMount = () => {
        this.fetchCoins();
        this.fetchPrices();
    }

    fetchCoins = async () => {
        let coinList = (await cc.coinList()).Data;
        this.setState({coinList});
    }

    fetchPrices = async () => {
        if(this.state.firstVisit) return
        let prices = await this.prices();
        prices = prices.filter(price => Object.keys(price).length);
        this.setState({prices})
    }

    prices = async() => {
        let returnData = [];
        for (let i=0; i < this.state.favorites.length; i++){
            try {
                let priceData = await cc.priceFull(this.state.favorites[i], 'USD');
                returnData.push(priceData)
            }catch (e) {
                console.warn('fetch price err')
            }
        }

        return returnData
    }

    setFilteredCoins = filteredCoins => {this.setState({filteredCoins}); console.log(filteredCoins)};

    setCurrentFavorite = (sym) => {
        this.setState({
            currentFavorite: sym
        });
        localStorage.setItem('cryptoDash', JSON.stringify({
            ...JSON.parse(localStorage.getItem('cryptoDash')),
            currentFavorite: sym
        }));
    }

    confirmFavorites = () =>{

        let currentFavorite = this.state.favorites[0];
 
        this.setState({
            firstVisit:false,
            page:'dashboard',
            currentFavorite,
        }, () => {
            this.fetchPrices();
        });
        localStorage.setItem('cryptoDash', JSON.stringify({
            favorites: this.state.favorites,
            currentFavorite
        }));
    }

    savedSettings(){
        let cryptoDashData = JSON.parse(localStorage.getItem('cryptoDash'))
        if(!cryptoDashData){
            return {page: 'settings', firstVisit: true}
        }
        let {favorites, currentFavorite} = cryptoDashData;
        return {favorites, currentFavorite};
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