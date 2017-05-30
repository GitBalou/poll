const expect = require('expect');
const fs = require('fs');
const PollsCtrl = require('../../controllers/PollsCtrl');

describe("PollsCtrl", () => {
    describe("#pollsPut", () => {

/*
        it("Doit avoir un user_id pour pouvoir créer un sondage", done => {
            const pollsCtrl = new PollsCtrl({
                
            });

            const req = {
                params: {}
            };
            const res = {
                
            };

            done();
        });

*/
        it("Doit retourner le message question_required si le champ question n'a pas été rempli", done => {
            const pollsCtrl = new PollsCtrl({ });

            const req = {
                body: { question: null }
            };

            const res = {
                json: function(result) {
                    expect(result).toBe("question_required");
                    done();
                }
            };

            pollsCtrl.postPoll(req, res);   
        });

        it('Renvoie une réponse OK si le champ question à été rempli', done => {

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

        it("Doit retourner le message question_required quand le paramètres question est une chaine de caractère vide.", done => {
            const pollsCtrl = new PollsCtrl({ });

            const req = {
                body: { question: '' }
            };

            const res = {
                json: result => {
                    expect(result).toBe("question_required");
                    done();
                }
            };

            pollsCtrl.postPoll(req, res);
        });


        it("Doit renvoyer le message responses_required si il n'y a pas deux réponses minimum", done => {
            const pollsCtrl = new PollsCtrl({ });

            const req = {
                body: { response1: '',response2: '' }
            };

            const res = {
                json: function(result) {
                    expect(result).toBe("responses_required");
                    done();
                }
                
            };

            pollsCtrl.postPoll(req, res);
        });


        it("Renvoie 'Tout est OK !' si tous les champs sont renseignés", done => {
            const pollsCtrl = new PollsCtrl({ });

            const req = {
                body: { question: '', response1: '', response2: ''}
            };

            const res = {
                json: function(result) {
                    expect(result).toBe("Tout est OK");
                    done();
                }
            };

            pollsCtrl.postPoll(req, res);
        });


        // it("Une erreur indéfini", done => {
        //     const pollsCtrl = new PollsCtrl({

        //     })
        //     done();
        // });
        
    })
    
})