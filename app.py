"""
test for a local -MySQL- database connection with XAMPP
requires PyMySQL, Flask-SQLAlchemy, Flask
.
make sure your virtualenv is activated!
make sure you have "started all" in XAMPP!
code below works for a MySQL database in XAMPP
- NOT XAMPP VM - on Mac OS
"""

import pymysql
from flask import Flask, jsonify
from flask_cors import cross_origin
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import text
import os

#you need to set environment variable DATABASE_URL
#with format mysql+pymysql://root:password@127.0.0.1/fitness_app
if not os.getenv("DATABASE_URL"):
    raise RuntimeError("DATABASE_URL is not set")


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


class Exercise(db.Model):
    __tablename__ = 'exercises'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    description = db.Column(db.String)


class WorkoutProgram(db.Model):
    __tablename__ = 'workout_programs'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    description = db.Column(db.String)

class ExercisesToWorkoutPrograms(db.Model):
    __tablename__ = 'exercises-workout_programs'
    program_id = db.Column(db.Integer, db.ForeignKey('workout_programs.id'), primary_key=True)
    program = db.relationship("WorkoutProgram", backref=db.backref("workout_programs", uselist=False))
    exercise_id = db.Column(db.Integer, db.ForeignKey('exercises.id'), primary_key=True)
    exercise = db.relationship("Exercise", backref=db.backref("exercises", uselist=False))



class MusclesToExercises(db.Model):
    __tablename__ = 'muscles-exercises'
    muscle_id = db.Column(db.Integer, db.ForeignKey('muscles.id'), primary_key=True)
    muscle = db.relationship("Muscle", backref=db.backref("muscles", uselist=False))
    #exercise_id = db.Column(db.Integer, db.ForeignKey('exercises.id'), primary_key=True)
    #exercise = db.relationship("Exercise", backref=db.backref("exercises", uselist=False))


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
        app.run(debug=True)
