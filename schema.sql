-- CREATE YOUR DATABASE
DROP DATABASE if exists battleship;
CREATE DATABASE battleship;
use battleship;
-- CREATE YOUR TABLES
CREATE TABLE users (id INTEGER AUTO_INCREMENT UNIQUE PRIMARY KEY,
                   username VARCHAR(20),
                   board VARCHAR(100),
                   active BOOLEAN);
CREATE TABLE games (game_id INTEGER AUTO_INCREMENT UNIQUE PRIMARY KEY,
                   user_1 VARCHAR(20),
                   user_2 VARCHAR(20),
                   victor VARCHAR(20));

-- ADD RECORDS TO YOUR TABLE

-- INSERT into cows (name, description)
-- VALUES ('moo', 'moocow1');

-- INSERT into cows (name, description)
-- VALUES ('moo2', 'moocow2');
