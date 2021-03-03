import React from 'react'
import {AppContext} from '../App/AppProvider'

// eslint-disable-next-line import/no-anonymous-default-export
export default function({name,children}){
    return<AppContext.Consumer>
            {({page}) => {
                if(page !== name){
                    return null;
                }
                return <div> {children} </div>
            }}
        </AppContext.Consumer>   
}