const expect = require('expect');
const fs = require('fs');
const PollsCtrl = require('../../controllers/PollsCtrl');

describe("PollsCtrl", () => {
    describe("#pollsPut", () => {

        it("Doit avoir un user_id pour pouvoir créer un sondage", () => {
            const pollsCtrl = new PollsCtrl({
                
            });

            const req = {
                params: {}
            };
            const res = {
                
            };

        });


        it("Doit retourner le message question_required s'il manque la question dans les paramètres", () => {
            const pollsCtrl = new PollsCtrl({ })

            const req = {
                body: { }
            };

            const res = {
                json: result => {
                    expect(result).toBe("question_required");
                }
            };

            pollsCtrl.postPoll(req, res);   
        });

        it("Doit retourner le message question_required quand le paramètres question est une chaine de caractère vide.", () => {
            const pollsCtrl = new PollsCtrl({ })

            const req = {
                body: {
                    question: ''
                 }
            };

            const res = {
                json: result => {
                    expect(result).toBe("question_required");
                }
            };

            pollsCtrl.postPoll(req, res);
        });


        it("Doit comprendre au minimum 2 reponses", () => {
            const pollsCtrl = new PollsCtrl({

            })
        });


        it("Tout les champs sont renseignés", () => {
            const pollsCtrl = new PollsCtrl(true);

            expect(pollsCtrl._fs).toBe(true);
        });


        it("Une erreur indéfini", () => {
            const pollsCtrl = new PollsCtrl({

            })
        });
    })
})