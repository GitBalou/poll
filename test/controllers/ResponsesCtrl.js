const expect = require('expect');
const ResponsesCtrl = require('../../controllers/ResponsesCtrl');

describe("#Responsesctrl", () => {

    describe("#Injection", () => {

        it("les services PollService & UserService sont injectés", () => {
            const responsesCtrl = new ResponsesCtrl(true, true);
            expect(responsesCtrl._pollService).toBe(true);
            expect(responsesCtrl._userService).toBe(true);
        });
    });

    describe("#AddResponseToPoll", () => {
        
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
                            expect(data.message).toBe("l'id du sondage n'est pas spécifiée");
                        }
                    }
                }
            };
            
            responsesCtrl.addResponseToPoll(req, res);
        });

        it("Le corps de la requête est invalide : status 400", () => {
            const responsesCtrl = new ResponsesCtrl({
                pollExists: id => {return id != 5;},
            }, {});

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
                            expect(data.message).toBe("body invalide");
                        }
                    }
                }
            };
            
            responsesCtrl.addResponseToPoll(req, res);
        });

        it("Le paramètre id ne correspond à aucun sondage : status 404", () => {
            const responsesCtrl = new ResponsesCtrl({
                pollExists: id => {return id != 99;},
            }, {});

            const req = {
                params: {
                    id: '99'
                },
                 body: {
                    user_id: 99,
                    reponse_id: 100
                }
            };

            const res = {
                status: code => {
                    expect(code).toBe(404);

                    return {
                        json: data => {
                            expect(data).toExist();
                            expect(data.message).toBe("le sondage n'existe pas");
                        }
                    }
                }
            };
            
            responsesCtrl.addResponseToPoll(req, res);
        });

        it("il n'y a pas d'utilisateur associé à user_id : status 404", () => {
            const responsesCtrl = new ResponsesCtrl({
                pollExists: () => true,
            }, {
                userExist: id => id != 99,
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
                            expect(data.message).toBe("l'utilisateur spécifié n'existe pas");
                        }
                    }
                }
            };
            
            responsesCtrl.addResponseToPoll(req, res);
        });

        it("il n'y a pas de réponse associée à response_id pour ce sondage: status 404", () => {
            const responsesCtrl = new ResponsesCtrl({
                pollExists: () => true,
            }, {
                userExist: () => true,
                responseExist: id => id != 55,
            });

            const req = {
                params: {
                    id: 10
                },
                body: {
                    user_id: 99,
                    response_id: 55
                }
            };

            const res = {
                status: code => {
                    expect(code).toBe(404);

                    return {
                        json: data => {
                            expect(data).toExist();
                            expect(data.message).toBe("La réponse spécifiée n'existe pas pour ce sondage");
                        }
                    }
                }
            };
            
            responsesCtrl.addResponseToPoll(req, res);
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
                            expect(data.message).toBe("success");
                            expect(data.data).toExist();
                        }
                    }
                }
            };
            
            responsesCtrl.addResponseToPoll(req, res);
        });
    });
}); 