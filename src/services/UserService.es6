class UserService {

	name;

	saveUser(userName){
		this.name = userName;
	}

	getUser(){
		return new Promise((resolve, reject)=>{
			if(!this.name)
				return reject();

			resolve(this.name);
		});
	}
}

const userService  = new UserService();

export default userService;