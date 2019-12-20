import React from 'react';
import {Link} from 'react-router-dom';

class Lottery extends React.Component {
    state = {running: false,
        currentWinners: ["a", "b"]};

    render = () => {
        let currentWinners = this.state.currentWinners;
        let winnerList;
        if (currentWinners.length === 0) {
            winnerList = <p>Please Press Start</p>;
        } else {
            winnerList = [];
            currentWinners.forEach((winner, i) => {
                winnerList.push(<p key={i}>{winner}</p>)
            });
        }

        return (
        <div>
            {winnerList}
            <button>Start</button>
            <button>Save</button>
            <Link to="/settings">
                <button>Settings</button>
            </Link>
        </div>)
    }
}

export default Lottery;