import React from 'react';
import './App.css';
import './Settings/Settings'
import Settings from './Settings/Settings';
import { Route, Router } from 'react-router-dom';

class App extends React.Component {
  state = {participants: [],
      winners: []};

  onListChange = (listName, content) => {
    this.setState({[listName]: content});
  }

  render = () => {
    return (
      <div>
        <Route path="/settings">
          <Settings
            onListChange={this.onListChange}
            participants={this.state.participants}
            winners={this.state.winners}/>
        </Route>
        <Route path="/">
          <p> {this.state.winners.join(",")} </p>
        </Route>
      </div>
    );
  }
}

export default App;
