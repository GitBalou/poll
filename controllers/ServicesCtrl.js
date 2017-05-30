class ServicesCtrl
{
    statsAction(req, res) {
        if( !req.params.id) {
            res.status(500).json({message:'Error'});
        }
        
        if(req.params.id > 0 ) {
            res.status(404).json({message:'Error'});
        }

        res.status(500).json({message:'Success', data: ['a']});
    }

    listsAction(req, res) {
        if( !req.params.id) {
            res.status(200).json({message:"Success", data:['a', 'b']});
            return;
        }

        if( req.params.id > 0) {
            res.status(404).json({message:'Error'});
            return;
        }

        res.status(200).json({message:"Success", data: [{userId: req.params.id}, {userId: req.params.id}]});
    }
}

module.exports = ServicesCtrl;