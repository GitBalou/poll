const _ = require('underscore');

class PollsCtrl {
    constructor(fs) {
        this._fs = fs;
    }

    pollAction(req, res) {
        if(_.isEmpty(req.params) || _.isEmpty(req.params.name)) {
            req.params.name = 'TOTO';
        }

        if(!isNaN(req.params.name)) {
            res = res.status(404);
        }
    }
}