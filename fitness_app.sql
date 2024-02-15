-- Drop the database if it exists
DROP DATABASE IF EXISTS fitness_app;

-- Create the database
CREATE DATABASE fitness_app;

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
VALUES ('Arms'), 
       ('Legs'),
       ('Chest'), 
       ('Back'),
       ('Shoulders');
    
-- Add records to the muscles table
INSERT INTO muscles (name, body_part_id)
	VALUES ('Biceps', 1),
		   ('Triceps', 1),
		   ('Brachioradialis', 1),
		   ('Flexor carpi', 1),
		   ('Extensor carpi', 1),
		   ('Quadriceps', 2),
		   ('Hamstrings', 2),
		   ('Gluteus Maximus', 2),
		   ('Adductors', 2),
		   ('Abductors', 2),
		   ('Calves', 2),
		   ('Tibialis Anterior', 2),
		   ('Pectoralis major', 3),
		   ('Pectoralis minor', 3),
		   ('Serratus anterior', 3),
		   ('Subclavius', 3),
		   ('Latissimus Dorsi', 4),
		   ('Rhomboids', 4),
		   ('Erector Spinae', 4),
		   ('Teres Major', 4),
		   ('Teres Minor', 4),
		   ('Deltoid', 5),
		   ('Trapezius', 5),
		   ('Infraspinatus', 5),
		   ('Supraspinatus', 5),
		   ('Trapezius', 4),
		   ('Deltoid', 4),
		   ('Latissimus Dorsi', 5),
		   ('Pectoralis major', 5);

-- Add records to the exercises table
-- Arm Exercises
INSERT INTO exercises (name, description, muscle_id)
VALUES 
    ('Barbell Bicep Curls', 'TBH.', 1),
    ('Dumbbell Bicep Curls', 'TBH.', 1),
    ('Hammer Curls', 'TBH.', 1),
    ('Concentration Curls', 'TBH.', 1),
    ('Preacher Curls', 'TBH.', 1),
    ('Tricep Dips', 'TBH.', 2),
    ('Tricep Pushdowns', 'TBH.', 2),
    ('Close-Grip Bench Press', 'TBH.', 2),
    ('Overhead Tricep Extension', 'TBH.', 2),
    ('Skull Crushers', 'TBH.', 2),
    ('Hammer Curls', 'TBH.', 3),
    ('Reverse Curls', 'TBH.', 3),
    ('Wrist Curls', 'TBH.', 3),
    ('Pronated Grip Barbell Curls', 'TBH.', 3),
    ('Wrist Curls', 'TBH.', 4),
    ('Reverse Wrist Curls', 'TBH.', 4),
    ('Farmer\'s Walks', 'TBH.', 4),
    ('Reverse Wrist Curls', 'TBH.', 5),
    ('Reverse Bicep Curls', 'TBH.', 5),
    ('Wrist Roller', 'TBH.', 5);

-- Leg Exercises
INSERT INTO exercises (name, description, muscle_id)
VALUES 
    ('Barbell Back Squats', 'TBH.', 6),
    ('Front Squats', 'TBH.', 6),
    ('Leg Press', 'TBH.', 6),
    ('Lunges', 'TBH.', 6),
    ('Leg Extensions', 'TBH.', 6),
    ('Deadlifts', 'TBH.', 7),
    ('Hamstring Curls', 'TBH.', 7),
    ('Good Mornings', 'TBH.', 7),
    ('Stiff-Legged Deadlifts', 'TBH.', 7),
    ('Glute-Ham Raises', 'TBH.', 7),
    ('Barbell Hip Thrusts', 'TBH.', 8),
    ('Bulgarian Split Squats', 'TBH.', 8),
    ('Glute Bridges', 'TBH.', 8),
    ('Deadlifts', 'TBH.', 8),
    ('Lunges', 'TBH.', 8),
    ('Inner Thigh Machine', 'TBH.', 9),
    ('Sumo Squats', 'TBH.', 9),
    ('Side Lunges', 'TBH.', 9),
    ('Seated Leg Press', 'TBH.', 9),
    ('Cable Hip Adductions', 'TBH.', 9),
    ('Lateral Leg Raises', 'TBH.', 10),
    ('Side-lying Clamshells', 'TBH.', 10),
    ('Cable Hip Adductions', 'TBH.', 10),
    ('Standing Band Abductions', 'TBH.', 10),
    ('Standing Calf Raises', 'TBH.', 11),
    ('Seated Calf Raises', 'TBH.', 11),
    ('Calf Press on the Leg Press Machine', 'TBH.', 11),
    ('Donkey Calf Raises', 'TBH.', 11),
    ('Jump Rope', 'TBH.', 11),
    ('Toe Taps', 'TBH.', 12),
    ('Dorsiflexion Exercises', 'TBH.', 12),
    ('Tibialis Raises', 'TBH.', 12),
    ('Seated Shin Stretch', 'TBH.', 12);

-- Chest Exercises
INSERT INTO exercises (name, description, muscle_id)
VALUES 
    ('Barbell Bench Press', 'TBH.', 13),
    ('Incline Bench Press', 'TBH.', 13),
    ('Dumbbell Bench Press', 'TBH.', 13),
    ('Decline Bench Press', 'TBH.', 13),
    ('Chest Flyes', 'TBH.', 13),
    ('Chest Dips', 'TBH.', 14),
    ('Incline Push-Ups', 'TBH.', 14),
    ('Push-Up Plus', 'TBH.', 14),
    ('Serratus Wall Slides', 'TBH.', 14),
    ('Serratus Anterior Push-Ups', 'TBH.', 15),
    ('Scapular Protraction Exercises', 'TBH.', 15),
    ('Kettlebell Pullovers', 'TBH.', 15),
    ('Plank with Shoulder Protraction', 'TBH.', 15),
    ('Push-Ups', 'TBH.', 16);

-- Back Exercises
INSERT INTO exercises (name, description, muscle_id)
VALUES 
    ('Pull-Ups', 'TBH.', 17),
    ('Lat Pulldowns', 'TBH.', 17),
    ('Barbell Rows', 'TBH.', 17),
    ('T-Bar Rows', 'TBH.', 17),
    ('Seated Cable Rows', 'TBH.', 17),
    ('Bent Over Rows', 'TBH.', 18),
    ('Face Pulls', 'TBH.', 18),
    ('Reverse Flyes', 'TBH.', 18),
    ('Prone Y Raises', 'TBH.', 18),
    ('Deadlifts', 'TBH.', 19),
    ('Hyperextensions', 'TBH.', 19),
    ('Good Mornings', 'TBH.', 19),
    ('Back Extensions', 'TBH.', 19),
    ('External Rotation Exercises', 'TBH.', 20),
    ('Lateral Raises', 'TBH.', 21),
    ('Shrugs', 'TBH.', 26),
    ('Face Pulls', 'TBH.', 26),
    ('Upright Rows', 'TBH.', 26),
    ('Barbell Rows', 'TBH.', 26),
    ('Deadlifts', 'TBH.', 26),
    ('Overhead Press', 'TBH.', 27),
    ('Lateral Raises', 'TBH.', 27),
    ('Front Raises', 'TBH.', 27),
    ('Upright Rows', 'TBH.', 27),
    ('Face Pulls', 'TBH.', 27);

-- Shoulder Exercises
INSERT INTO exercises (name, description, muscle_id)
VALUES 
    ('Overhead Press', 'TBH.', 22),
    ('Lateral Raises', 'TBH.', 22),
    ('Front Raises', 'TBH.', 22),
    ('Upright Rows', 'TBH.', 22),
    ('Face Pulls', 'TBH.', 22),
    ('Shrugs', 'TBH.', 23),
    ('Face Pulls', 'TBH.', 23),
    ('Upright Rows', 'TBH.', 23),
    ('Barbell Rows', 'TBH.', 23),
    ('Deadlifts', 'TBH.', 23),
    ('External Rotation Exercises', 'TBH.', 24),
    ('Face Pulls', 'TBH.', 24),
    ('Reverse Flyes', 'TBH.', 24),
    ('Lateral Raises', 'TBH.', 24),
    ('Overhead Press', 'TBH.', 25),
    ('Face Pulls', 'TBH.', 25),
    ('Lateral Raises', 'TBH.', 25),
    ('Front Raises', 'TBH.', 25),
    ('Pull-Ups', 'TBH.', 28),
    ('Lat Pulldowns', 'TBH.', 28),
    ('Barbell Rows', 'TBH.', 28),
    ('T-Bar Rows', 'TBH.', 28),
    ('Seated Cable Rows', 'TBH.', 28),
    ('Chest Dips', 'TBH.', 29),
    ('Incline Push-Ups', 'TBH.', 29),
    ('Push-Up Plus', 'TBH.', 29),
    ('Serratus Wall Slides', 'TBH.', 29);
