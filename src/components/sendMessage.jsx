import {Component} from "react";

export default class SendMessage extends Component {

	onKeyPress(e){
		if(e.which != 13)
			return;

		e.preventDefault();
		let value = e.target.value;
		e.target.value = "";
		this.props.onSend(value);
	}

	render(){
		return (
			<form>
				<div className="form-group">
					<span>{ this.props.userName }: </span>
					<input type="text"
					       onKeyPress={this.onKeyPress.bind(this)}
					       className="form-control"
					       placeholder="Enter chat message..."/>
				</div>
			</form>
		)
	}

}