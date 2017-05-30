const expect = require('expect');
const ServicesCtrl = require('../../controllers/ServicesCtrl');

describe("ServicesCtrl", () =>
{
    describe("#Injection", () =>
    {
        const SerCtrl = new ServicesCtrl(true, true);

        it("Le service pollService est injecté en tant que dépendance", (done) =>
        {
            expect(SerCtrl._pollService).toBe(true);
            done();
        });

        it("Le service userService est injecté en tant que dépendance", (done) =>
        {
            expect(SerCtrl._userService).toBe(true);
            done();
        });
    });

    describe("ListsAction", () =>
    {
        it("Doit retourner un tableau objet contenant tout les sondages si le parametre id de la requête n'est pas présente", (done) =>
        {
            const SerCtrl = new ServicesCtrl({
                _pollService: {
                    getPolls: () =>
                    {
                        const ResponseModel = {id: "", label: "", userIdArray: [""]};

                        const poll1 = {
                            question: "",
                            userId: "0",
                            responseArray: [
                                ResponseModel,
                            ]
                        };

                        const poll2 = {
                            question: "",
                            userId: "1",
                            responseArray: [
                                ResponseModel,
                            ]
                        };

                        return [poll1, poll2];
                    }
                }
            });



            const req = {
                params: {
                    id: null
                }
            };

            const res = {
                status: code =>
                {
                    expect(code).toBe(200);

                    return {
                        json: data =>
                        {
                            expect(data).toExist();
                            expect(data.message).toBe("Success");
                            expect(data.data.length).toBeGreaterThanOrEqualTo(0);
                            done();
                        }
                    }
                }
            };

            SerCtrl.listsAction(req, res);
        });

        it("Doit retourner un tableau objet contenant les sondages d'un utilisateur si l'id de la requête est présente et valide", (done) =>
        {
            const SerCtrl = new ServicesCtrl({
                _pollService: {
                    getPollFromUserId: (id) =>
                    {
                        const ResponseModel = {id: "", label: "", userIdArray: [""]};

                        const poll1 = {
                            question: "",
                            userId: "0",
                            responseArray: [
                                ResponseModel,
                            ]
                        };

                        const poll2 = {
                            question: "",
                            userId: "0",
                            responseArray: [
                                ResponseModel,
                            ]
                        };

                        return [poll1, poll2];
                    }
                }
            });

            const req = {
                params: {
                    id: "0"
                }
            };

            const res = {
                status: code => {
                    expect(code).toBe(200);

                    return {
                        json: data =>
                        {
                            expect(data).toExist();
                            expect(data.message).toBe("Success");
                            expect(data.data.length).toBeGreaterThanOrEqualTo(0);
                            expect(data.data).toBeA('array');
                            expect(data.data[0].userId).toBe(req.params.id);
                            expect(data.data[1].userId).toBe(req.params.id);
                            done();
                        }
                    }
                }
            };

            SerCtrl.listsAction(req, res);
        });

        it("Doit retourner une erreur 404 si l'id de la requête est présente et non valide", (done) =>
        {
            const SerCtrl = new ServicesCtrl({
                _pollService: {
                    getPollFromUserId: (id) => {return []}
                }
            });

            const req = {
                params: {
                    id: "99999999"
                }
            };

            const res = {
                status: code => {
                    expect(code).toBe(404);

                    return {
                        json: data =>
                        {
                            expect(data).toExist();
                            expect(data.message).toExist();
                            expect(data.message).toBeA("string");
                            expect(data.message).toBe("Error");
                            expect(data.data).toExist();
                            expect(data.data).toBeA("array");
                            expect(data.data).toBe([]);
                            done();
                        }
                    }
                }
            };

            SerCtrl.listsAction(req, res);
        });

    });

    describe("StatsAction", () =>
    {
        it("Doit renvoyer une erreur 500 si l'id du sondage n'est pas présent dans les paramètres de la requête", (done) =>
        {
            const SerCtrl = new ServicesCtrl();


            const req = {
                params: {
                    id: {}
                }
            };

            const res = {
                status: code => {
                    expect(code).toBe(500);

                    return {
                        json: data =>
                        {
                            expect(data).toExist();
                            expect(data.message).toBe("Error");

                            done();
                        }
                    }
                }
            };

            SerCtrl.statsAction(req, res);
        });

        it("Doit renvoyer une erreur 404 si l'id du sondage est présent dans les paramètres de la requête , et, est non présent en base de données", (done) =>
        {
            const SerCtrl = new ServicesCtrl({
                _pollService: {
                    getPollFromPollId: (id) => { return [] },
                    getUserInfoForPoll: id =>
                    {
                        return stats = {
                            1: {
                                label: "Man",
                                ages: [10, 15, 4, 85, 24],
                                villes: ["Marseille", "Nantes", "Paris"]
                            },
                            2: {
                                label: "Women",
                                ages: [18, 24, 14, 80, 28],
                                villes: ["Marseille", "Nantes", "Paris"]
                            },
                            3: {
                                label: "Did you just assume my gender ?",
                                ages: [20, 12, 4, 30, 24],
                                villes: ["Marseille", "Nantes", "Paris"]
                            },
                        };
                    }
                }
            });

            const body = {
                message: "Error",
                data: []
            };

            const req = {
                params: {
                    id: "99999999999"
                }
            };

            const res = {
                status: code => {
                    expect(code).toBe(404);

                    return {
                        json: data =>
                        {

                            expect(data).toExist();
                            expect(data.message).toExist();
                            expect(data.message).toBeA("string");
                            expect(data.message).toBe("Error");
                            expect(data.data).toExist();
                            expect(data.data).toBeA("array");
                            done();
                        }
                    }
                }
            };

            SerCtrl.statsAction(req, res);
        });

        it("Doit renvoyer un objet contenant les statistiques du sondage  si l'id du sondage est présent dans les paramètres de la requête , et, est présent en base de données", (done) =>
        {
            const SerCtrl = new ServicesCtrl({
                _pollService: {
                    getPollFromPollId: (id) => { return [] },
                    getUserInfoForPoll: id =>
                    {
                        return stats = {
                            1: {
                                label: "Man",
                                ages: [10, 15, 4, 85, 24],
                                villes: ["Marseille", "Nantes", "Paris"]
                            },
                            2: {
                                label: "Women",
                                ages: [18, 24, 14, 80, 28],
                                villes: ["Marseille", "Nantes", "Paris"]
                            },
                            3: {
                                label: "Did you just assume my gender ?",
                                ages: [20, 12, 4, 30, 24],
                                villes: ["Marseille", "Nantes", "Paris"]
                            },
                        };
                    }
                }
            });

            const req = {
                params: {
                    id: "0"
                }
            };

            const res = {
                status: code => {
                    expect(code).toBe(500);

                    return {
                        json: data =>
                        {
                            expect(data).toExist();

                            expect(data.message).toExist();
                            expect(data.message).toBeA("string");
                            expect(data.message).toBe("Success");

                            expect(data.data.stats).toExist();
                            expect(data.data.stats.response1).toExist();
                            expect(data.data.stats.response2).toExist();
                            expect(data.data.stats.response3).toExist();

                            expect(data.data.stats.response1.label).toBeA("string");
                            expect(data.data.stats.response1.ages).toBeA("array");
                            expect(data.data.stats.response1.villes).toBeA("array");

                            expect(data.data.stats.response2.label).toBeA("string");
                            expect(data.data.stats.response2.ages).toBeA("array");
                            expect(data.data.stats.response2.villes).toBeA("array");

                            expect(data.data.stats.response3.label).toBeA("string");
                            expect(data.data.stats.response3.ages).toBeA("array");
                            expect(data.data.stats.response3.villes).toBeA("array");
                            done();
                        }
                    }
                }
            };

            SerCtrl.statsAction(req, res);
        });

    });
});