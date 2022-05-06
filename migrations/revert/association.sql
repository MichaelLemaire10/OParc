-- Revert oparc:association from pg

BEGIN;

DROP TABLE attraction_visitor;
DROP TABLE attraction_incident;

COMMIT;
