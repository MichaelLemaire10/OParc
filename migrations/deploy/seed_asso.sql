-- Deploy oparc:seed_asso to pg

BEGIN;

INSERT INTO attraction_incident (attraction_id, incident_id) VALUES
(1,1),
(2,2),
(3,3),
(4,4),
(5,5);

INSERT INTO attraction_visitor (attraction_id, visitor_id) VALUES
(6,2),
(8,4);

COMMIT;
