-- Deploy oparc:functions to pg

BEGIN;

create function update_incident(json) returns incident as $$
    update incident set 
    assigned_technician = $1->>'assigned_technician', 
    resolution_date = ($1->>'resolution_date')::timestamptz
    where id = ($1->>'id')::int
    returning *;
$$ language sql strict;

COMMIT;
