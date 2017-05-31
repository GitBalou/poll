const expect = require('expect');
const UserModel = require('../../models/UserModel');


describe('#UserModel', () => {

    it('Injection de dépendances', () => {
        const userModel = new UserModel(true);

        expect(userModel._mongoose).toBe(true);
    });

});