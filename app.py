import pymysql
from flask import Flask, jsonify
from flask_cors import cross_origin
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import text
import os

#you need to set environment variable DATABASE_URL
#with format mysql+pymysql://root:password@127.0.0.1/fitness_app
# if not os.getenv("DATABASE_URL"):
#     raise RuntimeError("DATABASE_URL is not set")

# this variable, db, will be used for all SQLAlchemy commands
db = SQLAlchemy()
# create the app
app = Flask(__name__)

# assumes you did not create a password for your database
# and the database username is the default, 'root'
# change if necessary

# CHANGE NOTHING BELOW
# put them all together as a string that shows SQLAlchemy where the database is
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DATABASE_URL")

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True

# initialize the app with Flask-SQLAlchemy
db.init_app(app)

class BodyPart(db.Model):
    __tablename__ = 'body_parts'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)

class Muscle(db.Model):
    __tablename__ = 'muscles'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    body_part_id = db.Column(db.Integer, db.ForeignKey('body_parts.id'))
    body_part = db.relationship("BodyPart", backref=db.backref("body_parts", uselist=False))

class WorkoutProgram(db.Model):
    __tablename__ = 'workout_programs'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    description = db.Column(db.String)
    # Define the relationship to Exercise
    exercises = db.relationship('Exercise', secondary='exercises_workout_program', back_populates='workout_programs')

class Exercise(db.Model):
    __tablename__ = 'exercises'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    description = db.Column(db.String)
    # Define the relationship back to WorkoutProgram
    workout_programs = db.relationship('WorkoutProgram', secondary='exercises_workout_program', back_populates='exercises')

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50))
    last_name = db.Column(db.String(50))
    username = db.Column(db.String(50))
    password = db.Column(db.String(50))

class ExercisesToWorkoutPrograms(db.Model):
    __tablename__ = 'exercises_workout_program'
    workout_program_id = db.Column(db.Integer, db.ForeignKey('workout_programs.id'), primary_key=True)
    exercise_id = db.Column(db.Integer, db.ForeignKey('exercises.id'), primary_key=True)

class MusclesToExercises(db.Model):
    __tablename__ = 'muscles_exercises'
    muscle_id = db.Column(db.Integer, db.ForeignKey('muscles.id'), primary_key=True)
    muscle = db.relationship("Muscle", backref=db.backref("muscles", uselist=False))
    exercise_id = db.Column(db.Integer, db.ForeignKey('exercises.id'), primary_key=True)
    exercise = db.relationship("Exercise", backref=db.backref("exercises", uselist=False))

class UsersToWorkoutPrograms(db.Model):
    __tablename__ = 'users_workout_program'
    workout_program_id = db.Column(db.Integer, db.ForeignKey('workout_programs.id'), primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)

exercises_workout_program = db.Table('exercises_workout_program',
    db.Column('workout_program_id', db.Integer, db.ForeignKey('workout_programs.id'), primary_key=True),
    db.Column('exercise_id', db.Integer, db.ForeignKey('exercises.id'), primary_key=True),
    extend_existing=True
)


@app.route('/')
def index():
    try:
        muscles = db.session.execute(db.select(Muscle)
            .order_by(Muscle.name)).scalars()

        muscle_text = '<ul>'
        for muscle in muscles:
            muscle_text += '<li>' + muscle.name + '  :  ' + muscle.body_part.name + '<li>'
        muscle_text += '</ul>'
        return muscle_text
    except Exception as e:
        # e holds description of the error
        error_text = "<p>The error:<br>" + str(e) + "</p>"
        hed = '<h1>Something is broken.</h1>'
        return hed + error_text
    
@app.route('/bodyTest')
@cross_origin(origin="*")
def get_body_part():

    try:
        bodyParts = db.session.execute(db.select(BodyPart)
            .order_by(BodyPart.name)).scalars()

        bodypart_text = []
        for part in bodyParts:
            bodypart_text.append({"name": part.name})
        return jsonify(bodypart_text)
    except Exception as e:
        # e holds description of the error
        error_text = "<p>The error:<br>" + str(e) + "</p>"
        hed = '<h1>Something is broken.</h1>'
        return hed + error_text

@app.route('/muscleTest')
@cross_origin(origin="*")
def get_muscle():

    try:
        muscles = db.session.execute(db.select(Muscle)
            .order_by(Muscle.name)).scalars()

        muscle_text = []
        for muscle in muscles:
            muscle_text.append({"name": muscle.name, "Body part (int?)": + muscle.body_part_id})
        return jsonify(muscle_text)
    except Exception as e:
        # e holds description of the error
        error_text = "<p>The error:<br>" + str(e) + "</p>"
        hed = '<h1>Something is broken.</h1>'
        return hed + error_text

@app.route('/exerciseTest')
@cross_origin(origin="*")
def get_exercise():

    try:
        exercises = db.session.execute(db.select(Exercise)
            .order_by(Exercise.name)).scalars()

        exercise_text = []
        for exercise in exercises:
            exercise_text.append({"name": exercise.name, "description": + exercise.description})
        return jsonify(exercise_text)
    except Exception as e:
        # e holds description of the error
        error_text = "<p>The error:<br>" + str(e) + "</p>"
        hed = '<h1>Something is broken.</h1>'
        return hed + error_text

@app.route('/workout_programs')
@cross_origin(origin="*")
def get_workout_programs():
    workout_programs = WorkoutProgram.query.all()
    programs_list = []

    for program in workout_programs:
        print(program);
        exercises_list = []
        for exercise in program.exercises:
            muscle_groups = []
            muscles = MusclesToExercises.query.filter_by(exercise_id=exercise.id).all()
            for muscle in muscles:
                muscle_groups.append({
                    'id': muscle.muscle.id,
                    'name': muscle.muscle.name
                })
           
            exercises_list.append({
                'id': exercise.id,
                'name': exercise.name,
                'description': exercise.description,
                'muscle_groups': muscle_groups
             
            })

        programs_list.append({
            'id': program.id,
            'name': program.name,
            'description': program.description,
            'exercises': exercises_list
        })

    return jsonify(programs_list)

@app.route('/workout_programs/<int:program_id>')
@cross_origin(origin="*")
def get_workout_program(program_id):
    program = WorkoutProgram.query.get(program_id)
    if program:
        exercises_list = []
        for exercise in program.exercises:
            muscle_groups = []
            muscles = MusclesToExercises.query.filter_by(exercise_id=exercise.id).all()
            for muscle in muscles:
                muscle_groups.append({
                    'id': muscle.muscle.id,
                    'name': muscle.muscle.name
                })
            exercises_list.append({
                "id": exercise.id,
                'name': exercise.name,
                'description': exercise.description,
                'muscle_groups': muscle_groups
            })
        program_data = {
            'id': program.id,
            'name': program.name,
            'description': program.description,
            'exercises': exercises_list
        }
        return jsonify(program_data)

@app.route('/users')
@cross_origin(origin="*")
def get_users():
    try:
        # Fetch users ordered by their first name
        users = db.session.execute(db.select(User).order_by(User.first_name)).scalars()

        user_text = []
        for user in users:
            # For each user, fetch associated workout programs through the UsersToWorkoutPrograms table
            workout_programs = db.session.execute(db.select(WorkoutProgram).join(UsersToWorkoutPrograms).filter(UsersToWorkoutPrograms.user_id == user.id)).scalars()

            # Prepare user data, including their associated workout programs
            user_data = {
                "name": f"{user.first_name} {user.last_name}",
                "username": user.username,
                "workout_programs": [{"name": wp.name} for wp in workout_programs]
            }
            user_text.append(user_data)

        return jsonify(user_text)
    
    except Exception as e:
        # Handle errors
        error_text = "<p>The error:<br>" + str(e) + "</p>"
        hed = '<h1>Something is broken.</h1>'
        return hed + error_text
    
@app.route('/dev')
@cross_origin(origin="*")
def get_dummy():
    return jsonify([{"name": "Barbell Bench Press", "description": "Lie on bench, lower bar to chest, press up, targeting chest, shoulders, and triceps."},
                   {"name": 'Incline Bench Press', "description": "Lie on incline bench, lower bar to upper chest, press up, targeting upper chest."},
                   {"name": "Dumbbell Bench Press", "description": "Lie on bench, lower dumbbells to chest, press up, targeting chest and stabilizing muscles."},
                   {"name": "Decline Bench Press", "description": "Lie on decline bench, lower bar to lower chest, press up, targeting lower chest."},
                   {"name": "Chest Flyes", "description": "Lie on bench, arms extended, lower dumbbells to sides, then raise, targeting chest."},
                   {"name": "Chest Dips", "description": "Using parallel bars, lower body, then press up, targeting chest, shoulders, and triceps."}])
    
if __name__ == '__main__':
        app.run(debug=True, host="0.0.0.0", port="5000")
