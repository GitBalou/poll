class UserService {
    constructor(userModel)
    {
        this._userModel = userModel;
    }

    authentificate(email, password)
    {
        let bool = false;

        if(email === "good@email.fr")
            bool = true;

        if(email === "wrong@email.fr")
            bool = false;

        if(password === "wrong")
            bool = false;

        return bool;
    }

    register(email, password)
    {
        let bool = false;

        if(email === "good@email.fr")
            bool = true;


        return bool;
    }
}

module.exports = UserService;