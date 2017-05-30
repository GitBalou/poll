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

        it("Doit renvoyer une erreur 404 si l'id du sondage est présent dans les paramètres de la requête , et, est non présent en base de données", () =>
        {
            const SerCtrl = new ServicesCtrl({
                _pollService: {
                    getPollFromPollId: (id) => { return [] }
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
                            expect(data.message).toBeA("sting");
                            expect(data.message).toBe("Error");
                            expect(data.data).toExist();
                            expect(data.data).toBeA("array");
                        }
                    }
                }
            };

            SerCtrl.statsAction(req, res);
        });

        it("Doit renvoyer un objet contenant les statistiques du sondage  si l'id du sondage est présent dans les paramètres de la requête , et, est présent en base de données", (done) =>
        {
            const SerCtrl = new ServicesCtrl({
                _userService: {
                    getUserFromUserId: (id) =>
                    {
                        let user = {};
                        switch(id)
                        {
                            case 1:
                                user = {
                                    _id: 1,
                                    email: "",
                                    password: "",
                                    ville: "Nantes",
                                    age: "5",
                                    PollCreated: [],
                                    PollResponse: [
                                        {_id: "11", label: "Man", userIdArray: ["1"]},
                                    ]
                                };
                                break;
                            case 2:
                                user = {
                                    _id: 2,
                                    email: "",
                                    password: "",
                                    ville: "Nantes",
                                    age: "10",
                                    PollCreated: [],
                                    PollResponse: [
                                        {id: "22", label: "Women", userIdArray: ["2"]},
                                    ]
                                };
                                break;
                            case 3:
                                user = {
                                    _id: 3,
                                    email: "",
                                    password: "",
                                    ville: "Paris",
                                    age: "30",
                                    PollCreated: [],
                                    PollResponse: [
                                        {id: "33", label: "Did you just assume my gender ?", userIdArray: ["3"]},
                                    ]
                                };
                                break;
                        }
                        return user;
                    }
                },
                _pollService: {
                    getPollFromPollId: id =>
                    {
                        return poll = {
                            _id: 0,
                            question: "Are you man or women ?",
                            userId: 0,
                            responseArray: [
                                {_id: "1", label: "Man", userIdArray: ["1"]},
                                {_id: "2", label: "Women", userIdArray: ["2"]},
                                {_id: "3", label: "Did you just assume my gender ?", userIdArray: ["3"]},
                            ]
                        };
                    },
                    getUserInfoForPoll: id =>
                    {
                        const poll = this.getPollFromPollId(id);
                        let stats = {};

                        poll.responseArray.forEach(response =>
                        {
                            stats[response._id] = {
                                label: response.label,
                                ages: [],
                                villes: [],
                            };
                            response.userIdArray.forEach(userId =>
                            {
                                let user = this._userService.getUserFromId(userId);
                                stats[response._id].ages.push(user.age);
                                stats[response._id].villes.push(user.villes);
                            })
                        });

                        return stats;
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