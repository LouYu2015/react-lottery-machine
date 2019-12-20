import React from 'react';
import {Link} from 'react-router-dom';

class Lottery extends React.Component {
    state = {running: false,
        currentWinner: "ab"};
    
    

    render = () => {
        return (
        <div>
            <p>
                {this.state.currentWinner?
                    this.state.currentWinner:
                    "Please Press Start"}
            </p>
            <button>Start</button>
            <button>Save</button>
            <Link to="/settings">
                <button>Settings</button>
            </Link>
        </div>)
    }
}

export default Lottery;