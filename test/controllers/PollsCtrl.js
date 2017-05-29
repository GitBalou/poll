const expect = require('expect');
const fs = require('fs');
const PollsCtrl = require('../../controllers/PollsCtrl');

describe("PollsCtrl", () => {
    describe("#pollsPut", () => {

        it("Doit avoir un user_id", () => {
            const pollsCtrl = new PollsCtrl({
                appendFile: () => { }
            });

            const req = {
                params: { }
            };
            const res = {
                render: view => {
                    expect(view).toBe('polls/register');
                }
            };

        });


        it("Doit comprendre une question", () => {
            const pollsCtrl = new PollsCtrl({

            })
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