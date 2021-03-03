import React from "react";
import styled, {css} from "styled-components";
import { AppContext } from "./AppProvider";

const Logo = styled.div`
    font-size: 1.5em;
`

const Bar = styled.div`
    display: grid;
    grid-template-columns: 4fr auto 1fr 1fr;
    margin-bottom: 40px
`
const ControlButtonElement = styled.div`
    cursor: pointer;
    ${props => props.active && css `
        text-shadow: 0px 0px 60px #03ff03
    `}
`

const toProperCase = (lower) => {
    return lower.charAt(0).toUpperCase() + lower.substr(1)
}

const ControlButton = ({name}) => {
    return (
        <AppContext.Consumer>
            {({page, setPage}) => (
                <ControlButtonElement 
                    active={page === name}
                    onClick={() => {}}
                >
                    {toProperCase(name)}
                </ControlButtonElement>)
            }
        </AppContext.Consumer>
    )
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function(){
    return (
        <Bar>
            <Logo> Cryptodash </Logo>
            <div></div>
            <ControlButton active name="dashboard"/>
            <ControlButton name="settings"/>
        </Bar>
    )
}