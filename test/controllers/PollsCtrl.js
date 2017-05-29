const expect = require('expect');
const fs = require('fs');
const PollsCtrl = require('../../controllers/PollsCtrl');

describe("PollsCtrl", () => {
    describe("#pollsAction", () => {
        it("Doit retourner la vue polls", () => {
            const pollsCtrl = new PollsCtrl({
                appendFile: () => { }
            });


        })
    })
})