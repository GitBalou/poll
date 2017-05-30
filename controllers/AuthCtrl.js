//const userService = require(userService);

class AuthCtrl
{
    constructor(userService)
    {
        this._userService = userService;
    }

    registerAction(req, res)
    {
        if(!req.params.email)
            res.status(400).json({message: "le mail n'est pas renseigné"});

        if(!req.params.email.match(
            /[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
            ))
            res.status(400).json({message: "le mail n'est pas valide"});

        res.status(201).json({message: "Success", data: {email: req.params.email}})
    }

    authAction(req, res)
    {
        if(!req.params.email)
            res.status(400).json({message: "Le mail n'est pas renseigné"});

        if(!req.params.email.match(
                /[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
            ))
            res.status(400).json({message: "le mail n'est pas valide"});

        if(!req.params.password)
            res.status(400).json({message: "Le mot de passe n'est pas renseigné"});

        if(!this._userService.authentificate(req.params.email, req.params.password))
            res.status(401).json({message: "Cet utilisateur n'existe pas"});

        res.json({message: "Success", data: {user: {email: req.params.email}, token: "I gno wouat u mean here"}})
    }
}

module.exports = AuthCtrl;