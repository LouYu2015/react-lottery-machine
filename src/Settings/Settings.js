import React from 'react';
import {Link} from 'react-router-dom';
import './BatchAdd'
import BatchAdd from './BatchAdd';

class Settings extends React.Component {
  /**
   * props:
   *   participants: a list of strings for participants' name
   *   winners: a list of strings for winners' name
   *   onListChange(listName, content): callback when the list changes.
   *     listName is the name of list that changes.
   *     content is the new list.
   */

  // Called when the user edits the list
	onListTextboxChange = (event) => {
		this.props.onListChange(event.target.name,
			event.target.value.split("\n"));
  }
  
  // Called when the user edits grade period
  onGracePeriodChange = (event) => {
    let newValue = event.target.value;
    if (newValue >= 0) {
      this.props.onGracePeriodChange(event.target.value);
    }
  }

  // Called when the user click "clear"
	onClear = (event) => {
		this.props.onListChange(event.target.name,
			[]);
	}

  // Called before exiting settings page
	onExit = (event) => {
		this.props.onListChange("participants",
			this.props.participants.filter(str => str.length > 0));
		this.props.onListChange("winners",
			this.props.winners.filter(str => str.length > 0));
  }
  
  // Called when adding a range of numbes
  // nameList: a list of strings for participants
  onBatchAdd = (nameList) => {
	this.props.onListChange("participants",
	  this.props.participants.concat(nameList));
  }

	render = () => {
    let exitButton = (
				<p>
        <Link
            to="/"
            className="btn btn-primary"
            onClick={this.onExit}>
          Back
        </Link>
      </p>)

		return (
			<div className="section">
		    {/* Exit button */}
        {exitButton}

		    {/* Participants list */}
        <h1>Participants</h1>
        <p>
          Numbers or names listed here will be selected.
          Please enter each entry on a seperate line.
        </p>
				<p>
					<textarea
						name="participants"
						value={this.props.participants.join("\n")}
						onChange={this.onListTextboxChange} />
        <br />
        <button
          className="btn btn-danger"
          name="participants"
          onClick={this.onClear}>
            Clear
        </button></p>

        <hr />

		    {/* Batch add */}
        <h1>Batch import</h1>
				<BatchAdd onAdd={this.onBatchAdd}/>

        <hr />

	    	{/* Winner list */}
        <h1>Winner History</h1>
				<p>
          When you click "save", the winner will be saved to this list.
          Those winners won't be selected again.
        </p>
        <textarea
          name="winners"
          value={this.props.winners.join("\n")}
          onChange={this.onListTextboxChange} />
        <button
            className="btn btn-danger"
            name="winners"
            onClick={this.onClear}>
          Clear
        </button>
        
        <hr />

        {/* Error prevention */}
        <h1> Error Prevention </h1>
        <p><label>
          Ignore consecutive button presses within
          <input
            type="number"
            value={this.props.gracePeriod}
            onChange={this.onGracePeriodChange} />
            seconds.
        </label></p>
        {exitButton}
			</div>)
	}
}

export default Settings;