const expect = require('expect');
const AuthCtrl = require('../../controllers/AuthCtrl');

describe("AuthCtrl", () =>
{

    describe("#Injection", () =>
    {
        const authCtrl = new AuthCtrl(true);

        it("Le service userService est injecté en tant que dépendance", (done) =>
        {
            expect(authCtrl._userService).toBe(true);
            done();
        });
    });

    describe("#registerAction", () =>
    {

        it("email n'est pas un paramètre: status code 400", (done) =>
        {
            const authCtrl = new AuthCtrl({});

            const req = {
                params: {}
            };

            const res = {
                status: code =>
                {
                    expect(code).toBe(400);

                    return {
                        json: data =>
                        {
                            expect(data).toExist();
                            expect(data.message).toBe("le mail n'est pas renseigné");
                            done();
                        }
                    }
                }
            };

            authCtrl.registerAction(req, res);
        });

        it("email n'est pas un mail valide : status code 400", (done) =>
        {
            const authCtrl = new AuthCtrl({});

            const req = {
                params: {
                    email: "mauvaisemail.fr"
                }
            };

            const res = {
                status: code =>
                {
                    expect(code).toBe(400);

                    return {
                        json: data =>
                        {
                            expect(data).toExist();
                            expect(data.message).toBe("le mail n'est pas valide");
                            done();
                        }
                    }
                }
            };

            authCtrl.registerAction(req, res);
        });

        it("mail valide : status code 201, retourne l'utilisateur créé", (done) =>
        {
            const authCtrl = new AuthCtrl({});

            const req = {
                params: {
                    email: "mail.valide@email.com"
                }
            };

            const res = {
                status: code =>
                {
                    expect(code).toBe(201);

                    return {
                        json: data =>
                        {
                            expect(data).toExist();
                            expect(data.data).toExist();
                            expect(data.data.email).toExist();
                            expect(data.data.email).toBeA('string');
                            done();
                        }
                    }
                },
            };

            authCtrl.registerAction(req, res);
        });

    });

    describe("#authAction", () =>
    {

        it("email absent: status code 400", (done) =>
        {
            const authCtrl = new AuthCtrl();

            const req = {
                params: {
                    password: "",
                }
            };

            const res = {
                status: code =>
                {
                    expect(code).toBe(400);

                    return {
                        json: data =>
                        {
                            expect(data).toExist();
                            expect(data.message).toBe("Le mail n'est pas renseigné");
                            done();
                        }
                    }
                }
            };

            authCtrl.authAction(req, res);
        });

        it("mot de passe absent: status code 400", (done) =>
        {
            const authCtrl = new AuthCtrl({});

            const req = {
                params: {
                    email: "jhon.do@domain.tld",
                }
            };

            const res = {
                status: code =>
                {
                    expect(code).toBe(400);

                    return {
                        json: data =>
                        {
                            expect(data).toExist();
                            expect(data.message).toBe("Le mot de passe n'est pas renseigné");
                            done();
                        }
                    }
                }
            };

            authCtrl.authAction(req, res);
        });

        it("mail non valide : status code 400", (done) =>
        {
            const authCtrl = new AuthCtrl({});

            const req = {
                params: {
                    email: "nonvalide.fr",
                    password: "bla",
                }
            };

            const res = {
                status: code =>
                {
                    expect(code).toBe(400);

                    return {
                        json: data =>
                        {
                            expect(data).toExist();
                            expect(data.message).toExist("le mail n'est pas valide");
                            done();
                        }
                    }
                }
            };

            authCtrl.authAction(req, res);
        });

        it("utilisateur non reconnu : 401", (done) =>
        {
            const authCtrl = new AuthCtrl({
                authentificate: (email, password) => (email != 'bonemail@fre.fr' || password != 'bonjour')
            });

            const req = {
                params: {
                    email: 'bonemail@fre.fr',
                    password: "bonjour",
                }
            };

            const res = {
                status: code =>
                {
                    expect(code).toBe(401);

                    return {
                        json: data =>
                        {
                            expect(data).toExist();
                            expect(data.message).toExist("Cet utilisateur n'existe pas");
                            done();
                        }
                    }
                }
            };

            authCtrl.authAction(req, res);
        });

        it("utilisateur reconnu : 200 + utilisateur + token", (done) =>
        {
            const authCtrl = new AuthCtrl({
                authentificate: (email, password) => (email == 'bonemail@fre.fr' && password == 'bonjour')
            });

            const req = {
                params: {
                    email: 'bonemail@fre.fr',
                    password: "bonjour",
                }
            };

            const res = {
                json: data =>
                {
                    expect(data).toExist();
                    expect(data.data).toExist();
                    expect(data.data.user).toExist();
                    expect(data.data.user.email).toExist();
                    expect(data.data.user.email).toBeA("string");
                    expect(data.data.token).toExist();
                    expect(data.data.token).toBeA("string");
                    done();
                }
            };

            authCtrl.authAction(req, res);
        });
    });
});