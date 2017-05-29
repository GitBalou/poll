const expect = require('expect');
const AuthCtrl = require('../../controllers/AuthCtrl');

describe("AuthCtrl", () => {

    describe("#Injection", () => {
        const authCtrl = new AuthCtrl({});

        it("Le service userService est injecté en tant que dépendance", () => {
             expect(authCtrl._userService).toBe(true);
        });
    });

    describe("#registerAction", () => {

        it("email n'est pas un paramètre: status code 400", () => {
            const authCtrl = new AuthCtrl({});

            const req = {
                params: {}
            };

            const res = {
                status: code => {
                    expect(code).toBe(400);

                    return {
                        json: data => {
                            expect(data).toExist();
                            expect(data.error).toBe("le mail n'est pas renseigné");
                        }
                    }
                }
            };

            authCtrl.registerAction(req, res);
        });

        it("email n'est pas un mail valide : status code 400", () => {
            const authCtrl = new AuthCtrl({});

            const req = {
                params: {
                    email: "mauvaisemail.fr"
                }
            };

            const res = {
                status: code => {
                    expect(code).toBe(400);

                    return {
                        json: data => {
                            expect(data).toExist();
                            expect(data.error).toBe("le mail n'est pas valide");
                        }
                    }
                }
            };

            authCtrl.registerAction(req, res);
        });

        it("mail valide : status code 201, retourne l'utilisateur créé", () => {
            const authCtrl = new AuthCtrl({});

            const req = {
                params: {
                    email: "mail.valide@email.com"
                }
            };

            const res = {
                status: code => {
                    expect(code).toBe(201);

                    return {
                        json: data => {
                            expect(data).toExist();
                            expect(data.user).toExist();
                            expect(data.user.email).toExist();
                            expect(data.user.email).toBeA('string');
                        }
                    }
                },
            };

            authCtrl.registerAction(req, res);
        } );

    });

    describe("#authAction", () => {

        it("email absent: status code 400", ({}) => {
            const authCtrl = new AuthCtrl();

            const req = {
                params: {
                    password: "",
                }
            };

            const res = {
                status: code => {
                    expect(code).toBe(400);

                    return {
                        json: data => {
                            expect(data).toExist();
                            expect(data.error).toBe("Le mail n'est pas renseigné");
                        }
                    }
                }
            };

            authCtrl.registerAction(req, res);
        });

         it("mot de passe absent: status code 400", () => {
            const authCtrl = new AuthCtrl({});

            const req = {
                params: {
                    email: "bonemail@test.fr",
                }
            };

            const res = {
                status: code => {
                    expect(code).toBe(400);

                    return {
                        json: data => {
                            expect(data).toExist();
                            expect(data.error).toBe("Le mot de passe n'est pas renseigné");
                        }
                    }
                }
            };

            authCtrl.registerAction(req, res);
        });

        it("mail non valide : status code 400", () => {
            const authCtrl = new AuthCtrl({});

            const req = {
                params: {
                    email: "nonvalide.fr",
                    password: "bla",
                }
            };

            const res = {
                status: code => {
                    expect(code).toBe(400);

                    return {
                        json: data => {
                            expect(data).toExist();
                            expect(data.error).toExist("le mail n'est pas valide");
                        }
                    }
                }
            };

            authCtrl.registerAction(req, res);
        });

        it("utilisateur non reconnu : 401", () => {
            const authCtrl = new AuthCtrl({
                authentificate: () => false
            });
            
            const req = {
                params: {
                    email: 'bonemail@fre.fr',
                    password: "bonjour",
                }
            };

            const res = {
                status: code => {
                    expect(code).toBe(401);

                    return {
                        json: data => {
                            expect(data).toExist();
                            expect(data.error).toExist("Cet utilisateur n'existe pas");
                        }
                    }
                }
            };

            authCtrl.authAction(req, res);
        });

        it("utilisateur reconnu : 200 + utilisateur + token", () => {
             const authCtrl = new AuthCtrl({
                authentificate: () => true
            });
            
            const req = {
                params: {
                    email: 'bonemail@fre.fr',
                    password: "bonjour",
                }
            };

            const res = {
                json: data => {
                    expect(data).toExist();
                    expect(data.user).toExist();
                    expect(data.user.email).toExist();
                    expect(data.user.email).toBeA(string);
                    expect(data.token).toExist();
                    expect(data.token).toBeA(string);
                }
            };

            authCtrl.authAction(req, res);
        });
    });
});