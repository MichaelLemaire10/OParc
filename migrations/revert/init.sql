-- Revert oparc:init from pg

BEGIN;

DROP TABLE visitor;
DROP TABLE incident;
DROP TABLE attraction;


COMMIT;
