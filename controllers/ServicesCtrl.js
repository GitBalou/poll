class ServicesCtrl
{
    constructor(PollService, UserService) {
        this._pollService = PollService;
        this._userService = UserService;
    }

    statsAction(req, res) {
        if( !req.params.id) {
            res.status(500).json({message:'Error'});
        }
        
        const poll =  this._pollService.getPollFromPollId( req.params.id);
        if( poll.length == 0 ) {
            res.status(404).json({message:'Error', data: []});
        }

        const stats = this._pollService.getUserInfoForPoll(poll);

        res.status(200).json({message:'Success', data: stats});
    }

    listsAction(req, res) {
        if( !req.params.id) {
            res.status(200).json({message:"Success", data:['a', 'b']});
            return;
        }

        if( this._pollService.getPollFromUserId( req.params.id ).length == 0 ) {
            res.status(404).json({message:'Error', data: []});
            return;
        }

        res.status(200).json({message:"Success", data: [{userId: req.params.id}, {userId: req.params.id}]});
    }
}

module.exports = ServicesCtrl;