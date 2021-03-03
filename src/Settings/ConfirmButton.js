import React from "react";
import styled from 'styled-components'
import {AppContext} from '../App/AppProvider'

const ConfirmButtonSyled = styled.div`
    margin: 20px;
    color: green;
    cursor: pointer;
`

export const CenterDiv = styled.div`
    display:grid;
    justify-content:center;
`

// eslint-disable-next-line import/no-anonymous-default-export
export default function(){
    return  <AppContext.Consumer>
            {({confirmFavorites}) =>  
                <CenterDiv>
                    <ConfirmButtonSyled onClick={confirmFavorites}>
                        Confirm Favorites
                    </ConfirmButtonSyled>
                </CenterDiv>
        }
        </AppContext.Consumer>
    
}