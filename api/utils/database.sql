-- single line comment
/*
 multi line comment
 */
-- create a database
CREATE DATABASE ivicosdb;

-- create a table for Organization
CREATE TABLE organization(
    id UUID PRIMARY KEY,
    archived BOOLEAN NOT NULL,
    created_at TIMESTAMPTZ NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL
);

-- create a table for Areas
CREATE TABLE areas(
    id UUID PRIMARY KEY,
    organization_id UUID NOT NULL,
    name VARCHAR(255) NOT NULL,
    icon TEXT,
    archived BOOLEAN NOT NULL,
    created_at TIMESTAMPTZ NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL,
    CONSTRAINT fk_organization FOREIGN KEY (organization_id) REFERENCES organization(id)
);

--create a table for Rooms
CREATE TABLE rooms(
    id UUID PRIMARY KEY,
    area_id UUID NOT NULL,
    team_id TEXT NOT NULL,
    channel_id TEXT NOT NULL,
    archived BOOLEAN NOT NULL,
    created_at TIMESTAMPTZ NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL,
    CONSTRAINT fk_area FOREIGN KEY (area_id) REFERENCES areas(id)
);

-- create a table for users
CREATE TABLE users(
    id UUID PRIMARY KEY,
    org_id UUID NOT NULL,
    tabs TEXT [],
    archived BOOLEAN NOT NULL,
    created_at TIMESTAMPTZ NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL
);

-- CREATE TABLE users(
--     id UUID PRIMARY KEY,
--     org_id UUID NOT NULL,
--     tabs TEXT [],
--     archived BOOLEAN NOT NULL,
--     created_at TIMESTAMPTZ NOT NULL,
--     updated_at TIMESTAMPTZ NOT NULL,
--     CONSTRAINT fk_organization FOREIGN KEY (org_id) REFERENCES organization(id)
-- );
-- create a table for Dashboards
CREATE TABLE dashboards(
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    name TEXT NOT NULL,
    archived BOOLEAN NOT NULL,
    created_at TIMESTAMPTZ NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);

-- created a table for Widgets
CREATE TABLE widgets(
    id UUID PRIMARY KEY,
    dashboard_id UUID NOT NULL,
    type TEXT NOT NULL,
    position INTEGER [] NOT NULL,
    archived BOOLEAN NOT NULL,
    created_at TIMESTAMPTZ NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL,
    CONSTRAINT fk_dashboard FOREIGN KEY (dashboard_id) REFERENCES dashboards(id)
);