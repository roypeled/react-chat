import {Component} from "react";
import UserService from "../services/UserService.es6";

export default class Login extends Component {

	saveUser(){
		UserService.saveUser(this.nameInput.value);
		this.props.onLoggedIn();
	}

	render(){
		return (
			<div className="jumbotron">
				<h1>Enter Your Name</h1>
				<p>
					<input type="text"
					       className="form-control"
					       ref={(input) => { this.nameInput = input; }} />
				</p>
				<p>
					<a className="btn btn-primary btn-lg"
					   onClick={()=> this.saveUser() }>Login</a>
				</p>
			</div>
		)
	}
} 