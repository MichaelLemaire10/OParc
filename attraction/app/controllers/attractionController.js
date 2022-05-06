const Attraction = require("../models/attraction");

module.exports = {
    findOpen: async (req, res) => {
        console.log(req.app.locals.ticket);
        try {
            const open = await Attraction.findOpen();
            res.json(open);
        } catch (error) {
            console.log(error);
            res.status(500).json(error.message);
        }
    }
};