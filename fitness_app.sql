USE fitness_app;

DROP TABLE IF EXISTS workout_programs;
DROP TABLE IF EXISTS exercises;
DROP TABLE IF EXISTS muscles;
DROP TABLE IF EXISTS body_parts;

CREATE TABLE body_parts (
	id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR (50)
);

CREATE TABLE muscles (
	id INT AUTO_INCREMENT PRIMARY KEY, 
    name VARCHAR (50),
    body_part_id INT,
    FOREIGN KEY (body_part_id) REFERENCES body_parts(id)
);

CREATE TABLE exercises (
	id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR (50), 
    description TEXT,
    muscle_id INT, 
    FOREIGN KEY (muscle_id) REFERENCES muscles(id)
);

CREATE TABLE workout_programs (
	id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    exercise_id INT,
    FOREIGN KEY (exercise_id) REFERENCES exercises(id)
);

INSERT INTO body_parts (name)
VALUES 
	('Arms'), 
    ('Legs'),
    ('Chest'), 
    ('Back'),
    ('Shoulders');
