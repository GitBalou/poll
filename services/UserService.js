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

    postUser(user)
    {
        return new Promise((resolve, reject) =>
        {
            this._userModel.create(user).then(result => resolve(result)).catch(err => reject(err))
        })
    }

    getUsers()
    {
        return new Promise((resolve, reject) =>
        {
            this._userModel.find({}).then(result => resolve(result)).catch(err => reject(err));
        })
    }

    getUser(query)
    {
        return new Promise((resolve, reject) =>
        {
            this._userModel.findOne(query).then(result => resolve(result)).catch(err => reject(err));
        })
    }

    putUser(query, user)
    {
        return new Promise((resolve, reject) =>
        {
            this._userModel.update(query, user).then(result => resolve(result)).catch(err => reject(err));
        })
    }

    removeUser(query)
    {
        return new Promise((resolve, reject) =>
        {
            this._userModel.remove(query).then(result => resolve(result)).catch(err => reject(err));
        })
    }
}

module.exports = UserService;