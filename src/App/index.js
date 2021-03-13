import React from "react";
import './App.css';
import AppLayout from "./AppLayout";
import AppBar from "./AppBar";
import {AppProvider} from "./AppProvider";
import Settings from "../Settings/index";
import Content from "../Shared/Content";
import { Component } from 'react';
import Dashboard from "../Dashboard";

class App extends Component {
  render(){    
    return ( 
      <AppLayout>
        <AppProvider>
          <AppBar/>
          <Content>
            <Settings/>
            <Dashboard/>
          </Content>
        </AppProvider>
      </AppLayout>
    );
  }
}

export default App;