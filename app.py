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
from flask import Flask
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

# each table in the database needs a class to be created for it
# this class is named muscle because the database contains info about muscles
# and the table in the database is named: muscles
# db.Model is required - don't change it
# identify all columns by name and their data type

class BodyPart(db.Model):
    __tablename__ = 'body_parts'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)

class Muscle(db.Model):
    __tablename__ = 'muscles'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    body_part_id = db.Column()


class Exercise(db.Model):
    __tablename__ = 'excercises'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    description = db.Column(db.String)
    muscle_id = db.Column(db.Integer)


class WorkoutProgram(db.Model):
    __tablename__ = 'workout_programs'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    exercise_id = db.Column(db.Integer)
#routes

@app.route('/')
def index():
    try:
        muscles = db.session.execute(db.select(Muscle)
            .order_by(Muscle.name)).scalars()

        muscle_text = '<ul>'
        for muscle in muscles:
            muscle_text += '<li>' + muscle.name + '</li>'
        muscle_text += '</ul>'
        return muscle_text
    except Exception as e:
        # e holds description of the error
        error_text = "<p>The error:<br>" + str(e) + "</p>"
        hed = '<h1>Something is broken.</h1>'
        return hed + error_text
    
if __name__ == '__main__':
    app.run(debug=True)
