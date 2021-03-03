import React from 'react'
import { AppContext } from '../App/AppProvider'

/* eslint-disable import/no-anonymous-default-export */
export default function ({firstVisit}) {
    return( 
        <AppContext.Consumer>
            {({firstVisit}) => 
                firstVisit ? <div>
                    Welcome to CryptoDash, please select your favorite coins to begin. {''}
                </div> : null    
            }
        </AppContext.Consumer>
    )
}