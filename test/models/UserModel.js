const expect = require('expect');
const UserModel = require('../../models/UserModel');

describe('UserModel', () => {

    it('Injection de dépendances', () => {
        const userModel = new UserModel(true);

        expect(userModel._mongoose).toBe(true);
    });

    describe('getUserByEmail', () => {
        
        it('user not found', done => {
            const userModel = new UserModel({});
            
        });
        
        it('email non valide', () => {});


        
    });

    describe('registerUser', () => {
        
    });
});