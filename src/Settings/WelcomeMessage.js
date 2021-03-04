import React from 'react'
import { AppContext } from '../App/AppProvider'

const WelcomeMessage = () => {
    return (
      <AppContext.Consumer>
        { firstVisit  =>
          firstVisit ? <div>Welcome to Crypto Dashboard. Please select your favorites to begin.</div> : null
        }
      </AppContext.Consumer>
    );
  };
  
export default WelcomeMessage;