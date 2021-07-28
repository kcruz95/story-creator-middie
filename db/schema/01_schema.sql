/*
Project Sputtr

User Stories
Our middie proj is a story-making website for kids called Sputtr.
It is set up in a way that kids can make their own stories using preset sentence templates of fairytales or kids stories or they can write themselves.
*/
--CREATE DATABASE sputtr;
--DROP DATABASE IF EXISTS sputtr;
--CREATE DATABASE sputtr OWNER labber;

-- REASSIGN OWNED BY jhan TO labber;
-- ALTER DATABASE sputtr OWNER TO labber;

--DROP TABLE IF EXISTS widgets CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS stories CASCADE;
DROP TABLE IF EXISTS contributions CASCADE;
DROP TABLE IF EXISTS votes CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE stories (
  id SERIAL PRIMARY KEY NOT NULL,
  creatorId INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  isCompleted BOOLEAN NOT NULL DEFAULT FALSE--,
  --completed_at DEFAULT NOW()::timestamp; --not sure if we need this
);

CREATE TABLE contributions (
  id SERIAL PRIMARY KEY NOT NULL,
  userId INTEGER REFERENCES users(id) ON DELETE CASCADE,
  storyId INTEGER REFERENCES stories(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  status VARCHAR(255) NOT NULL DEFAULT 'pending', --pending/denied/accepted // ENUM('pending','accepted','denied') - data type that stores string
  --upvote_count INTEGER NOT NULL DEFAULT 0, --to be removed
  sequence INTEGER DEFAULT NULL
);

CREATE TABLE votes (
  id SERIAL PRIMARY KEY NOT NULL,
  contributionId INTEGER REFERENCES contributions(id) ON DELETE CASCADE,
  userId INTEGER REFERENCES users(id) ON DELETE CASCADE
);
