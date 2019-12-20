import React from 'react';

class BatchAdd extends React.Component {
	/*
	This component display a form so that the user can add a range of
	numbers to the list.

	props:
		onAdd: callback when the user adds a range of numbers.
			Should accept an array of strings.
	*/
	state = {start: 1, // Start from this number
		last: 10}; // Stop at this number
	
	onChange = (event) => {
		this.setState({[event.target.name]: event.target.value});
	}

	onSubmit = (event) => {
		event.preventDefault();
		let numbers = [];
		let start = this.state.start;
		let last = this.state.last;
		for (let i = start; i <= last; i++) {
			numbers.push(String(i));
		}
		this.props.onAdd(numbers);
	}

	render = () => {
		return (<form>
			<label>
				Start:
				<input
					name="start"
					type="number"
					value={this.state.start}
					onChange={this.onChange} />
			</label>
			<label>
				Last:
				<input
					name="last"
					type="number"
					value={this.state.last}
					onChange={this.onChange} />
			</label>
			<button onClick={this.onSubmit}>
				Add
			</button>
		</form>);
	}
}

export default BatchAdd;