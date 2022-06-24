DROP TABLE IF EXISTS Campaigns;

CREATE TABLE Campaigns (
    id SERIAL,
    title TEXT,
    description TEXT,
    is_built boolean
);