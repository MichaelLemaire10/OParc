-- Deploy oparc:association to pg

BEGIN;

CREATE TABLE attraction_visitor (
    attraction_id INT NOT NULL REFERENCES attraction(id),
    visitor_id INT NOT NULL REFERENCES visitor(id),
    PRIMARY KEY(attraction_id, visitor_id)
);

CREATE TABLE attraction_incident (
    attraction_id INT NOT NULL REFERENCES attraction(id),
    incident_id INT NOT NULL REFERENCES incident(id),
    PRIMARY KEY(attraction_id, incident_id)
);

COMMIT;
