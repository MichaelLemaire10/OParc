-- Verify oparc:init on pg

BEGIN;

SELECT * FROM attraction WHERE false;
SELECT * FROM incident WHERE false;
SELECT * FROM visitor WHERE false;

ROLLBACK;
