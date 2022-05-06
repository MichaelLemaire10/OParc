const dayjs = require("dayjs");
const advancedFormat = require("dayjs/plugin/advancedFormat");
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");
const locale_fr = require("dayjs/locale/fr");

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(advancedFormat);
dayjs.tz.setDefault("Europe/Paris");

const Incident = require("../models/incident");
const Attraction = require("../models/attraction");
const { request, response } = require("express");

module.exports = {

    listing: async (_, response) => {
        const incidents = await Incident.listing(); 
        for (const incident of incidents) {

            incident.date_incident = dayjs(incident.date_incident).tz().locale("fr").format("DD MMMM YYYY");

            if (incident.resolution_date) {
                incident.resolution_date = dayjs(incident.resolution_date)
                    .tz()
                    .locale("fr")
                    .format("DD MMMM YYYY");
            }
            else {
                incident.resolution_date ="";
            }
        }
        response.render('index', {incidents});        
    },

    newIncident: async (_, response) => {
        try {
            const attractions = await Attraction.findAll();
            
         response.render('newincident', {attractions});
        } catch (error) {
            
        }
    },

    newPostIncident: async (request, response) => {
        const incident = new Incident(request.body);  
        try {
            const data = await incident.save();
            response.redirect(`/v1/incident/${data.id}`);
        } catch(error) {
            response.status(500).json(error.message);
        }
    },
    
    currentIncident: async (request, response) => {
        const id = parseInt(request.params.id, 10);
        const incident = await Incident.currentIncident(id);
        if (incident.resolution_date) {
            incident.resolution_date = dayjs(incident.resolution_date)
                .tz()
                .locale("fr")
                .format("DD MMMM YYYY");
        }
        else {
            incident.resolution_date ="MM/DD/YYYY";
        }
        response.render('incidentbyid', {incident});
    },

    currentPostIncident: async (request, response) => {
        if(!request.body.resolution_date) request.body.resolution_date=null
        try {
            await new Incident({
                ...request.body,
                id: +request.params.id
            }).update();
            response.redirect('/v1/');
        } catch(error) {
            response.status(500).json(error.message);
        }
    },

    currentDeleteIncident: async (request, response) => {
        try {
            await Incident.delete(+request.params.id);
            response.redirect('/v1/');
        } catch (error) {
            console.error(error);
        }
    }
}