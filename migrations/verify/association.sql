-- Verify oparc:association on pg

BEGIN;

SELECT * FROM attraction_visitor WHERE false;
SELECT * FROM attraction_incident WHERE false;

ROLLBACK;
