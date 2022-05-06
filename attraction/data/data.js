// TODO: lire le fichier utile.md avant d'executer ce fichier !

require('dotenv').config();

const visitors = require('./visitor.json');
const attractions = require('./attraction.json');
const incidents = require('./incident.json');

const db = require('../app/database');

const importDataA = async () => {

    for (const attraction of attractions) {
        const text = 'INSERT INTO "attraction" ("public_name","capacity","opening_hour" ,"closing_hour" ,"duration" ,"incident_report_time", "open_bool") VALUES ($1, $2, $3, $4, $5, $6, $7);';
        const values = [attraction.public_name, attraction.capacity ,attraction.opening_hour ,attraction.closing_hour ,attraction.duration ,attraction.incident_report_time,attraction.open_bool];
        await db.query(text, values, (err, _) => err ? console.log(err):console.log("attraction - OK"));
    };

};
const importDataV = async () => {
    for (const visitor of visitors) {
        const text = 'INSERT INTO "visitor" ("ticket_number","starting_date_of_validity","expiration_date","ticket_amount","booking_time") VALUES ($1, $2, $3, $4, $5);';
        const values = [visitor.ticket_number, visitor.starting_date_of_validity, visitor.expiration_date, visitor.ticket_amount, visitor.booking_time];
        await db.query(text, values, (err, _) => err ? console.log(err):console.log("visitor - OK"));  
    };
};
const importDataI = async () => {
    for (const incident of incidents) {
        const text = 'INSERT INTO "incident" ("origin","assigned_technician","resolution_date") VALUES ($1, $2, $3);';
        const values = [incident.origin, incident.assigned_technician, incident.resolution_date];
        await db.query(text, values, (err, _) => err ? console.log(err):console.log("Incident - OK"));
    };
};   

importDataA();
importDataV();
importDataI();
