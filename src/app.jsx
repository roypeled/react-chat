import {Component} from "react";
import {render} from "react-dom";
import Login from "./components/login.jsx";
import Chat from "./components/chat.jsx";

require("bootstrap/dist/css/bootstrap.css");
require("bootstrap/dist/css/bootstrap-theme.css");

class App extends Component {

	constructor(){
		super();
		this.state = {};
	}

	showChat(){
		this.setState({showChat: true});
	}

	render(){
		if(this.state.showChat)
			return <Chat/>;
		else
			return <Login onLoggedIn={()=> this.showChat() }/>
	}
}

render(<App/>, document.getElementById("app"));

