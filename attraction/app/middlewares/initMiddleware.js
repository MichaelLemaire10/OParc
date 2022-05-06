const init = {
    getTicketId: () => (req, res, next) => {
        res.app.locals.ticket = req.params.id;
        next();
    }
}

module.exports = init;