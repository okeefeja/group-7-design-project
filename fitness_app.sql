-- Use the database for the fitness app
USE fitness_app;

-- Delete any tables which currently exist in the fitness app's database
DROP TABLE IF EXISTS workout_programs;
DROP TABLE IF EXISTS exercises;
DROP TABLE IF EXISTS muscles;
DROP TABLE IF EXISTS body_parts;

-- Create a table which contains all body part records
CREATE TABLE body_parts (
	id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR (50)
);

-- Create a table which contains all muscle records
CREATE TABLE muscles (
	id INT AUTO_INCREMENT PRIMARY KEY, 
    name VARCHAR (50),
    body_part_id INT,
    FOREIGN KEY (body_part_id) REFERENCES body_parts(id)
);

-- Create a table which contains all exercise records
CREATE TABLE exercises (
	id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR (50), 
    description TEXT,
    muscle_id INT, 
    FOREIGN KEY (muscle_id) REFERENCES muscles(id)
);

-- Create a table which contains all workout program records
CREATE TABLE workout_programs (
	id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    exercise_id INT,
    FOREIGN KEY (exercise_id) REFERENCES exercises(id)
);

-- Add records to the body parts table
INSERT INTO body_parts (name)
VALUES 
	('Arms'), 
    ('Legs'),
    ('Chest'), 
    ('Back'),
    ('Shoulders');
    
-- Add records to the muscles table
INSERT INTO muscles (name, body_part_id)
VALUES ('Biceps', 1);
INSERT INTO muscles (name, body_part_id)
VALUES ('Triceps', 1);
INSERT INTO muscles (name, body_part_id)
VALUES ('Brachioradialis', 1);
INSERT INTO muscles (name, body_part_id)
VALUES ('Flexor carpi', 1);
INSERT INTO muscles (name, body_part_id)
VALUES ('Extensor carpi', 1);
INSERT INTO muscles (name, body_part_id)
VALUES ('Quadriceps', 2);
INSERT INTO muscles (name, body_part_id)
VALUES ('Hamstrings', 2);
INSERT INTO muscles (name, body_part_id)
VALUES ('Gluteus Maximus', 2);
INSERT INTO muscles (name, body_part_id)
VALUES ('Adductors', 2);
INSERT INTO muscles (name, body_part_id)
VALUES ('Abductors', 2);
INSERT INTO muscles (name, body_part_id)
VALUES ('Calves', 2);
INSERT INTO muscles (name, body_part_id)
VALUES ('Tibialis Anterior', 2);
INSERT INTO muscles (name, body_part_id)
VALUES ('Pectoralis major', 3);
INSERT INTO muscles (name, body_part_id)
VALUES ('Pectoralis minor', 3);
INSERT INTO muscles (name, body_part_id)
VALUES ('Serratus anterior', 3);
INSERT INTO muscles (name, body_part_id)
VALUES ('Subclavius', 3);
INSERT INTO muscles (name, body_part_id)
VALUES ('Latissimus Dorsi', 4);
INSERT INTO muscles (name, body_part_id)
VALUES ('Rhomboids', 4);
INSERT INTO muscles (name, body_part_id)
VALUES ('Erector Spinae', 4);
INSERT INTO muscles (name, body_part_id)
VALUES ('Teres Major', 4);
INSERT INTO muscles (name, body_part_id)
VALUES ('Teres Minor', 4);
INSERT INTO muscles (name, body_part_id)
VALUES ('Deltoid', 5);
INSERT INTO muscles (name, body_part_id)
VALUES ('Trapezius', 5);
INSERT INTO muscles (name, body_part_id)
VALUES ('Infraspinatus', 5);
INSERT INTO muscles (name, body_part_id)
VALUES ('Supraspinatus', 5);
