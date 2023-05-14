CREATE TABLE `admin` (
  `id` uuid PRIMARY KEY,
  `email` varchar(255) UNIQUE NOT NULL,
  `password` string NOT NULL,
  `name` varchar(255) NOT NULL
);

CREATE TABLE `coach` (
  `id` uuid PRIMARY KEY,
  `email` varchar(255) UNIQUE NOT NULL,
  `password` string NOT NULL,
  `name` varchar(255) NOT NULL
);

CREATE TABLE `athlete` (
  `id` uuid PRIMARY KEY,
  `email` varchar(255) UNIQUE NOT NULL,
  `password` string NOT NULL,
  `name` varchar(255) UNIQUE NOT NULL,
  `coach_id` uuid DEFAULT null
);

CREATE TABLE `injury` (
  `id` int PRIMARY KEY,
  `type` varchar(255) NOT NULL
);

CREATE TABLE `training` (
  `id` int PRIMARY KEY,
  `time` datetime NOT NULL,
  `athlete_id` uuid NOT NULL,
  `duration` int DEFAULT null,
  `sleep_quality` int DEFAULT null,
  `RPE` int DEFAULT null,
  `description` string DEFAULT null,
  `injured` bool DEFAULT null,
  `injury_id` int NOT NULL,
  `note` string DEFAULT null
);

CREATE TABLE `training_workout_map` (
  `id` int PRIMARY KEY,
  `training_id` int NOT NULL,
  `workout_id` int NOT NULL
);

CREATE TABLE `workout` (
  `id` int PRIMARY KEY,
  `type` string NOT NULL
);

ALTER TABLE `athlete` ADD FOREIGN KEY (`coach_id`) REFERENCES `coach` (`id`);

ALTER TABLE `training` ADD FOREIGN KEY (`athlete_id`) REFERENCES `athlete` (`id`);

ALTER TABLE `training` ADD FOREIGN KEY (`injury_id`) REFERENCES `injury` (`id`);

ALTER TABLE `training_workout_map` ADD FOREIGN KEY (`training_id`) REFERENCES `training` (`id`);

ALTER TABLE `training_workout_map` ADD FOREIGN KEY (`workout_id`) REFERENCES `workout` (`id`);
