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

	render = () => {
		return (
			<div>
        {/* Exit button */}
				<Link to="/">
				<button
					onClick={this.onExit}>
						Back
				</button>
				</Link>

        {/* Participants list */}
				<label>
					Participants list:
					<textarea
						name="participants"
						value={this.props.participants.join("\n")}
						onChange={this.onListTextboxChange} />
					<button
						name="participants"
						onClick={this.onClear}>
							Clear
					</button>
				</label>

        {/* Batch add */}
				<BatchAdd />

        {/* Winner list */}
				<label>
					Winners:
					<textarea
						name="winners"
						value={this.props.winners.join("\n")}
						onChange={this.onListTextboxChange} />
					<button
						name="winners"
						onClick={this.onClear}>
							Clear
					</button>
				</label>
			</div>)
	}
}

export default Settings;