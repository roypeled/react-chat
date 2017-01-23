import $ from "jquery";

class ChatService {

	getMessages(fromMessageNumber = 0){
		return $.get(`:8000/poll?counter=${fromMessageNumber}`)
			.then((response) => JSON.parse(response) )
	}

	sendMessage(message, user){
		return $.ajax({
			url: `:8000/message`,
			method: "POST",
			data: { user, message },
			dataType: "application/x-www-form-urlencoded"
		})
			.then((response) => JSON.parse(response) )
	}
	
}

const chatService  = new ChatService();

export default chatService;