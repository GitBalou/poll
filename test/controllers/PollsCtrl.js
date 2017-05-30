const expect = require('expect');
const fs = require('fs');
const PollsCtrl = require('../../controllers/PollsCtrl');

describe("PollsCtrl", () => {
    describe("#pollsPut", () => {

        it("Doit avoir un user_id", () => {
            const pollsCtrl = new PollsCtrl({
                
            });

            const req = {
                params: { }
            };
            const res = {
                
            };

        });


        it("Doit comprendre une question", () => {
            const pollsCtrl = new PollsCtrl({

            })

            const questions = document.getElementById("question").value;

            if (questions === null || typeof questions === 'undefined') {
                // Erreur
            } else {
                // C'est good
            }
            
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