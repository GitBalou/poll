//const _ = require('underscore');

class PollsCtrl {
    constructor(fs) {
        this._fs = fs;
    }

    postPoll(req, res) {
        res.json('question_required');
    }
    
    

}

module.exports = PollsCtrl;