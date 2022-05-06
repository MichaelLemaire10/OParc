-- Revert oparc:functions from pg

BEGIN;

DROP FUNCTION update_incident;

COMMIT;
