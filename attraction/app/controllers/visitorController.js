const Visitor = require("../models/visitor");

module.exports = {
    findBooking: async (req, res) => {
        try {
            const booking = await Visitor.findBooking(req.app.locals.visitor.id);
            res.json(booking);
        } catch (error) {
            console.log(error);
            res.status(500).json(error.message);
        }
    }
};