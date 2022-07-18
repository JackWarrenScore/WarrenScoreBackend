--IMPORTANT NOTE: Postgres automatically makes things lower case, which
--is actually insane. Regardless, I need to use snake_case with all lowers
--so I don't rip my non-existant hair out when dealing w/ postgres.


DROP TABLE IF EXISTS campaign_config;
DROP TABLE IF EXISTS campaign_mailing_list;
DROP TABLE IF EXISTS campaign_code;
DROP TABLE IF EXISTS campaign;

CREATE TABLE campaign (
    id SERIAL PRIMARY KEY,
    owner TEXT
);

CREATE TABLE campaign_config (
    campaign_id INTEGER PRIMARY KEY,
    shape_max_size INTEGER,
    plus_modifier_amount INTEGER,
    times_modifier_amount INTEGER,
    power_modifier_amount INTEGER,
    undefined_modifier_amount INTEGER,
    radius_maximum INTEGER,
    score_type VARCHAR(3)
);

CREATE TABLE campaign_mailing_list (
    campaign_id INTEGER,
    email VARCHAR(60),
    PRIMARY KEY(campaign_id, email)
);

CREATE TABLE campaign_code (
    campaign_id INTEGER PRIMARY KEY,
    code TEXT
);

