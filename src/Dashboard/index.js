import React from 'react'
import Page from "../Shared/Page";
import PriceGrid from './PriceGrid'

// eslint-disable-next-line import/no-anonymous-default-export
export default function(){
    return <Page name='dashboard'>
        <PriceGrid/>
    </Page>
}