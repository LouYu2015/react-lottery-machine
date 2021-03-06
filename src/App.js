import React from 'react';
import './App.css';
import './Settings/Settings'
import Settings from './Settings/Settings';
import Lottery from './Lottery'
import About from './About'
import { Route, Switch, Link } from 'react-router-dom';

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
        <Switch>
          <Route exact path="/settings">
            <Settings
              onListChange={this.onListChange}
              onGracePeriodChange={this.onGracePeriodChange}
              participants={this.state.participants}
              winners={this.state.winners}
              gracePeriod={this.state.gracePeriod} />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route>
            <Lottery
              onListChange={this.onListChange}
              participants={this.state.participants}
              winners={this.state.winners}
              gracePeriod={this.state.gracePeriod} />
          </Route>
        </Switch>
        <div class="footer">
          <p>
            Copyright 2019 Yu Lou. <Link to="/about">About</Link>
          </p>
        </div>
      </div>
    );
  }
}

export default App;
