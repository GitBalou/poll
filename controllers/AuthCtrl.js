class AuthCtrl {
    registerAction(req, res) {
        res.status(201).json({user: {email:"ok"}});
    }
}

module.exports = AuthCtrl;