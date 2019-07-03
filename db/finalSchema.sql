
CREATE DATABASE sports_stats_db;
USE sports_stats_db;

CREATE TABLE users
(
	id INT NOT NULL AUTO_INCREMENT,
	username VARCHAR(16) NOT NULL,
  password VARCHAR(220) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE userRoster 
(
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT, 
  player_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id), 
  FOREIGN KEY (player_id) REFERENCES playersBio(id),
  PRIMARY KEY (id)
);

-- AKA TABLE THREE IN seeds.sql
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

-- AKA TABLE TWO IN seeds.sql
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

-- AKA TABLE ONE IN seeds.sql
CREATE TABLE playerStatsSeason(
  id int AUTO_INCREMENT,
  status VARCHAR(20),
  full_name VARCHAR(100) NOT NULL,
  season int NOT NULL,
  team VARCHAR(100),
  field_goals_made DECIMAL(20,5),
  field_goals_att DECIMAL(20,5),
  field_goals_pct DECIMAL(20,5),
  two_points_made DECIMAL(20,5),
  two_points_att DECIMAL(20,5),
  two_points_pct DECIMAL(20,5),
  three_points_made DECIMAL(20,5),
  three_points_att VARCHAR(100),
  three_points_pct DECIMAL(20,5),
  blocked_att DECIMAL(20,5),
  free_throws_made DECIMAL(20,5),
  free_throws_att DECIMAL(20,5),
  free_throws_pct DECIMAL(20,5),
  offensive_rebounds int,
  defensive_rebounds int,
  rebounds int,
  assists int,
  turnovers int,
  assists_turnover_ratio DECIMAL(20,5),
  steals int,
  blocks int,
  personal_fouls int,
  tech_fouls int,
  points int,
  flagrant_fouls int,
  ejections int,
  foulouts int,
  true_shooting_att DECIMAL(20,5),
  true_shooting_pct DECIMAL(20,5),
  efficiency int,
  points_off_turnovers int,
  points_in_paint int,
  points_in_paint_made int,
  points_in_paint_att int,
  points_in_paint_pct DECIMAL(20,5),
  effective_fg_pct DECIMAL(20,5),
  double_doubles int,
  triple_doubles int,
  fouls_drawn int,
  offensive_fouls int,
  fast_break_pts int,
  fast_break_att int,
  fast_break_made int,
  fast_break_pct DECIMAL(20,5),
  coach_ejections int,
  second_chance_pct DECIMAL(20,5),
  second_chance_pts int,
  second_chance_att int,
  second_chance_made int,
  minus int,
  plus int,
  PRIMARY KEY(id)
);

CREATE TABLE playerAverages(
  id int AUTO_INCREMENT,
  full_name VARCHAR(100),
  season int,
  team VARCHAR(100),
  minutes DECIMAL(20,5),
  points DECIMAL(20,5),
  off_rebounds DECIMAL(20,5),
  def_rebounds DECIMAL(20,5),
  rebounds DECIMAL(20,5),
  assists VARCHAR(100),
  steals DECIMAL(20,5),
  blocks DECIMAL(20,5),
  turnovers DECIMAL(20,5),
  personal_fouls DECIMAL(20,5),
  flagrant_fouls DECIMAL(20,5),
  blocked_att DECIMAL(20,5),
  field_goals_made DECIMAL(20,5),
  field_goals_att DECIMAL(20,5),
  three_points_made DECIMAL(20,5),
  three_points_att DECIMAL(20,5),
  free_throws_made DECIMAL(20,5),
  free_throws_att DECIMAL(20,5),
  two_points_made DECIMAL(20,5),
  two_points_att DECIMAL(20,5),
  efficiency DECIMAL(20,5),
  true_shooting_att DECIMAL(20,5),
  points_off_turnovers DECIMAL(20,5),
  points_in_paint_made DECIMAL(20,5),
  points_in_paint_att DECIMAL(20,5),
  points_in_paint DECIMAL(20,5),
  fouls_drawn DECIMAL(20,5),
  offensive_fouls DECIMAL(20,5),
  fast_break_pts DECIMAL(20,5),
  fast_break_att DECIMAL(20,5),
  fast_break_made DECIMAL(20,5),
  second_chance_pts DECIMAL(20,5),
  second_chance_att DECIMAL(20,5),
  second_chance_made DECIMAL(20,5),
  PRIMARY KEY(id)
);
