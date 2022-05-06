-- Deploy oparc:init to pg

BEGIN;

CREATE TABLE attraction (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    public_name TEXT NOT NULL UNIQUE,
    capacity INT NOT NULL,
    opening_hour time,
    closing_hour time,
    duration TEXT,
    incident_report_time TIMESTAMPTZ,
    open_bool BOOLEAN
);

CREATE TABLE incident (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    date_incident TIMESTAMPTZ DEFAULT NOW(),
    origin TEXT NOT NULL,
    assigned_technician TEXT,
    resolution_date TIMESTAMPTZ
);

CREATE TABLE visitor (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    ticket_number INT NOT NULL,
    starting_date_of_validity TIMESTAMPTZ NOT NULL,
    expiration_date TIMESTAMPTZ NOT NULL,
    ticket_amount INT,
    booking_time time
);

COMMIT;
