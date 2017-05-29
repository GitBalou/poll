const _ = require('lodash');

class ResponsesCtrl {

    constructor(pollService, userService) {
        this._pollService = pollService;
        this._userService = userService;
    }

    addResponseToPoll(req, res) {

        if( _.isEmpty(req.params) || !req.params.id) {
            res.status(400).json({message:"l'id du sondage n'est pas spécifiée"});
            return;
        }

        if( _.isEmpty(req.body)) {
            res.status(400).json({message:"body invalide"});
            return;
        }

        if( !this._pollService.pollExists(req.params.id) ) {
            res.status(404).json({message:"le sondage n'existe pas"});
            return;
        }

        if( !this._userService.userExist(req.body.user_id) ) {
            res.status(404).json({message:"l'utilisateur spécifié n'existe pas"});
            return;
        }

        if( !this._userService.responseExist(req.body.response_id) ) {
            res.status(404).json({message:"La réponse spécifiée n'existe pas pour ce sondage"});
            return;
        }

        res.status(200).json({message:"success", data: {}});
    }
}

module.exports = ResponsesCtrl;