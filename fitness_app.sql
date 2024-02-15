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
    ('Barbell Bicep Curls', 'Perform standing with a barbell, curling it towards your chest, targeting the whole bicep.', 1),
    ('Dumbbell Bicep Curls', 'Hold dumbbells in each hand, curl towards shoulders, targeting the entire bicep.', 1),
    ('Hammer Curls', 'Hold dumbbells with neutral grip, curling towards shoulders, targeting the brachialis and brachioradialis.', 1),
    ('Concentration Curls', 'Sit on a bench, arm against inner thigh, curl dumbbell towards shoulder, targeting the peak of the bicep.', 1),
    ('Preacher Curls', 'Using preacher bench, curl barbell towards shoulders, isolating the lower bicep.', 1),
    ('Tricep Dips', 'Perform using parallel bars, lowering body by bending arms, targeting the triceps.', 2),
    ('Tricep Pushdowns', 'Using cable machine, push bar down, extending elbows, targeting triceps.', 2),
    ('Close-Grip Bench Press', 'Bench press with narrow grip, targeting triceps and inner chest muscles.', 2),
    ('Overhead Tricep Extension', 'Hold dumbbell overhead, lower behind head, extending elbows, targeting triceps.', 2),
    ('Skull Crushers', 'Lying on bench, lower barbell to forehead, extending elbows, targeting triceps.', 2),
    ('Hammer Curls', 'Hold dumbbells with neutral grip, curling towards shoulders, targeting the brachialis and brachioradialis.', 3),
    ('Reverse Curls', 'Hold barbell with overhand grip, curl towards shoulders, targeting brachioradialis and forearms.', 3),
    ('Wrist Curls', 'Hold barbell with palms up, curl wrists upwards, targeting wrist flexors.', 3),
    ('Pronated Grip Barbell Curls', 'Hold barbell with overhand grip, curl towards shoulders, targeting brachioradialis and forearms.', 3),
    ('Wrist Curls', 'Hold barbell with palms up, curl wrists upwards, targeting wrist flexors.', 4),
    ('Reverse Wrist Curls', 'Hold barbell with palms down, curl wrists upwards, targeting wrist extensors.', 4),
    ('Farmer\'s Walks', 'Hold heavy dumbbells or kettlebells and walk, engaging forearm muscles for grip strength.', 4),
    ('Reverse Wrist Curls', 'Hold heavy dumbbells or kettlebells and walk, engaging forearm muscles for grip strength.', 5),
    ('Reverse Bicep Curls', 'Hold barbell with overhand grip, curl towards shoulders, targeting brachioradialis and forearms.', 5),
    ('Wrist Roller', 'Roll weight up and down with wrists, targeting wrist flexors and extensors.', 5);


-- Leg Exercises
INSERT INTO exercises (name, description, muscle_id)
VALUES 
    ('Barbell Back Squats', 'Stand with barbell on shoulders, squatting down, targeting quads, hamstrings, and glutes.', 6),
    ('Front Squats', 'Hold barbell in front, squat down, targeting quads, core, and upper back.', 6),
    ('Leg Press', 'Sit on machine, press platform away, targeting quads, hamstrings, and glutes.', 6),
    ('Lunges', 'Step forward or backward, lowering body, targeting quads, hamstrings, and glutes.', 6),
    ('Leg Extensions', 'Sit on machine, extend legs, targeting quadriceps.', 6),
    ('Deadlifts', 'Stand with barbell, hinge at hips, lifting, targeting posterior chain muscles.', 7),
    ('Hamstring Curls', 'Lie on machine, curl legs towards glutes, targeting hamstrings.', 7),
    ('Good Mornings', 'Hold barbell on shoulders, hinge at hips, targeting hamstrings and lower back.', 7),
    ('Stiff-Legged Deadlifts', 'Hold barbell, hinge at hips, keeping legs straight, targeting hamstrings.', 7),
    ('Glute-Ham Raises', 'Secure feet, lower body, then lift, targeting hamstrings and glutes.', 7),
    ('Barbell Hip Thrusts', 'Sit with barbell across hips, thrust upwards, targeting glutes and hamstrings.', 8),
    ('Bulgarian Split Squats', 'Stand with rear foot elevated, lunge down, targeting quads, hamstrings, and glutes.', 8),
    ('Glute Bridges', 'Lie on back, lift hips, squeezing glutes, targeting glutes and hamstrings.', 8),
    ('Deadlifts', 'Stand with barbell, hinge at hips, lifting, targeting posterior chain muscles.', 8),
    ('Lunges', 'Step forward or backward, lowering body, targeting quads, hamstrings, and glutes.', 8),
    ('Inner Thigh Machine', 'Sit on machine, press legs together, targeting inner thigh muscles.', 9),
    ('Sumo Squats', 'Stand with wide stance, squat down, targeting inner thighs, quads, and glutes.', 9),
    ('Side Lunges', 'Step to side, bending knee, targeting inner thighs, quads, and glutes.', 9),
    ('Seated Leg Press', 'Sit on machine, press platform away, targeting quads, hamstrings, and glutes.', 9),
    ('Cable Hip Adductions', 'Stand with cable at ankle, move leg across body, targeting inner thigh muscles.', 9),
    ('Lateral Leg Raises', 'Lie on side, lift top leg, targeting outer thigh muscles.', 10),
    ('Side-lying Clamshells', 'Lie on side, open and close top knee, targeting hip abductors.', 10),
    ('Cable Hip Adductions', 'Stand with cable at ankle, move leg across body, targeting inner thigh muscles.', 10),
    ('Standing Band Abductions', 'Attach band to ankle, lift leg to side, targeting hip abductors.', 10),
    ('Standing Calf Raises', 'Stand on edge of step, lift heels, targeting calf muscles.', 11),
    ('Seated Calf Raises', 'Sit on machine, press weight with balls of feet, targeting calf muscles.', 11),
    ('Calf Press on the Leg Press Machine', 'Sit on leg press machine, press platform with balls of feet, targeting calf muscles.', 11),
    ('Donkey Calf Raises', 'Bend at hips, lower head towards floor, raise heels, targeting calf muscles.', 11),
    ('Jump Rope', 'Jump repeatedly over rope, targeting calf muscles and cardiovascular system.', 11),
    ('Toe Taps', 'Stand on one leg, tap other foot in front and to side, targeting calf muscles.', 12),
    ('Dorsiflexion Exercises', 'Sit with foot flat on ground, lift toes towards shin, targeting shin muscles.', 12),
    ('Tibialis Raises', 'Sit with foot flexed, lift toes towards shin, targeting shin muscles.', 12),
    ('Seated Shin Stretch', 'Sit on floor, flex toes upwards, stretching shin muscles.', 12);



-- Chest Exercises
INSERT INTO exercises (name, description, muscle_id)
VALUES 
    ('Barbell Bench Press', 'Lie on bench, lower bar to chest, press up, targeting chest, shoulders, and triceps.', 13),
    ('Incline Bench Press', 'Lie on incline bench, lower bar to upper chest, press up, targeting upper chest.', 13),
    ('Dumbbell Bench Press', 'Lie on bench, lower dumbbells to chest, press up, targeting chest and stabilizing muscles.', 13),
    ('Decline Bench Press', 'Lie on decline bench, lower bar to lower chest, press up, targeting lower chest.', 13),
    ('Chest Flyes', 'Lie on bench, arms extended, lower dumbbells to sides, then raise, targeting chest.', 13),
    ('Chest Dips', 'Using parallel bars, lower body, then press up, targeting chest, shoulders, and triceps.', 14),
    ('Incline Push-Ups', 'Perform push-ups with hands elevated, targeting upper chest and shoulders.', 14),
    ('Push-Up Plus', 'Perform push-up, then protract shoulders at top, targeting serratus anterior.', 14),
    ('Serratus Wall Slides', 'Stand against wall, slide arms up and down, targeting serratus anterior.', 14),
    ('Serratus Anterior Push-Ups', 'Perform push-up, protracting shoulders at top, targeting serratus anterior.', 15),
    ('Scapular Protraction Exercises', 'Engage in exercises to protract shoulders, targeting serratus anterior.', 15),
    ('Kettlebell Pullovers', 'Hold kettlebell overhead, lower behind head, then return, targeting chest and lats.', 15),
    ('Plank with Shoulder Protraction', 'Hold plank position, protracting shoulders, targeting serratus anterior.', 15),
    ('Push-Ups', 'Perform push-ups, lowering and raising body, targeting chest, shoulders, and triceps.', 16);


-- Back Exercises
INSERT INTO exercises (name, description, muscle_id)
VALUES 
    ('Pull-Ups', 'Hang from bar, pull body up until chin reaches or clears bar, targeting lats and upper back.', 17),
    ('Lat Pulldowns', 'Sit at lat pulldown machine, pull bar down to chest, targeting lats and upper back.', 17),
    ('Barbell Rows', 'Bend at hips, pull barbell to lower chest, targeting upper back and lats.', 17),
    ('T-Bar Rows', 'Bend at hips, row barbell to chest, targeting upper back and lats.', 17),
    ('Seated Cable Rows', 'Sit at cable row machine, pull handles to abdomen, targeting middle back.', 17),
    ('Bent Over Rows', 'Bend at hips, row dumbbells or barbell to abdomen, targeting upper back and lats.', 18),
    ('Face Pulls', 'Attach rope to cable, pull towards face, targeting rear delts and upper back.', 18),
    ('Reverse Flyes', 'Bend at hips, raise dumbbells to sides, targeting rear delts and upper back.', 18),
    ('Prone Y Raises', 'Lie face down, raise arms in Y shape, targeting rear delts and upper back.', 18),
    ('Deadlifts', 'Stand with barbell, hinge at hips, lifting, targeting posterior chain muscles.', 19),
    ('Hyperextensions', 'Lie face down on hyperextension bench, raise torso, targeting lower back and glutes.', 19),
    ('Good Mornings', 'Hold barbell on shoulders, hinge at hips, targeting lower back and hamstrings.', 19),
    ('Back Extensions', 'Lie face down on hyperextension bench, raise torso, targeting lower back and glutes.', 19),
    ('External Rotation Exercises', 'Engage in exercises to externally rotate shoulders, targeting rotator cuff muscles.', 20),
    ('Lateral Raises', 'Hold dumbbells, lift arms to sides, targeting lateral deltoids.', 21),
    ('Shrugs', 'Hold dumbbells or barbell, shrug shoulders upwards, targeting trapezius muscles.', 26),
    ('Face Pulls', 'Attach rope to cable, pull towards face, targeting rear delts and upper back.', 26),
    ('Upright Rows', 'Hold barbell with overhand grip, lift towards chin, targeting traps and deltoids.', 26),
    ('Barbell Rows', 'Bend at hips, row barbell to abdomen, targeting upper back and lats.', 26),
    ('Deadlifts', 'Stand with barbell, hinge at hips, lifting, targeting posterior chain muscles.', 26),
    ('Overhead Press', 'Hold barbell at shoulders, press overhead, targeting deltoids and triceps.', 27),
    ('Lateral Raises', 'Hold dumbbells, lift arms to sides, targeting lateral deltoids.', 27),
    ('Front Raises', 'Hold dumbbells, lift arms in front, targeting anterior deltoids.', 27),
    ('Upright Rows', 'Hold barbell with overhand grip, lift towards chin, targeting traps and deltoids.', 27),
    ('Face Pulls', 'Attach rope to cable, pull towards face, targeting rear delts and upper back.', 27);


-- Shoulder Exercises
INSERT INTO exercises (name, description, muscle_id)
VALUES 
    ('Overhead Press', 'Hold barbell at shoulders, press overhead, targeting deltoids and triceps.', 22),
    ('Lateral Raises', 'Hold dumbbells, lift arms to sides, targeting lateral deltoids.', 22),
    ('Front Raises', 'Hold dumbbells, lift arms in front, targeting anterior deltoids.', 22),
    ('Upright Rows', 'Hold barbell with overhand grip, lift towards chin, targeting traps and deltoids.', 22),
    ('Face Pulls', 'Attach rope to cable, pull towards face, targeting rear delts and upper back.', 22),
    ('Shrugs', 'Hold dumbbells or barbell, shrug shoulders upwards, targeting trapezius muscles.', 23),
    ('Face Pulls', 'Attach rope to cable, pull towards face, targeting rear delts and upper back.', 23),
    ('Upright Rows', 'Hold barbell with overhand grip, lift towards chin, targeting traps and deltoids.', 23),
    ('Barbell Rows', 'Bend at hips, row barbell to abdomen, targeting upper back and lats.', 23),
    ('Deadlifts', 'Stand with barbell, hinge at hips, lifting, targeting posterior chain muscles.', 23),
    ('External Rotation Exercises', 'Engage in exercises to externally rotate shoulders, targeting rotator cuff muscles.', 24),
    ('Face Pulls', 'Attach rope to cable, pull towards face, targeting rear delts and upper back.', 24),
    ('Reverse Flyes', 'Bend at hips, raise dumbbells to sides, targeting rear delts and upper back.', 24),
    ('Lateral Raises', 'Hold dumbbells, lift arms to sides, targeting lateral deltoids.', 24),
    ('Overhead Press', 'Hold barbell at shoulders, press overhead, targeting deltoids and triceps.', 25),
    ('Face Pulls', 'Attach rope to cable, pull towards face, targeting rear delts and upper back.', 25),
    ('Lateral Raises', 'Hold dumbbells, lift arms to sides, targeting lateral deltoids.', 25),
    ('Front Raises', 'Hold dumbbells, lift arms in front, targeting anterior deltoids.', 25),
    ('Pull-Ups', 'Hang from bar, pull body up until chin reaches or clears bar, targeting lats and upper back.', 28),
    ('Lat Pulldowns', 'Sit at lat pulldown machine, pull bar down to chest, targeting lats and upper back.', 28),
    ('Barbell Rows', 'Bend at hips, row barbell to abdomen, targeting upper back and lats.', 28),
    ('T-Bar Rows', 'Bend at hips, row barbell to chest, targeting upper back and lats.', 28),
    ('Seated Cable Rows', 'Sit at cable row machine, pull handles to abdomen, targeting middle back.', 28),
    ('Chest Dips', 'Using parallel bars, lower body, then press up, targeting chest, shoulders, and triceps.', 29),
    ('Incline Push-Ups', 'Perform push-ups with hands elevated, targeting upper chest and shoulders.', 29),
    ('Push-Up Plus', 'Perform push-up, then protract shoulders at top, targeting serratus anterior.', 29),
    ('Serratus Wall Slides', 'Stand against wall, slide arms up and down, targeting serratus anterior.', 29);
