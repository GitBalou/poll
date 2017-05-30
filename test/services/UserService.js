const expect = require ('expect');
const UserService = require('../../services/UserService');

describe('UserService', () => {

    it('Injection de dépendances', () => {
        const UserService = new UserService(true);
        expect(UserService._userModel).toBe(true);
    });

    describe('#authentificate', () => {

        it('retourne vrai si utilisateur reconnu', () => {
            const userService = new UserService({
                getUserByEmail: (email) => {
                    return email == 'good@email.fr' ? {password:'good'} : {};
                }
            });

            const email = "good@email.fr";
            const password = "good";

            expect(userService.authentificate(email, password).toBe(true));
        });

        it('retourne faux si utilisateur non reconnu', () => {
            const userService = new UserService({
                getUserByEmail: (email) => {
                    return email == 'good@email.fr' ? {password:'good'} : {};
                }
            });

            const email = "wrong@email.fr";
            const password = "good";

            expect(userService.authentificate(email, password).toBe(false));
        });

        it('retourne faux si mauvais pwd', () => {
            const userService = new UserService({
                getUserByEmail: (email) => {
                    return email == 'good@email.fr' ? {password:'good'} : {};
                }
            });

            const email = "good@email.fr";
            const password = "wrong";

            expect(userService.authentificate(email, password).toBe(false));
        });
    });

    describe('#register', () => {
         
         it('retourne vrai si enregistrement ok', () => {
            const userService = new UserService({
                registerUser: (email, password) => (email == 'good@email.fr' && password == 'good')
            });

            const email = "good@email.fr";
            const password = "good";

            expect(userService.register(email, password).toBe(true));
        });

        it('retourne faux si enregistrement nok', () => {
            const userService = new UserService({
                registerUser: (email, password) => (email != 'good@email.fr' || password != 'good')
            });

            const email = "good@email.fr";
            const password = "good";

            expect(userService.register(email, password).toBe(false));
        });
    });
});