const expect = require('expect');
const UserModel = require('../../models/UserModel');

describe('UserModel', () => {

    it('Injection de dépendances', () => {
        const userModel = new UserModel(true);

        expect(userModel._mongoose).toBe(true);
    });

    describe('getUserByEmail', () => {
        
        it('user not found', done => {
            const userModel = new UserModel({
                findOne: (condition) => {

                    if( !condition.email || condition.email != 'good@email.fr') {
                        return Promise.reject({});
                    }
                    
                    return Promise.resolve({});
                    
                }
            });

            const email = "good@email.fr";

            expect(userModel.getUserByEmail(email)).toEqual({});
        });
        
        it('user found', done => {
            const userModel = new UserModel({
                findOne: (condition) => {

                    if( !condition.email || condition.email != 'good@email.fr') {
                        return Promise.reject({});
                    }
                    
                    return Promise.resolve({email:'good@email.fr'});
                    
                }
            });

            const email = "good@email.fr";

            expect(userModel.getUserByEmail(email)).toEqual({email:'good@email.fr'});
        });
        
    });

    describe('registerUser', () => {
        
    });
});