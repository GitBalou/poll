class UserService {
    constructor(userModel)
    {
        this._userModel = userModel;
    }

    authentificate(email, password)
    {
        let pwd = this._userModel.getUserByEmail(email);
        let bool = false;

        if(pwd.password === password)
            bool = true;


        return bool;
    }

    register(email, password)
    {
        return this._userModel.registerUser(email, password);
    }
}

module.exports = UserService;