const expect = require('expect');
const ResponsesCtrl = require('../../controllers/ResponsesCtrl');

describe("Responsesctrl", () => {

    describe("#injection", () => {

        it("les services PollService & UserService sont injectés", () => {
            const responsesCtrl = new ResponsesCtrl({}, {});
            expect(responsesCtrl._pollService).toBe(true);
            expect(responsesCtrl._userService).toBe(true);
        });
    });

    describe("#addResponseToPoll", () => {
        
        it("le paramètre id n'est pas spécifié : status 400", () => {
            const responsesCtrl = new ResponsesCtrl({}, {});

            const req = {
                params: {
                }
            };

            const res = {
                status: code => {
                    expect(code).toBe(400);

                    return {
                        json: data => {
                            expect(data).toExist();
                            expect(data.message).toExist("l'id du sondage n'est pas spécifiée");
                        }
                    }
                }
            };
            
            new responsesCtrl.addResponseToPoll(req, res);
        });

        it("le paramètre id n'est pas un entier : status 400", () => {
            const responsesCtrl = new ResponsesCtrl({});

            const req = {
                params: {
                    id: '33.7'
                }
            };

            const res = {
                status: code => {
                    expect(code).toBe(400);

                    return {
                        json: data => {
                            expect(data).toExist();
                            expect(data.message).toExist("id non valides");
                        }
                    }
                }
            };
            
            new responsesCtrl.addResponseToPoll(req, res);
        });

        it("Le corps de la requête est invalide : status 400", () => {
            const responsesCtrl = new ResponsesCtrl({});

            const req = {
                params: {
                    id: '5'
                },
                body: {}
            };

            const res = {
                status: code => {
                    expect(code).toBe(400);

                    return {
                        json: data => {
                            expect(data).toExist();
                            expect(data.message).toExist("body invalide");
                        }
                    }
                }
            };
            
            new responsesCtrl.addResponseToPoll(req, res);
        });

        it("Le paramètre id ne correspond à aucun sondage : status 404", () => {
            const responsesCtrl = new ResponsesCtrl({
                pollExists: () => false,
            });

            const req = {
                params: {
                    id: '99'
                }
            };

            const res = {
                status: code => {
                    expect(code).toBe(404);

                    return {
                        json: data => {
                            expect(data).toExist();
                            expect(data.message).toExist("le sondage n'existe pas");
                        }
                    }
                }
            };
            
            new responsesCtrl.addResponseToPoll(req, res);
        });

        it("il n'y a pas d'utilisateur associé à user_id : status 404", () => {
            const responsesCtrl = new ResponsesCtrl({
                pollExists: () => true,
            }, {
                userExist: () => false,
            });

            const req = {
                params: {
                    id: '33.7'
                },
                body: {
                    user_id: 99,
                }
            };

            const res = {
                status: code => {
                    expect(code).toBe(404);

                    return {
                        json: data => {
                            expect(data).toExist();
                            expect(data.message).toExist("l'utilisateur spécifié n'existe pas");
                        }
                    }
                }
            };
            
            new responsesCtrl.addResponseToPoll(req, res);
        });

        it("il n'y a pas de réponse associée à response_id pour ce sondage: status 404", () => {
            const responsesCtrl = new ResponsesCtrl({
                pollExists: () => true,
            }, {
                userExist: () => true,
                responseExist: () => false,
            });

            const req = {
                params: {
                    id: 10
                },
                body: {
                    user_id: 99,
                    response_id
                }
            };

            const res = {
                status: code => {
                    expect(code).toBe(404);

                    return {
                        json: data => {
                            expect(data).toExist();
                            expect(data.message).toExist("La réponse spécifiée n'existe pas pour ce sondage");
                        }
                    }
                }
            };
            
            new responsesCtrl.addResponseToPoll(req, res);
        });

        it("Paramètres valides : status 200", () => {
            const responsesCtrl = new ResponsesCtrl({
                pollExists: () => true,
            }, {
                userExist: () => true,
                responseExist: () => true,
            });

            const req = {
                params: {
                    id: 55
                },
                body: {
                    user_id: 99,
                    reponse_id: 100
                }
            };

            const res = {
                status: code => {
                    expect(code).toBe(200);

                    return {
                        json: data => {
                            expect(data).toExist();
                            expect(data.message).toExist("success");
                            expect(data.data).toExist();
                        }
                    }
                }
            };
            
            new responsesCtrl.addResponseToPoll(req, res);
        });
    });
}); 