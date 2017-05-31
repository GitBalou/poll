const expect = require('expect');
const fs = require('fs');
const PollsCtrl = require('../../controllers/PollsCtrl');

// Contrôle la méthode postPoll() de la classe PollsCtrl
describe("PollsCtrl", () => {
    describe("#pollsPut", () => {

        // Questions :
        it("Doit retourner le message 'question required' si le champ question n'a pas été rempli", done => {
            const pollsCtrl = new PollsCtrl({ });

            const req = {
                body: { question: null }
            };

            const res = {
                json: function(result) {
                    expect(result).toBe("question required");
                    done();
                }
            };

            pollsCtrl.postPoll(req, res);   
        });

        it('Renvoie "question OK" si le champ question à été rempli', done => {

            const pollsCtrl = new PollsCtrl({ });

            const req = {
                body: { question: 'Compliqué' }
            }

            const res = {
                json: result => {
                    expect(result).toBe('question OK');
                    done();
                }
            }

            pollsCtrl.postPoll(req, res);
        })

        it("Doit retourner le message 'question must be fill' quand le paramètres question est une chaine de caractère vide.", done => {
            const pollsCtrl = new PollsCtrl({ });

            const req = {
                body: { question: '' }
            };

            const res = {
                json: result => {
                    expect(result).toBe("question must be fill");
                    done();
                }
            };

            pollsCtrl.postPoll(req, res);
        });


        // Responses :
        it("Doit renvoyer le message responses required si il n'y a pas deux réponses minimum", done => {
            const pollsCtrl = new PollsCtrl({ });

            const req = {
                body: { response1: '',response2: '' }
            };

            const res = {
                json: function(result) {
                    expect(result).toBe("responses required");
                    done();
                }
                
            };

            pollsCtrl.postPoll(req, res);
        });


        // Questions & responses
        it("Renvoie 'Tout est OK !' si tous les champs sont renseignés", done => {
            const pollsCtrl = new PollsCtrl({ });

            const req = {
                body: { question: 'Lorem ipsum', response1: 'Lorem', response2: 'Ipsum'}
            };

            const res = {
                json: function(result) {
                    expect(result).toBe("Tout est OK");
                    done();
                }
            };

            pollsCtrl.postPoll(req, res);
        });

    })
    
})