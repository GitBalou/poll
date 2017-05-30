const expect = require('expect');
const ServicesCtrl = require('../../controllers/ServicesCtrl');

describe("ServicesCtrl", () =>
{
    describe("ListsAction", () =>
    {
        it("Doit retourner un tableau objet contenant tout les sondages si le parametre id de la requête n'est pas présente", () =>
        {
            const SerCtrl = new ServicesCtrl();

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

            const body = {
                message: "Success",
                data: [poll1, poll2]
            };

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
                            expect(data.message).toBe(body.message);
                            expect(data.data.length).toBeGreaterThanOrEqualTo(0);
                        }
                    }
                }
            };

            SerCtrl.listsAction(req, res);
        });

        it("Doit retourner un tableau objet contenant les sondages d'un utilisateur si l'id de la requête est présente et valide", () =>
        {
            const SerCtrl = new ServicesCtrl();

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

            const body = {
                message: "Success",
                data: [poll1, poll2]
            };

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
                            expect(data.message).toBe(body.message);
                            expect(data.data.length).toBeGreaterThanOrEqualTo(0);
                            expect(data.data[0].userId).toBe(req.params.id);
                            expect(data.data[1].userId).toBe(req.params.id);
                        }
                    }
                }
            };

            SerCtrl.listsAction(req, res);
        });

        it("Doit retourner une erreur 404 si l'id de la requête est présente et non valide", () =>
        {
            const SerCtrl = new ServicesCtrl();

            const body = {
                message: "Error",
                data: []
            };

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
                            expect(data.message).toBe(body.message);
                        }
                    }
                }
            };

            SerCtrl.listsAction(req, res);
        });

    });

    describe("StatsAction", () =>
    {
        it("Doit renvoyer une erreur 500 si l'id du sondage n'est pas présent dans les paramètres de la requête", () =>
        {
            const SerCtrl = new ServicesCtrl();

            const body = {
                message: "Error",
                data: []
            };

            const req = {
                params: {
                    id: null
                }
            };

            const res = {
                status: code => {
                    expect(code).toBe(500);

                    return {
                        json: data =>
                        {
                            expect(data.message).toBe(body.message);
                        }
                    }
                }
            };

            SerCtrl.statsAction(req, res);
        });

        it("Doit renvoyer une erreur 404 si l'id du sondage est présent dans les paramètres de la requête , et, est non présent en base de données", () =>
        {
            const SerCtrl = new ServicesCtrl();

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
                            expect(data.message).toBe(body.message);
                        }
                    }
                }
            };

            SerCtrl.statsAction(req, res);
        });

        it("Doit renvoyer un objet contenant les statistiques du sondage  si l'id du sondage est présent dans les paramètres de la requête , et, est présent en base de données", () =>
        {
            const SerCtrl = new ServicesCtrl();

            const body = {
                message: "Success",
                data: ["user1", "user2", "user3"]
            };

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
                            expect(data.message).toBe(body.message);
                            expect(data.data.length).toBeGreaterThanOrEqualTo(1);
                        }
                    }
                }
            };

            SerCtrl.statsAction(req, res);
        });

    });
});