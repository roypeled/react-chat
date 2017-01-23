import {Component} from "react";

import "./messages.scss";

export default class Messages extends Component {

	renderMessage(message, i){
		return (
			<li key={i} className="list-group-item">
				<strong>{message.user}:</strong> {message.message}
			</li>
		)
	}

	componentDidUpdate(){
		this.scrollElement.scrollTop = 10000000000;

	}

	render(){
		return (
			<div>
				<ul className="list-group messages"
					ref={ (el) => this.scrollElement = el }>
					{
						this.props.list.map(this.renderMessage.bind(this))
					}
				</ul>
			</div>
		);
	}
}