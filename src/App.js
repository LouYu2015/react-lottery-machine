import React from 'react';
import './App.css';
import './Settings/Settings'
import Settings from './Settings/Settings';
import Lottery from './Lottery'
import { Route, Router } from 'react-router-dom';

class App extends React.Component {
  state = {participants: [],
      winners: [],
      gracePeriod: 1};

  onListChange = (listName, content) => {
    this.setState({[listName]: content});
  }

  onGracePeriodChange = (gracePeriod) => {
    console.log(gracePeriod);
    this.setState({gracePeriod: gracePeriod});
  }

  render = () => {
    return (
      <div>
        <Route exact path="/settings">
          <Settings
            onListChange={this.onListChange}
            onGracePeriodChange={this.onGracePeriodChange}
            participants={this.state.participants}
            winners={this.state.winners}
            gracePeriod={this.state.gracePeriod} />
        </Route>
        <Route exact path="/">
          <Lottery
            onListChange={this.onListChange}
            participants={this.state.participants}
            winners={this.state.winners}
            gracePeriod={this.state.gracePeriod} />
        </Route>
      </div>
    );
  }
}

export default App;
