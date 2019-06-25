CREATE DATABASE teamsDB;
USE teamsDB;

CREATE TABLE teams(
    id int AUTO_INCREMENT,
    team VARCHAR(100) NOT NULL,
    wins VARCHAR(100) NOT NULL,
    losses VARCHAR(100) NOT NULL,
    season VARCHAR(100) NOT NULL,
    pointsFor VARCHAR(100) NOT NULL,
    pointsAgainst VARCHAR(100) NOT NULL,
    pointDiff VARCHAR(100) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE playersBio(
    id int AUTO_INCREMENT,
    apiID VARCHAR(100),
    team VARCHAR(100),
    full_name VARCHAR(100) NOT NULL,
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    height int NOT NULL,
    weight int NOT NULL,
    position VARCHAR(10),
    jerseyNumber VARCHAR(20),
    college VARCHAR(50),
    birth_place VARCHAR(50),
    experience VARCHAR(20),
    birthdate VARCHAR(50),
    draftStatus VARCHAR(50),
    PRIMARY KEY(id)
);

CREATE TABLE users
(
	id INT NOT NULL AUTO_INCREMENT,
	username VARCHAR(16) NOT NULL,
    password VARCHAR(220) NOT NULL,
	PRIMARY KEY (id)
);