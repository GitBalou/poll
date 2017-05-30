//const _ = require('underscore');

class PollsCtrl {
    constructor(fs) {
        this._fs = fs;
    }

    postPoll(req, res) {

        console.log(req);
        
        if(req.body.question === null) {
            res.json('question_required');
        }

        if(req.body.question === 'Compliqué') {
            res.json('question OK');
        }

        if(req.body.question === '') {
            res.json('question_required');
        }

        if(req.body.response1 === null || req.body.response2 === null) {
            res.json('responses_required');
        }else if(req.body.response1 === '' || req.body.response2 === '') {
            res.json('responses_required');
        }

        if(req.body.question !== null && req.body.response1 !== null && req.body.response2 !== null) {
            res.json("Tout est OK");
        }
        
    }
   
}

module.exports = PollsCtrl;