const db = require('../database');

class Visitor {
    constructor(obj={}) {
        for (const propName in obj) {
            this[propName] = obj[propName];
        }
    }

    static async findOne(ticket) {
        try {
            const {rows} = await db.query('SELECT * FROM visitor WHERE ticket_number=$1', [ticket]);
            if (rows[0]) {
                return new Visitor(rows[0]);
            }
            return null;
        } catch (error) {
           if (error.detail) {
              throw new Error(error.detail);
           }
           throw error;
        }
    }

    static async findBooking(id) {
        try {
            const {rows} = await db.query('SELECT public_name AS attraction_booked FROM attraction JOIN attraction_visitor ON attraction.id=attraction_visitor.attraction_id WHERE attraction_visitor.visitor_id=$1', [id]);
            return rows.map(row => new Visitor(row));
        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw error;
        }
    }
}

module.exports = Visitor;