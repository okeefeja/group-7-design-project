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
    description TEXT
);

-- Create a table which contains all workout program records
CREATE TABLE workout_programs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    description TEXT
);

-- Create a table which contains all user records
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    username VARCHAR(50),
    password VARCHAR(50)
); 

CREATE TABLE exercises_workout_program (
    workout_program_id INT,
    exercise_id INT,
    FOREIGN KEY (workout_program_id) REFERENCES workout_programs(id),
    FOREIGN KEY (exercise_id) REFERENCES exercises(id)
);

CREATE TABLE muscles_exercises (
    exercise_id INT,
    muscle_id INT,
    FOREIGN KEY (exercise_id) REFERENCES exercises(id),
    FOREIGN KEY (muscle_id) REFERENCES muscles(id)
);

CREATE TABLE users_workout_program (
    user_id INT,
    workout_program_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (workout_program_id) REFERENCES workout_programs(id)
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


-- Add records to exercises table
-- Arm Exercises
INSERT INTO exercises (name, description)
VALUES 
    ('Barbell Bicep Curls', 'Perform standing with a barbell, curling it towards your chest, targeting the whole bicep.'),
    ('Dumbbell Bicep Curls', 'Hold dumbbells in each hand, curl towards shoulders, targeting the entire bicep.'),
    ('Hammer Curls', 'Hold dumbbells with neutral grip, curling towards shoulders, targeting the brachialis and brachioradialis.'),
    ('Concentration Curls', 'Sit on a bench, arm against inner thigh, curl dumbbell towards shoulder, targeting the peak of the bicep.'),
    ('Preacher Curls', 'Using preacher bench, curl barbell towards shoulders, isolating the lower bicep.'),
    ('Tricep Dips', 'Perform using parallel bars, lowering body by bending arms, targeting the triceps.'),
    ('Tricep Pushdowns', 'Using cable machine, push bar down, extending elbows, targeting triceps.'),
    ('Close-Grip Bench Press', 'Bench press with a narrow grip, targeting triceps and inner chest muscles.'),
    ('Overhead Tricep Extension', 'Hold dumbbell overhead, lower behind head, extending elbows, targeting triceps.'),
    ('Skull Crushers', 'Lying on a bench, lower barbell to forehead, extending elbows, targeting triceps.'),
    ('Hammer Curls', 'Hold dumbbells with a neutral grip, curling towards shoulders, targeting the brachialis and brachioradialis.'),
    ('Reverse Curls', 'Hold barbell with overhand grip, curl towards shoulders, targeting brachioradialis and forearms.'),
    ('Wrist Curls', 'Hold barbell with palms up, curl wrists upwards, targeting wrist flexors.'),
    ('Pronated Grip Barbell Curls', 'Hold barbell with overhand grip, curl towards shoulders, targeting brachioradialis and forearms.'),
    ('Wrist Curls', 'Hold barbell with palms up, curl wrists upwards, targeting wrist flexors.'),
    ('Reverse Wrist Curls', 'Hold barbell with palms down, curl wrists upwards, targeting wrist extensors.'),
    ('Farmer''s Walks', 'Hold heavy dumbbells or kettlebells and walk, engaging forearm muscles for grip strength.'),
    ('Reverse Wrist Curls', 'Hold heavy dumbbells or kettlebells and walk, engaging forearm muscles for grip strength.'),
    ('Reverse Bicep Curls', 'Hold barbell with overhand grip, curl towards shoulders, targeting brachioradialis and forearms.'),
    ('Wrist Roller', 'Roll weight up and down with wrists, targeting wrist flexors and extensors.');

-- Leg Exercises
INSERT INTO exercises (name, description)
VALUES 
    ('Barbell Back Squats', 'Stand with barbell on shoulders, squatting down, targeting quads, hamstrings, and glutes.'),
    ('Front Squats', 'Hold barbell in front, squat down, targeting quads, core, and upper back.'),
    ('Leg Press', 'Sit on machine, press platform away, targeting quads, hamstrings, and glutes.'),
    ('Lunges', 'Step forward or backward, lowering body, targeting quads, hamstrings, and glutes.'),
    ('Leg Extensions', 'Sit on machine, extend legs, targeting quadriceps.'),
    ('Deadlifts', 'Stand with barbell, hinge at hips, lifting, targeting posterior chain muscles.'),
    ('Hamstring Curls', 'Lie on machine, curl legs towards glutes, targeting hamstrings.'),
    ('Good Mornings', 'Hold barbell on shoulders, hinge at hips, targeting hamstrings and lower back.'),
    ('Stiff-Legged Deadlifts', 'Hold barbell, hinge at hips, keeping legs straight, targeting hamstrings.'),
    ('Glute-Ham Raises', 'Secure feet, lower body, then lift, targeting hamstrings and glutes.'),
    ('Barbell Hip Thrusts', 'Sit with barbell across hips, thrust upwards, targeting glutes and hamstrings.'),
    ('Bulgarian Split Squats', 'Stand with rear foot elevated, lunge down, targeting quads, hamstrings, and glutes.'),
    ('Glute Bridges', 'Lie on back, lift hips, squeezing glutes, targeting glutes and hamstrings.'),
    ('Deadlifts', 'Stand with barbell, hinge at hips, lifting, targeting posterior chain muscles.'),
    ('Lunges', 'Step forward or backward, lowering body, targeting quads, hamstrings, and glutes.'),
    ('Inner Thigh Machine', 'Sit on machine, press legs together, targeting inner thigh muscles.'),
    ('Sumo Squats', 'Stand with wide stance, squat down, targeting inner thighs, quads, and glutes.'),
    ('Side Lunges', 'Step to side, bending knee, targeting inner thighs, quads, and glutes.'),
    ('Seated Leg Press', 'Sit on machine, press platform away, targeting quads, hamstrings, and glutes.'),
    ('Cable Hip Adductions', 'Stand with cable at ankle, move leg across body, targeting inner thigh muscles.'),
    ('Lateral Leg Raises', 'Lie on side, lift top leg, targeting outer thigh muscles.'),
    ('Side-lying Clamshells', 'Lie on side, open and close top knee, targeting hip abductors.'),
    ('Cable Hip Adductions', 'Stand with cable at ankle, move leg across body, targeting inner thigh muscles.'),
    ('Standing Band Abductions', 'Attach band to ankle, lift leg to side, targeting hip abductors.'),
    ('Standing Calf Raises', 'Stand on edge of step, lift heels, targeting calf muscles.'),
    ('Seated Calf Raises', 'Sit on machine, press weight with balls of feet, targeting calf muscles.'),
    ('Calf Press on the Leg Press Machine', 'Sit on leg press machine, press platform with balls of feet, targeting calf muscles.'),
    ('Donkey Calf Raises', 'Bend at hips, lower head towards floor, raise heels, targeting calf muscles.'),
    ('Jump Rope', 'Jump repeatedly over rope, targeting calf muscles and cardiovascular system.'),
    ('Toe Taps', 'Stand on one leg, tap other foot in front and to side, targeting calf muscles.'),
    ('Dorsiflexion Exercises', 'Sit with foot flat on ground, lift toes towards shin, targeting shin muscles.'),
    ('Tibialis Raises', 'Sit with foot flexed, lift toes towards shin, targeting shin muscles.'),
    ('Seated Shin Stretch', 'Sit on floor, flex toes upwards, stretching shin muscles.');

-- Chest Exercises
INSERT INTO exercises (name, description)
VALUES 
    ('Barbell Bench Press', 'Lie on bench, lower bar to chest, press up, targeting chest, shoulders, and triceps.'),
    ('Incline Bench Press', 'Lie on incline bench, lower bar to upper chest, press up, targeting upper chest.'),
    ('Dumbbell Bench Press', 'Lie on bench, lower dumbbells to chest, press up, targeting chest and stabilizing muscles.'),
    ('Decline Bench Press', 'Lie on decline bench, lower bar to lower chest, press up, targeting lower chest.'),
    ('Chest Flyes', 'Lie on bench, arms extended, lower dumbbells to sides, then raise, targeting chest.'),
    ('Chest Dips', 'Using parallel bars, lower body, then press up, targeting chest, shoulders, and triceps.'),
    ('Incline Push-Ups', 'Perform push-ups with hands elevated, targeting upper chest and shoulders.'),
    ('Push-Up Plus', 'Perform push-up, then protract shoulders at top, targeting serratus anterior.'),
    ('Serratus Wall Slides', 'Stand against wall, slide arms up and down, targeting serratus anterior.'),
    ('Serratus Anterior Push-Ups', 'Perform push-up, protracting shoulders at top, targeting serratus anterior.'),
    ('Scapular Protraction Exercises', 'Engage in exercises to protract shoulders, targeting serratus anterior.'),
    ('Kettlebell Pullovers', 'Hold kettlebell overhead, lower behind head, then return, targeting chest and lats.'),
    ('Plank with Shoulder Protraction', 'Hold plank position, protracting shoulders, targeting serratus anterior.'),
    ('Push-Ups', 'Perform push-ups, lowering and raising body, targeting chest, shoulders, and triceps.');

-- Back Exercises
INSERT INTO exercises (name, description)
VALUES 
    ('Pull-Ups', 'Hang from bar, pull body up until chin reaches or clears bar, targeting lats and upper back.'),
    ('Lat Pulldowns', 'Sit at lat pulldown machine, pull bar down to chest, targeting lats and upper back.'),
    ('Barbell Rows', 'Bend at hips, pull barbell to lower chest, targeting upper back and lats.'),
    ('T-Bar Rows', 'Bend at hips, row barbell to chest, targeting upper back and lats.'),
    ('Seated Cable Rows', 'Sit at cable row machine, pull handles to abdomen, targeting middle back.'),
    ('Bent Over Rows', 'Bend at hips, row dumbbells or barbell to abdomen, targeting upper back and lats.'),
    ('Face Pulls', 'Attach rope to cable, pull towards face, targeting rear delts and upper back.'),
    ('Reverse Flyes', 'Bend at hips, raise dumbbells to sides, targeting rear delts and upper back.'),
    ('Prone Y Raises', 'Lie face down, raise arms in Y shape, targeting rear delts and upper back.'),
    ('Deadlifts', 'Stand with barbell, hinge at hips, lifting, targeting posterior chain muscles.'),
    ('Hyperextensions', 'Lie face down on hyperextension bench, raise torso, targeting lower back and glutes.'),
    ('Good Mornings', 'Hold barbell on shoulders, hinge at hips, targeting lower back and hamstrings.'),
    ('Back Extensions', 'Lie face down on hyperextension bench, raise torso, targeting lower back and glutes.'),
    ('External Rotation Exercises', 'Engage in exercises to externally rotate shoulders, targeting rotator cuff muscles.'),
    ('Lateral Raises', 'Hold dumbbells, lift arms to sides, targeting lateral deltoids.'),
    ('Shrugs', 'Hold dumbbells or barbell, shrug shoulders upwards, targeting trapezius muscles.'),
    ('Face Pulls', 'Attach rope to cable, pull towards face, targeting rear delts and upper back.'),
    ('Upright Rows', 'Hold barbell with overhand grip, lift towards chin, targeting traps and deltoids.'),
    ('Barbell Rows', 'Bend at hips, row barbell to abdomen, targeting upper back and lats.'),
    ('Deadlifts', 'Stand with barbell, hinge at hips, lifting, targeting posterior chain muscles.'),
    ('Overhead Press', 'Hold barbell at shoulders, press overhead, targeting deltoids and triceps.'),
    ('Lateral Raises', 'Hold dumbbells, lift arms to sides, targeting lateral deltoids.'),
    ('Front Raises', 'Hold dumbbells, lift arms in front, targeting anterior deltoids.'),
    ('Upright Rows', 'Hold barbell with overhand grip, lift towards chin, targeting traps and deltoids.'),
    ('Face Pulls', 'Attach rope to cable, pull towards face, targeting rear delts and upper back.');

-- Shoulder Exercises
INSERT INTO exercises (name, description)
VALUES 
    ('Overhead Press', 'Hold barbell at shoulders, press overhead, targeting deltoids and triceps.'),
    ('Lateral Raises', 'Hold dumbbells, lift arms to sides, targeting lateral deltoids.'),
    ('Front Raises', 'Hold dumbbells, lift arms in front, targeting anterior deltoids.'),
    ('Upright Rows', 'Hold barbell with overhand grip, lift towards chin, targeting traps and deltoids.'),
    ('Face Pulls', 'Attach rope to cable, pull towards face, targeting rear delts and upper back.'),
    ('Shrugs', 'Hold dumbbells or barbell, shrug shoulders upwards, targeting trapezius muscles.'),
    ('Face Pulls', 'Attach rope to cable, pull towards face, targeting rear delts and upper back.'),
    ('Upright Rows', 'Hold barbell with overhand grip, lift towards chin, targeting traps and deltoids.'),
    ('Barbell Rows', 'Bend at hips, row barbell to abdomen, targeting upper back and lats.'),
    ('Deadlifts', 'Stand with barbell, hinge at hips, lifting, targeting posterior chain muscles.'),
    ('External Rotation Exercises', 'Engage in exercises to externally rotate shoulders, targeting rotator cuff muscles.'),
    ('Face Pulls', 'Attach rope to cable, pull towards face, targeting rear delts and upper back.'),
    ('Reverse Flyes', 'Bend at hips, raise dumbbells to sides, targeting rear delts and upper back.'),
    ('Lateral Raises', 'Hold dumbbells, lift arms to sides, targeting lateral deltoids.'),
    ('Overhead Press', 'Hold barbell at shoulders, press overhead, targeting deltoids and triceps.'),
    ('Face Pulls', 'Attach rope to cable, pull towards face, targeting rear delts and upper back.'),
    ('Lateral Raises', 'Hold dumbbells, lift arms to sides, targeting lateral deltoids.'),
    ('Front Raises', 'Hold dumbbells, lift arms in front, targeting anterior deltoids.'),
    ('Pull-Ups', 'Hang from bar, pull body up until chin reaches or clears bar, targeting lats and upper back.'),
    ('Lat Pulldowns', 'Sit at lat pulldown machine, pull bar down to chest, targeting lats and upper back.'),
    ('Barbell Rows', 'Bend at hips, row barbell to abdomen, targeting upper back and lats.'),
    ('T-Bar Rows', 'Bend at hips, row barbell to chest, targeting upper back and lats.'),
    ('Seated Cable Rows', 'Sit at cable row machine, pull handles to abdomen, targeting middle back.'),
    ('Chest Dips', 'Using parallel bars, lower body, then press up, targeting chest, shoulders, and triceps.'),
    ('Incline Push-Ups', 'Perform push-ups with hands elevated, targeting upper chest and shoulders.'),
    ('Push-Up Plus', 'Perform push-up, then protract shoulders at top, targeting serratus anterior.'),
    ('Serratus Wall Slides', 'Stand against wall, slide arms up and down, targeting serratus anterior.');


-- Add records to muscles_exercises table
-- Arm Exercises
INSERT INTO muscles_exercises (exercise_id, muscle_id)
VALUES 
    (1, 1), (2, 1), (3, 1), (4, 1), (5, 1),
    (6, 2), (7, 2), (8, 2), (9, 2), (10, 2),
    (11, 3), (12, 3), (13, 3), (14, 3), (15, 3),
    (16, 4), (17, 4), (18, 4), (19, 4), (20, 4),
    (21, 5), (22, 5), (23, 5), (24, 5);

-- Leg Exercises
INSERT INTO muscles_exercises (exercise_id, muscle_id)
VALUES 
    (25, 6), (26, 6), (27, 6), (28, 6), (29, 6),
    (30, 7), (31, 7), (32, 7), (33, 7), (34, 7),
    (35, 8), (36, 8), (37, 8), (38, 8), (39, 8),
    (40, 9), (41, 9), (42, 9), (43, 9), (44, 9),
    (45, 10), (46, 10), (47, 10), (48, 10), (49, 10),
    (50, 11), (51, 11), (52, 11), (53, 11), (54, 11),
    (55, 12), (56, 12), (57, 12), (58, 12);

-- Chest Exercises
INSERT INTO muscles_exercises (exercise_id, muscle_id)
VALUES 
    (59, 13), (60, 13), (61, 13), (62, 13), (63, 13),
    (64, 14), (65, 14), (66, 14), (67, 14),
    (68, 15), (69, 15), (70, 15), (71, 15),
    (72, 16), (73, 16), (74, 16);

-- Back Exercises
INSERT INTO muscles_exercises (exercise_id, muscle_id)
VALUES 
    (75, 17), (76, 17), (77, 17), (78, 17), (79, 17),
    (80, 18), (81, 18), (82, 18), (83, 18),
    (84, 19), (85, 19), (86, 19), (87, 19),
    (88, 20), (89, 20), (90, 20),
    (91, 21), (92, 21), (93, 21), (94, 21), (95, 21),
    (96, 26), (97, 26), (98, 26), (99, 26), (100, 26),
    (101, 26), (102, 26), (103, 26), (104, 26), (105, 26),
    (106, 27), (107, 27), (108, 27), (109, 27),
    (110, 28), (111, 28), (112, 28), (113, 28), (114, 28),
    (115, 29), (116, 29), (117, 29), (118, 29);

-- Shoulder Exercises
-- INSERT INTO muscles_exercises (exercise_id, muscle_id)
-- VALUES 
--     (119, 22), (120, 22), (121, 22), (122, 22), (123, 22),
--     (124, 23), (125, 23), (126, 23), (127, 23),
--     (128, 24), (129, 24), (130, 24), (131, 24),
--     (132, 25), (133, 25), (134, 25), (135, 25), (136, 25),
--     (137, 26), (138, 26), (139, 26), (140, 26), (141, 26),
--     (142, 23), (143, 23), (144, 23), (145, 23),
--     (146, 24), (147, 24), (148, 24), (149, 24),
--     (150, 25), (151, 25), (152, 25), (153, 25),
--     (154, 28), (155, 28), (156, 28), (157, 28), (158, 28),
--     (159, 29), (160, 29), (161, 29), (162, 29);


-- Add records to workout programs table
INSERT INTO workout_programs (name, description)
    VALUES  ('James Arm Workout', 'An arm workout which James uses.'),
            ('James Leg Workout', 'A leg workout which James uses.'),
            ('James Chest Workout', 'A chest workout which James uses.');

-- Add records to exercises_workout_program table
INSERT INTO exercises_workout_program (workout_program_id, exercise_id)
    VALUES (1, 1), (1, 2), (1, 3), (1, 4), (1, 5),  
           (2, 25), (2, 26), (2, 28), (2, 29), (2, 30), 
           (3, 60), (3, 61), (3, 62), (3, 63), (3, 64); 

        
-- Add records to users table
INSERT INTO users (first_name, last_name, username, password)
    VALUES  ('James', 'Okeefe', 'James', 'password'),
            ('Patrik', 'Larsson', 'Patrik', 'password'),
            ('Davy', 'O Leary-Fraad', 'Davy', 'password'),
            ('Aran', 'Quintana', 'Aran', 'password');

-- Add records to users_workout_program table
INSERT INTO users_workout_program (user_id, workout_program_id) 
    VALUES (1,1), (1, 2), (1, 3);
