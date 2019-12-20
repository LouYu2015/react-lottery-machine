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

	render = () => {
		return (
		<div>
			<p>
				{this.state.currentWinner?
					this.state.currentWinner:
					"Please Press Start"}
			</p>
			<button onClick={() => this.setState({running: true})}>
        Start
      </button>
			<button onClick={() => this.setState({running: false})}>
        Stop
      </button>
			<button>Save</button>
			<Link to="/settings">
				<button>Settings</button>
			</Link>
		</div>)
	}
}

export default Lottery;