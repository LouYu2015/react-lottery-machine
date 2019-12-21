import React from 'react';
import {Link} from 'react-router-dom';

let updateInterval = 50;

let randrange = (n) => {
  return Math.floor(Math.random()*n);
}

class Lottery extends React.Component {
	state = {running: false,
    currentWinner: undefined};

  componentDidUpdate(prevProps, prevState) {
    if (this.state.running && !prevState.running) {
      this.onWinnerUpdate();
    }
  }

  canStart = () => {
    let participants = this.props.participants;
    let winners = this.props.winners;
    return winners.length < participants.length;
  }
    
	onWinnerUpdate = () => {
    let winner;
    let participants = this.props.participants;
    let winners = this.props.winners;
    if (!this.canStart()) {
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
    this.props.onListChange("winners",
      this.props.winners.concat([this.state.currentWinner]));
  }

	render = () => {
    let startButton = (
			<button
          onClick={() => this.setState({running: true})}
          className="btn btn-primary mx-2"
          disabled={!this.canStart()}>
        Start
      </button>);
    let stopButton = (
			<button
          onClick={() => this.setState({running: false})}
          className="btn btn-danger mx-2">
        Stop
      </button>
    );

		return (
		<div className="section">
      {/* Lottery number */}
			<p className="lotteryNumber">
				{this.state.currentWinner?
					this.state.currentWinner:
					"Ready"}
			</p>

      {/* Buttons */}
      <div className="text-center" role="toolbar">
        {this.state.running?
          stopButton:
          startButton}
        <button
            className="btn btn-info mx-2"
            disabled={this.state.running || this.state.currentWinner == undefined}
            onClick={this.onSave}>
          Save
        </button>
        <Link to="/settings" className="btn btn-info mx-2">Settings</Link>
      </div>
		</div>)
	}
}

export default Lottery;