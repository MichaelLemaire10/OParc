const Visitor = require('../models/visitor');

module.exports = {
    init: async (req, res) => {
        const ticket = req.app.locals.ticket;
        const visitor = await Visitor.findOne(ticket);
        req.app.locals.visitor = visitor;
        res.json(visitor);
    },

    test: (req, res) => {
        console.log(req.app.locals.ticket);
    }
}