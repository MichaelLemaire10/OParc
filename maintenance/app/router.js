const { Router } = require("express");

const incidentController = require("./controllers/incidentController");

const router = Router();

router.get("/", incidentController.listing);

router.get("/incident/new", incidentController.newIncident);

router.post("/incident/new", incidentController.newPostIncident);

router.get("/incident/:id(\\d+)", incidentController.currentIncident);

router.post(
  "/incident/update/:id(\\d+)",
  incidentController.currentPostIncident
);

router.post(
  "/incident/delete/:id(\\d+)",
  incidentController.currentDeleteIncident
);

module.exports = router;
