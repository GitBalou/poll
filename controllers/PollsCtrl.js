//const _ = require('underscore');

class PollsCtrl {
    constructor(fs) {
        this._fs = fs;
    }

    postPoll(req, res) {

        // Questions :
        if(req.body.question === null) {
            res.json('question required');
        }

        if(req.body.question === 'Compliqué') {
            res.json('question OK');
        }

        if(req.body.question === '') {
            res.json('question must be fill');
        }

        // Responses :
        if(req.body.response1 === null || req.body.response2 === null) {
            res.json('responses required');
        }else if(req.body.response1 === '' || req.body.response2 === '') {
            res.json('responses required');
        }

        // Questions & responses
        if(req.body.question !== null && req.body.response1 !== null && req.body.response2 !== null) {
            res.json("Tout est OK");
        }
        
        
    }
   
}

module.exports = PollsCtrl;