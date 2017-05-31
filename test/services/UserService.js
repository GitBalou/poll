const expect = require ('expect');
const UserService = require('../../services/UserService');

describe('#UserService', () => {

    it('Injection de dépendances', () => {
        const userService = new UserService(true);
        expect(userService._userModel).toBe(true);
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

            expect(userService.authentificate(email, password)).toBe(true);
        });

        it('retourne faux si utilisateur non reconnu', () => {
            const userService = new UserService({
                getUserByEmail: (email) => {
                    return email == 'good@email.fr' ? {password:'good'} : {};
                }
            });

            const email = "wrong@email.fr";
            const password = "wrong";

            expect(userService.authentificate(email, password)).toBe(false);
        });

        it('retourne faux si mauvais pwd', () => {
            const userService = new UserService({
                getUserByEmail: (email) => {
                    return email == 'good@email.fr' ? {password:'good'} : {};
                }
            });

            const email = "good@email.fr";
            const password = "wrong";

            expect(userService.authentificate(email, password)).toBe(false);
        });
    });

    describe('#register', () => {
         
        it('retourne vrai si enregistrement ok', () => {
            const userService = new UserService({
                registerUser: (email, password) => (email === 'good@email.fr' && password === 'good')
            });

            const email = "good@email.fr";
            const password = "good";

            expect(userService.register(email, password)).toBe(true);
        });

        it('retourne faux si enregistrement nok', () => {
            const userService = new UserService({
                registerUser: (email, password) => (email !== 'good@email.fr' || password !== 'good')
            });

            const email = "good@email.fr";
            const password = "good";

            expect(userService.register(email, password)).toBe(false);
        });
    });

    // describe('getUserByEmail', () => {
    //
    //     it('user not found', done => {
    //         const userModel = new UserModel({
    //             findOne: (condition) => {
    //
    //                 if( !condition.email || condition.email !== 'good@email.fr') {
    //                     return Promise.reject({});
    //                 }
    //
    //                 return Promise.resolve({});
    //
    //             }
    //         });
    //
    //         const email = "good@email.fr";
    //
    //         expect(userModel.getUserByEmail(email)).toEqual({});
    //     });
    //
    //     it('user found', done => {
    //         const userModel = new UserModel({
    //             findOne: (condition) => {
    //
    //                 if( !condition.email || condition.email !== 'good@email.fr') {
    //                     return Promise.reject({});
    //                 }
    //
    //                 return Promise.resolve({email:'good@email.fr'});
    //
    //             }
    //         });
    //
    //         const email = "good@email.fr";
    //
    //         expect(userModel.getUserByEmail(email)).toEqual({email:'good@email.fr'});
    //     });
    //
    //     it('email non valide', () => {});
    //
    // });

    describe('#postUser', () =>
    {
        it('Doit pouvoir renvoyer un message en cas d\'erreur', (done) =>
        {
            const userService = new UserService({
                create: (data) =>
                {
                    return new Promise((resolve, reject) =>
                    {
                        reject({
                            message: "Can't resolve on null",
                        })
                    });
                }
            });

            userService.postUser(null).catch(err =>
            {
                expect(err).toExist();
                expect(err.message).toBeA("string");
                done();
            });
        });

        it('Doit ajouter un _id à l\'object en cas de réussite', (done) =>
        {
            const userService = new UserService({
                create: (data) =>
                {
                    return new Promise(resolve =>
                    {
                        data._id = "15";
                        resolve(data);
                    });
                }
            });


            userService.postUser({mail: "toto@domain.tld", password: "123456", ville: "Nantes", age: "24", polls: ["1", "2"]}).then(object =>
            {
                expect(object).toExist();
                expect(object._id).toExist();
                done();
            })
        });
    });

    describe('#getUsers', () =>
    {
        it('Doit pouvoir renvoyer un message en cas d\'erreur', (done) =>
        {
            const userService = new UserService({
                find: () => {
                    return new Promise((resolve, reject) => reject({}));
                }
            });

            userService.getUsers().catch(err =>
            {
                expect(err).toExist();
                expect(err).toBeA("object");
                done();
            })
        });

        it('Doit pouvoir renvoyer les résultats en cas de réussite', (done) =>
        {
            const userService = new UserService({
                find: () => {
                    return new Promise((resolve) =>
                    {
                        resolve([
                            {_id: "134654532", mail: "toto@domain.tld", password: "123456", ville: "Nantes", age: "24", polls: ["1", "2"]},
                            {_id: "134654652", mail: "titi@domain.tld", password: "123456", ville: "Nantes", age: "24", polls: ["1", "2"]}
                        ]);
                    })
                }
            });

            userService.getUsers().then(result =>
            {
                expect(result).toExist();
                expect(result.length).toBeGreaterThanOrEqualTo(0);
                expect(result[0]).toBeA('object');
                done();
            });
        })
    });

    describe('#getUser', () =>
    {
        it('Doit pouvoir renvoyer un message en cas d\'erreur', (done) =>
        {
            const userService = new UserService({
                findOne: () => {
                    return new Promise((resolve, reject) => reject({message: "It's an error !"}));
                }
            });

            userService.getUser().catch(err =>
            {
                expect(err).toExist();
                expect(err.message).toExist();
                expect(err.message).toBeA("string");
                done();
            });
        });

        it('Doit pouvoir renvoyer le résultat en cas de réussite', (done) =>
        {
            const user = {_id: "134654532", mail: "toto@domain.tld", password: "123456", ville: "Nantes", age: "24", polls: ["1", "2"]};

            const userService = new UserService({
                findOne: () => {
                    return new Promise((resolve, reject) => resolve(user))
                }
            });

            userService.getUser().then(result =>
            {
                expect(result).toExist();
                expect(result).toBeA("object");
                done();
            })
        });
    });

    describe('#putUser', () =>
    {
        it('Doit pouvoir renvoyer un message en cas d\'erreur', (done) =>
        {
            const user = {_id: "134654532", mail: "toto@domain.tld", password: "123456", ville: "Nantes", age: "24", polls: ["1", "2"]};

            const userService = new UserService({
                update: () => {
                    return new Promise((resolve, reject) => reject({message: "prout"}))
                }
            });

            userService.putUser().catch(err =>
            {
                expect(err).toExist();
                expect(err.message).toBe("prout");
                done();
            })
        });

        it("Doit pouvoir renvoyer un objet en cas de réussite", (done) =>
        {
            const user = {_id: "134654532", mail: "toto@domain.tld", password: "123456", ville: "Nantes", age: "24", polls: ["1", "2"]};

            const userService = new UserService({
                update: (query, user) => {
                    return new Promise((resolve) =>
                    {
                        user.mail = "al.bator@arcadia.tld";
                        resolve(user);
                    });
                }
            });

            userService.putUser("", user).then(result =>
            {
                expect(result).toExist();
                expect(result.mail).toBe("al.bator@arcadia.tld");
                done();
            })
        });
    });

    describe('#removeUser', () =>
    {
        it('Doit pouvoir renvoyer un message en cas d\'erreur', (done) =>
        {
            const userService = new UserService({
                remove: () => {
                    return new Promise((resolve, reject) => reject("toto"));
                }
            });

            userService.removeUser().catch(err =>
            {
                expect(err).toExist();
                expect(err).toBe("toto");
                done();
            });
        });

        it("Doit pouvoir renvoyer un objet en cas de réussite", (done) =>
        {
            const userService = new UserService({
                remove: () => {
                    return new Promise((resolve, reject) => resolve({ nRemoved: 1 }))
                }
            });

            userService.removeUser().then(result =>
            {
                expect(result).toExist();
                expect(result).toBeA("object");
                done();
            })
        });
    });

});