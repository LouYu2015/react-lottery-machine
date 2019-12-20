import React from 'react';
import {Link} from 'react-router-dom';
import './BatchAdd'
import BatchAdd from './BatchAdd';

class Settings extends React.Component {
	onListTextboxChange = (event) => {
		this.props.onListChange(event.target.name,
			event.target.value.split("\n"));
	}

	onClear = (event) => {
		this.props.onListChange(event.target.name,
			[]);
	}

	onExit = (event) => {
		this.props.onListChange("participants",
			this.props.participants.filter(str => str.length > 0));
		this.props.onListChange("winners",
			this.props.winners.filter(str => str.length > 0));
	}

	render = () => {
		return (
			<div>
				<Link to="/about">
				<button
					onClick={this.onExit}>
						Back
				</button>
				</Link>
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

				<BatchAdd />

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