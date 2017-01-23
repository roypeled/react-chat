import {Component} from "react";
import Messages from "./messages.jsx";
import SendMessage from "./sendMessage.jsx";
import ChatService from "../services/ChatService.es6";
import UserService from "../services/UserService.es6";

export default class Chat extends Component {

	constructor(){
		super();
		this.state = {
			messages: []
		};

		this.getMessages();
		this.getUser();
	}

	getUser(){
		UserService.getUser()
			.then(this.onUser.bind(this));
	}

	getMessages(){
		ChatService.getMessages(this.state.messages.length)
			.then(this.onMessages.bind(this));
	}

	onUser(user){
		this.setState({userName: user});
	}

	onMessages(messages){
		messages = this.state.messages.concat(messages);
		this.setState({messages: messages});

		this.getMessages();
	}
	
	sendMessage(message){
		ChatService.sendMessage(message, this.state.userName);
	}

	render(){
		return (
			<div>
				<Messages list={this.state.messages}/>
				<SendMessage onSend={this.sendMessage.bind(this)} userName={this.state.userName}/>
			</div>
		)
	}
}