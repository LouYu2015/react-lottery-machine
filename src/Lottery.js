import React from 'react';
import {Link} from 'react-router-dom';

let updateInterval = 50;

let randrange = (n) => {
  return Math.floor(Math.random()*n);
}

class Lottery extends React.Component {
	state = {running: false,
    currentWinner: "ab"};

  componentDidUpdate(prevProps, prevState) {
    if (this.state.running && !prevState.running) {
      this.onWinnerUpdate();
    }
  }
    
	onWinnerUpdate = () => {
    let winner;
    let participants = this.props.participants;
    let winners = this.props.winners;
    if (winners.length >= participants.length) {
      this.setState({running: false});
      return;
    }

		do {
			winner = participants[randrange(participants.length)];
		} while (winners.includes(winner));
		this.setState({currentWinner: winner});
		if (this.state.running) {
      setTimeout(this.onWinnerUpdate, updateInterval);
		}
  }

  onSave = () => {
    console.log(this.props.winners);
    this.props.onListChange("winners",
      this.props.winners.concat([this.state.currentWinner]));
  }

	render = () => {
    let startButton = (
			<button
          onClick={() => this.setState({running: true})}
          className="btn btn-outline-primary">
        Start
      </button>);
    let stopButton = (
			<button
          onClick={() => this.setState({running: false})}
          className="btn btn-outline-primary">
        Stop
      </button>
    );

		return (
		<div>
			<p>
				{this.state.currentWinner?
					this.state.currentWinner:
					"Please Press Start"}
			</p>
      {this.state.running?
        stopButton:
        startButton}
			<button
          className="btn btn-outline-primary"
          onClick={this.onSave}>
        Save
      </button>
			<Link to="/settings">
				<button
            className="btn btn-outline-primary">
          Settings
        </button>
			</Link>
		</div>)
	}
}

export default Lottery;