# Release 1

import pymysql
from flask import Flask, jsonify
from flask_cors import cross_origin
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import text
import os

db = SQLAlchemy()
app = Flask(__name__)

# assumes you did not create a password for your database
# and the database username is the default, 'root'
# change if necessary

# SQLALCHEMY_DATABASE_URI must be set to the string:
#                               mysql+pymysql://username:password@127.0.0.1/fitness_app
# where username and password are your mysql username (default: root) and password
# you can create an environment variable called "DATABASE_URL" or else manually set it
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

    # Define the relationship to BodyPart
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

    # Define the relationship to WorkoutProgram
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
def root():
    table_info = {}

    for table_name in db.metadata.tables.keys():
        table = db.metadata.tables[table_name]
        entity_count = db.session.query(table).count()
        table_info[table_name] = entity_count

    return jsonify({
        'tables': table_info,
    })

@app.route('/body_parts')
@cross_origin(origin="*")
def get_body_parts():
    # Fetch all body parts from the database
    body_parts = BodyPart.query.all()

    # Prepare data in the required format
    body_parts_data = [{"id": bp.id, "name": bp.name} for bp in body_parts]

    return jsonify(body_parts_data)

@app.route('/workout_programs')
@cross_origin(origin="*")
def get_workout_programs():
    workout_programs = WorkoutProgram.query.all()
    programs_list = []

    for program in workout_programs:
        exercises_list = []
        body_parts_set = set()  # Using a set to ensure unique body parts across all exercises

        for exercise in program.exercises:
            muscle_groups = []

            # Fetch muscle groups associated with the exercise
            muscles = MusclesToExercises.query.filter_by(exercise_id=exercise.id).all()
            for muscle in muscles:

                # Fetch body parts associated with the exercise
                body_part = BodyPart.query.filter_by(id=muscle.muscle.body_part_id).first()
                if body_part:
                    body_parts_set.add(body_part.name)  # Add body part name to the set

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

        body_parts_list = [{'id': bp.id, 'name': bp.name} for bp in BodyPart.query.filter(BodyPart.name.in_(body_parts_set)).all()]

        programs_list.append({
            'id': program.id,
            'name': program.name,
            'description': program.description,
            'body_parts': body_parts_list,
            'exercises': exercises_list
        })

    return jsonify(programs_list)

@app.route('/workout_programs/<int:program_id>')
@cross_origin(origin="*")
def get_workout_program_by_id(program_id):
    program = WorkoutProgram.query.get(program_id)
    if program:
        exercises_list = []
        body_parts_set = set()

        for exercise in program.exercises:
            muscle_groups = []
            muscles = MusclesToExercises.query.filter_by(exercise_id=exercise.id).all()

            for muscle in muscles:
                body_part = BodyPart.query.filter_by(id=muscle.muscle.body_part_id).first()
                if body_part:
                    body_parts_set.add(body_part.name)

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

        body_parts_list = [{'id': bp.id, 'name': bp.name} for bp in BodyPart.query.filter(BodyPart.name.in_(body_parts_set)).all()]

        program_data = {
            'id': program.id,
            'name': program.name,
            'description': program.description,
            'body_parts': body_parts_list,
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
   
if __name__ == '__main__':
        app.run(debug=True, host="0.0.0.0", port="5000")
