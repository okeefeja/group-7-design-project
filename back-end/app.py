# Release 1

import pymysql
from flask import Flask, jsonify, request
from flask_cors import cross_origin
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import text
import os

db = SQLAlchemy()
app = Flask(__name__)

# assumes you did not create a password for your database
# and the database username is the default, 'root'
# change if necessary

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:root@127.0.0.1/fitness_app'
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
    id = db.Column(db.String(100), primary_key=True)
    email = db.Column(db.String(50))
    username = db.Column(db.String(50))
    profile_pic = db.Column(db.String(255))
    
class UserPersonalBests(db.Model):
    __tablename__ = 'user_personal_bests'
    user_id = db.Column(db.String(100), db.ForeignKey('users.id'), primary_key=True)
    bench_press = db.Column(db.String(25))
    squats = db.Column(db.String(25))
    deadlift = db.Column(db.String(25))

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

class FavoriteWorkouts(db.Model):
    __tablename__ = 'favorite_workouts'
    workout_program_id = db.Column(db.Integer, db.ForeignKey('workout_programs.id'), primary_key=True)
    user_id = db.Column(db.String(100), db.ForeignKey('users.id'), primary_key=True)

class UsersToWorkoutPrograms(db.Model):
    __tablename__ = 'users_workout_program'
    workout_program_id = db.Column(db.Integer, db.ForeignKey('workout_programs.id'), primary_key=True)
    user_id = db.Column(db.String(100), db.ForeignKey('users.id'), primary_key=True)

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

@app.route('/exercises')
@cross_origin(origin="*")
def get_exercises():
    exercises = Exercise.query.all()
    exercises_list = []

    for exercise in exercises:
        muscle_groups = []
        body_parts = []

        # Fetch muscle groups associated with the exercise
        muscles = MusclesToExercises.query.filter_by(exercise_id=exercise.id).all()
        for muscle in muscles:
            muscle_group = Muscle.query.filter_by(id=muscle.muscle_id).first()
            if muscle_group:
                muscle_groups.append({
                    'id': muscle_group.id,
                    'name': muscle_group.name
                })
                # Fetch the associated body part for the muscle
                body_part = BodyPart.query.filter_by(id=muscle_group.body_part_id).first()
                if body_part:
                    body_parts.append({
                        'id': body_part.id,
                        'name': body_part.name
                    })

        exercises_list.append({
            'id': exercise.id,
            'name': exercise.name,
            'description': exercise.description,
            'muscle_groups': muscle_groups,
            'body_parts': body_parts
        })

    return jsonify(exercises_list)

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

        # Fetch associated users for the workout program
        users = UsersToWorkoutPrograms.query.filter_by(workout_program_id=program.id).all()
        user_list = []
        for user in users:
            user_data = User.query.get(user.user_id)
            if user_data:
                user_list.append({
                    'id': user_data.id,
                    'username': user_data.username,
                    'email': user_data.email
                })

        programs_list.append({
            'id': program.id,
            'name': program.name,
            'description': program.description,
            'body_parts': body_parts_list,
            'exercises': exercises_list,
            'owner': user_list[0]  
        })

    return jsonify(programs_list)

@app.route('/workout_programs/filtered/<string:filters>')
@cross_origin(origin="*")
def get_filtered_workout_programs(filters):
    filterList = filters.split(",")
    workout_programs = db.session.query(WorkoutProgram).join(
        ExercisesToWorkoutPrograms).join(
        Exercise).join(
        MusclesToExercises).join(
        Muscle).join(BodyPart).filter(BodyPart.id.in_(filterList)).all()
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

        # Fetch associated users for the workout program
        users = UsersToWorkoutPrograms.query.filter_by(workout_program_id=program.id).all()
        user_list = []
        for user in users:
            user_data = User.query.get(user.user_id)
            if user_data:
                user_list.append({
                    'id': user_data.id,
                    'username': user_data.username,
                    'email': user_data.email
                })

        programs_list.append({
            'id': program.id,
            'name': program.name,
            'description': program.description,
            'body_parts': body_parts_list,
            'exercises': exercises_list,
            'owner': user_list[0]
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

@app.route('/users/<string:user_id>/workout_programs')
@cross_origin(origin="*")
def get_workout_programs_by_user(user_id):
    try:
        # Fetch workout programs associated with the user
        user_workout_programs = db.session.query(WorkoutProgram).join(UsersToWorkoutPrograms).filter(UsersToWorkoutPrograms.user_id == user_id).all()
        
        programs_list = []

        for program in user_workout_programs:
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

            # Fetch associated users for the workout program
            users = UsersToWorkoutPrograms.query.filter_by(workout_program_id=program.id).all()
            user_list = []
            for user in users:
                user_data = User.query.get(user.user_id)
                if user_data:
                    user_list.append({
                        'id': user_data.id,
                        'username': user_data.username,
                        'email': user_data.email
                    })

            programs_list.append({
                'id': program.id,
                'name': program.name,
                'description': program.description,
                'body_parts': body_parts_list,
                'exercises': exercises_list,
                'owner': user_list[0]
            })

        return jsonify(programs_list), 200
    
    except Exception as e:
        print(f"Error fetching workout programs for user {user_id}: {e}")
        return jsonify({'message': 'An error occurred while fetching workout programs'}), 500


@app.route('/users')
@cross_origin(origin="*")
def get_users():
    try:
        users = User.query.all()  # Fetch all users
        user_data_list = []

        for user in users:
            # Fetch associated workout programs through the UsersToWorkoutPrograms table
            workout_programs_relationships = UsersToWorkoutPrograms.query.filter_by(user_id=user.id).all()
            workout_programs = [WorkoutProgram.query.get(wp.workout_program_id) for wp in workout_programs_relationships]

            # Fetch user's personal bests data
            personal_bests = UserPersonalBests.query.filter_by(user_id=user.id).first()

            # Fetch favorite workouts for the user
            favorite_workouts_ids = [fw.workout_program_id for fw in FavoriteWorkouts.query.filter_by(user_id=user.id).all()]
            favorite_workouts = [WorkoutProgram.query.get(fw_id) for fw_id in favorite_workouts_ids]
            favorite_workouts_data = [{"id": fw.id, "name": fw.name, "description": fw.description} for fw in favorite_workouts if fw is not None]

            # Prepare user data, including their associated workout programs, personal bests, and favorite workouts
            user_data = {
                "id": user.id,
                "email": user.email,
                "username": user.username,
                "profile_pic": user.profile_pic,
                "workout_programs": [{"id": wp.id, "name": wp.name, "description": wp.description} for wp in workout_programs if wp is not None],
                "personal_bests": {
                    'bench_press': personal_bests.bench_press if personal_bests else None,
                    'squats': personal_bests.squats if personal_bests else None,
                    'deadlift': personal_bests.deadlift if personal_bests else None,
                },
                "favorite_workouts": favorite_workouts_data
            }
            user_data_list.append(user_data)

        return jsonify(user_data_list)
    
    except Exception as e:
        # Handle errors
        error_text = f"<p>The error:<br>{e}</p>"
        hed = '<h1>Something is broken.</h1>'
        return hed + error_text

   
@app.route('/users/<string:user_id>')
@cross_origin(origin="*")
def get_user_by_id(user_id):
    try:
        user = User.query.get(user_id)
        if user:
            # Fetch workout programs associated with the user
            workout_programs = db.session.execute(
                db.select(WorkoutProgram)
                .join(UsersToWorkoutPrograms)
                .filter(UsersToWorkoutPrograms.user_id == user.id)
            ).scalars().all()

            # Fetch user's personal bests data
            personal_bests = UserPersonalBests.query.get(user.id)
            personal_bests_data = {
                'bench_press': personal_bests.bench_press if personal_bests else None,
                'squats': personal_bests.squats if personal_bests else None,
                'deadlift': personal_bests.deadlift if personal_bests else None,
            }

            # Fetch favorite workouts for the user
            favorite_workouts_ids = db.session.query(FavoriteWorkouts.workout_program_id).filter_by(user_id=user_id).all()
            favorite_workouts_ids = [fw_id[0] for fw_id in favorite_workouts_ids]  # Flatten the list of tuples

            # You can fetch the details for these favorite workout programs if needed
            favorite_workouts = WorkoutProgram.query.filter(WorkoutProgram.id.in_(favorite_workouts_ids)).all()
            favorite_workouts_data = [{"id": fw.id, "name": fw.name, "description": fw.description} for fw in favorite_workouts]

            # Prepare user data, including their associated workout programs and favorite workouts
            user_data = {
                "id": user.id,
                "email": user.email,
                "username": user.username,
                "profile_pic": user.profile_pic,
                "workout_programs": [{"id": wp.id, "name": wp.name} for wp in workout_programs],
                "favorite_workouts": favorite_workouts_data,
                "personal_bests": personal_bests_data,
            }
            return jsonify(user_data)
        else:
            return jsonify({'message': 'User not found'}), 404
    except Exception as e:
        print('Error occurred:', e)
        return jsonify({'message': 'An error occurred'}), 500


@app.route('/users/add', methods=['POST'])
@cross_origin(origin="*")
def create_user():
    try:
        data = request.get_json()

        # Extract data from the request
        id = data.get('id')
        email = data.get('email')
        username = data.get('username')
        profile_pic = "https://firebasestorage.googleapis.com/v0/b/fitness-app-fd0eb.appspot.com/o/images%2Fdefault.jpeg?alt=media&token=17a85204-9064-49a1-921a-8c187371ad96"

        # Create User
        new_user = User(id=id, email=email, username=username, profile_pic=profile_pic)
        db.session.add(new_user)
        db.session.commit()

        # Create entry in UserPersonalBests table for the new user with null values except for user_id
        new_user_personal_bests = UserPersonalBests(user_id=id)
        db.session.add(new_user_personal_bests)
        db.session.commit()

        return jsonify({'message': 'User created successfully!'})
    
    except Exception as e:
        # Handle errors
        print('Error occurred:', e)

@app.route('/users/update_personal_bests/<string:user_id>', methods=['PUT'])
@cross_origin(origin="*")
def update_personal_bests(user_id):
    try:
        data = request.get_json()

        # Extract data from the request
        bench_press = data.get('bench_press')
        squats = data.get('squats')
        deadlift = data.get('deadlift')

        # Retrieve the existing personal bests record for the user
        user_personal_bests = UserPersonalBests.query.get(user_id)

        # Update the personal bests record if it exists
        if user_personal_bests:
            user_personal_bests.bench_press = bench_press
            user_personal_bests.squats = squats
            user_personal_bests.deadlift = deadlift

            # Commit the changes to the database
            db.session.commit()

            return jsonify({'message': 'Personal bests updated successfully!'})
        else:
            return jsonify({'message': 'User not found'}), 404  # Return 404 Not Found if user is not found

    except Exception as e:
        # Handle errors
        print('Error occurred:', e)
        return jsonify({'message': 'An error occurred while updating personal bests'}), 500

@app.route('/users/update_username/<string:user_id>', methods=['PUT'])
@cross_origin(origin="*")
def update_username(user_id):
    try:
        # Get the new username from the request body
        data = request.get_json()
        new_username = data.get('username')

        # Fetch the user by user_id
        user = User.query.get(user_id)
        if user:
            # Update the user's username
            user.username = new_username
            db.session.commit()
            return jsonify({'message': 'Username updated successfully'})
        else:
            return jsonify({'message': 'User not found'}), 404
    except Exception as e:
        return jsonify({'message': 'An error occurred while updating username'}), 500

@app.route('/workout_programs/add', methods=['POST'])
@cross_origin(origin="*")
def create_workout_program():
    try:
        data = request.get_json()

        # Extract data from the request
        name = data.get('name')
        description = data.get('description')
        exercises = data.get('exercises')
        owner = data.get('owner')

        # Create the workout program
        new_workout_program = WorkoutProgram(name=name, description=description)
        db.session.add(new_workout_program)
        db.session.commit()

        # Create associations between exercises and the new workout program
        for exercise_id in exercises:
            exercise = Exercise.query.get(exercise_id)
            if exercise:
                # Create an instance of the association model and add it to the session
                ex_wp_association = ExercisesToWorkoutPrograms(workout_program_id=new_workout_program.id, exercise_id=exercise_id)
                db.session.add(ex_wp_association)


        # Create associations between workoutPrograms and users
        user_wp_association = UsersToWorkoutPrograms(workout_program_id=new_workout_program.id, user_id=owner)
        db.session.add(user_wp_association)
        db.session.commit()

        return jsonify({'message': 'Workout program created successfully!'})

    except Exception as e:
        # Handle errors
        error_text = "<p>The error:<br>" + str(e) + "</p>"
        hed = '<h1>Something is broken.</h1>'
        return hed + error_text

@app.route('/users/<string:user_id>/favorite_workouts', methods=['POST'])
@cross_origin(origin="*")
def add_favorite_workout(user_id):
    data = request.get_json()
    workout_program_id = data.get('workoutProgramId')

    # Check if the workout is already favorited
    existing_favorite = FavoriteWorkouts.query.filter_by(
        user_id=user_id,
        workout_program_id=workout_program_id
    ).first()

    # Add or remove the favorite based on the is_favorite value
    if not existing_favorite:
        # Add to favorites if it's not already there
        new_favorite = FavoriteWorkouts(
            user_id=user_id,
            workout_program_id=workout_program_id
        )
        db.session.add(new_favorite)
    else:
        # Remove from favorites if it is there
        db.session.delete(existing_favorite)

    db.session.commit()
    return jsonify({'message': 'Favorite updated successfully!'}), 200

@app.route('/users/<string:user_id>/favorite_workouts', methods=['GET'])
@cross_origin(origin="*")
def get_favorite_workouts(user_id):
    try:
        favorite_workouts = FavoriteWorkouts.query.filter_by(user_id=user_id).all()
        
        favorite_programs_list = []
        for favorite in favorite_workouts:
            program = WorkoutProgram.query.get(favorite.workout_program_id)
            if program:
                exercises_list = []
                body_parts_set = set()

                for exercise in program.exercises:
                    muscle_groups = []

                    # Fetch muscle groups associated with the exercise
                    muscles = MusclesToExercises.query.filter_by(exercise_id=exercise.id).all()
                    for muscle in muscles:
                        muscle_detail = Muscle.query.get(muscle.muscle_id)
                        if muscle_detail:
                            muscle_groups.append({
                                'id': muscle_detail.id,
                                'name': muscle_detail.name
                            })
                            body_part = BodyPart.query.get(muscle_detail.body_part_id)
                            if body_part:
                                body_parts_set.add(body_part.name)

                    exercises_list.append({
                        'id': exercise.id,
                        'name': exercise.name,
                        'description': exercise.description,
                        'muscle_groups': muscle_groups
                    })

                body_parts_list = [{'id': bp.id, 'name': bp.name} for bp in BodyPart.query.filter(BodyPart.name.in_(body_parts_set)).all()]
                
                # Fetch the owner of the workout program
                # Assuming that UsersToWorkoutPrograms table links users and workout programs as owners
                owner_info = None
                if users := UsersToWorkoutPrograms.query.filter_by(workout_program_id=program.id).first():
                    owner = User.query.get(users.user_id)
                    owner_info = {
                        'id': owner.id,
                        'username': owner.username,
                        'email': owner.email
                    }

                favorite_programs_list.append({
                    'id': program.id,
                    'name': program.name,
                    'description': program.description,
                    'body_parts': body_parts_list,
                    'exercises': exercises_list,
                    'owner': owner_info  # Add owner information here
                })

        return jsonify(favorite_programs_list), 200
    except Exception as e:
        print(f"Error fetching favorite workouts for user {user_id}: {e}")
        return jsonify({'message': 'An error occurred while fetching favorite workouts'}), 500



@app.route('/users/<string:user_id>/favorite_workouts', methods=['DELETE'])
@cross_origin(origin="*")
def remove_favorite_workout(user_id):
    data = request.get_json()
    workout_program_id = data.get('workoutProgramId')
    
    # Find the favorite to be removed
    favorite_to_remove = FavoriteWorkouts.query.filter_by(
        user_id=user_id,
        workout_program_id=workout_program_id
    ).first()

    if favorite_to_remove:
        db.session.delete(favorite_to_remove)
        db.session.commit()
        return jsonify({'message': 'Favorite removed successfully!'}), 200
    else:
        return jsonify({'message': 'Favorite not found'}), 404

@app.route('/users/<string:user_id>/update_profile_pic', methods=['PUT'])
@cross_origin(origin="*")
def update_profile_pic(user_id):
    try:
        data = request.get_json()

        # Extract the new profile picture URL from the request
        new_profile_pic = data.get('profile_pic')

        # Fetch the user by user_id
        user = User.query.get(user_id)
        if user:
            # Update the user's profile picture
            user.profile_pic = new_profile_pic
            db.session.commit()
            return jsonify({'message': 'Profile picture updated successfully'})
        else:
            return jsonify({'message': 'User not found'}), 404
    except Exception as e:
        return jsonify({'message': 'An error occurred while updating profile picture'}), 500

# takes an array of workout ids to be removed, EX: [1,2]
def remove_workout_programs(idArray):
    try:
        with app.app_context():
            # Delete entries from the users_workout_program table
            db.session.query(UsersToWorkoutPrograms).filter(UsersToWorkoutPrograms.workout_program_id.in_(idArray)).delete(synchronize_session=False)

            # Delete entries from the exercisesToWorkoutPrograms table
            db.session.query(ExercisesToWorkoutPrograms).filter(ExercisesToWorkoutPrograms.workout_program_id.in_(idArray)).delete(synchronize_session=False)

            # Delete entries from the workoutPrograms table
            db.session.query(WorkoutProgram).filter(WorkoutProgram.id.in_(idArray)).delete(synchronize_session=False)

            # Commit the changes
            db.session.commit()

            print('Workout programs and associated relations removed successfully!')

    except Exception as e:
        # Handle errors
        print('Error occurred:', e)

# takes an array of user ids and removes them
def remove_users(idArray):
    try:
        with app.app_context():
            # Delete entries from the UserPersonalBests table for the provided userId
            db.session.query(UserPersonalBests).filter(UserPersonalBests.user_id.in_(idArray)).delete(synchronize_session=False)

            # Delete entries from the users table
            db.session.query(User).filter(User.id.in_(idArray)).delete(synchronize_session=False)

            # Delete entries from the users_workout_program table
            db.session.query(UsersToWorkoutPrograms).filter(UsersToWorkoutPrograms.user_id.in_(idArray)).delete(synchronize_session=False)

            # Commit the changes
            db.session.commit()

            print('Users and associated personal bests removed successfully!')

    except Exception as e:
        # Handle errors
        print('Error occurred:', e)
    

if __name__ == '__main__':
        print
        app.run(debug=True, host="0.0.0.0", port="5000")
