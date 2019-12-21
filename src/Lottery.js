import React from 'react';
import {Link} from 'react-router-dom';

let updateInterval = 50;

let randrange = (n) => {
  return Math.floor(Math.random()*n);
}

class Lottery extends React.Component {
	state = {running: false,
    currentWinner: undefined,
    inGracePeriod: false};

  componentDidUpdate(prevProps, prevState) {
    if (this.state.running !== prevState.running) {
      this.startGracePeriod();
    }

		if (this.state.running) {
      setTimeout(this.onWinnerUpdate, updateInterval);
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
  }

  onSave = () => {
    this.props.onListChange("winners",
      this.props.winners.concat([this.state.currentWinner]));
  }

  startGracePeriod = () => {
    this.setState({inGracePeriod: true});
    setTimeout(() => {this.setState({inGracePeriod: false})},
      this.props.gracePeriod  * 1000);
  }

	render = () => {
    let startButton = (
			<button
          onClick={() => this.setState({running: true})}
          className="btn btn-primary mx-2"
          disabled={this.state.inGracePeriod || !this.canStart()}>
        Start
      </button>);
    let stopButton = (
			<button
          onClick={() => this.setState({running: false})}
          className="btn btn-danger mx-2"
          disabled={this.state.inGracePeriod}>
        Stop
      </button>
    );

    let lotteryNumber = (
      <p className="lotteryNumber">
        {this.state.currentWinner?
          this.state.currentWinner:
          "Ready"}
      </p>);

		return (
		<div className="section">
      {/* Lottery number */}
      {this.canStart()?
        lotteryNumber:
        <div class="alert alert-warning">
          There's no valid participant. Please check settings.
          Note that, because past winners can't win again, the game can't continue
          if all participants have win. In this case, please clear the winner list.
        </div>}

      {/* Buttons */}
      <div className="text-center" role="toolbar">
        {this.state.running?
          stopButton:
          startButton}
        <button
            className="btn btn-info mx-2"
            disabled={this.state.running
              || this.state.currentWinner === undefined
              || this.props.winners.includes(this.state.currentWinner)}
            onClick={this.onSave}>
          Save
        </button>
        <Link to="/settings" className="btn btn-info mx-2">Settings</Link>
      </div>
		</div>)
	}
}

export default Lottery;