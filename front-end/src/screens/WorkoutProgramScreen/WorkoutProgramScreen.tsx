import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import CardList from "../../components/CardList/CardList";
import Card from "../../components/WorkoutProgramCard/WorkoutProgramCard";
import { WorkoutProgram } from "../../types/API";
import { baseURL, fetchWorkoutProgramById, fetchFavoriteWorkoutPrograms } from "../../services/API";
import { ScBaseContainer } from "../../components/BaseContainer/BaseContainer.styled";
import WorkoutProgressBar from "../../components/WorkoutProgressBar/WorkoutProgressBar";
import WorkoutDescriptor from "../../components/Descriptor/Descriptor";
import Spacer from "../../components/Spacer/Spacer";
import { getAuth } from "firebase/auth";

interface WorkoutProgramScreenProps {
  route: any;
}

export default function WorkoutProgramScreen({
  route,
}: WorkoutProgramScreenProps) {
  const workoutProgramId = route.params.workoutId;
  const [workoutProgram, setWorkoutProgram] = useState<WorkoutProgram | null>(
    null
  );
  const [completedExercises, setCompletedExercises] = useState(0);
  const [error, setError] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const auth = getAuth();
  const userId = auth.currentUser?.uid;

  const toggleLike = async () => {
    // First, toggle the like state locally
    setIsLiked(!isLiked);

    // Then, make an API call to update the backend
    if (userId) {
      try {
        // Here you would make an API call to update the user's favorite workouts
        // This is just a placeholder for whatever your API call would actually be
        const response = await updateFavoriteWorkouts(userId, workoutProgramId, !isLiked);
        // You'll need to define `updateFavoriteWorkoutsAPI` to communicate with your backend

        // If necessary, handle any response here, e.g. updating local state with new favorites

      } catch (error) {
        // Handle any errors from the API call
        console.error('Failed to update favorite workouts', error);
        // Optionally, revert the like state if the API call fails
        setIsLiked(isLiked);
      }
    }
  };

  async function updateFavoriteWorkouts(userId: string, workoutProgramId: number, isLiked: boolean): Promise<boolean> {
    try {
      if(isLiked){
        console.log("Adding to the database")
        const response = await fetch(`${baseURL}/users/${userId}/favorite_workouts`, {
          method: "POST", 
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            workoutProgramId,
          }),
        });
        return response.ok;
      }
      else{
        console.log("Removing from the database")
        const response = await fetch(`${baseURL}/users/${userId}/favorite_workouts`, {
          method: "DELETE", 
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            workoutProgramId,
          }),
        });
        return response.ok;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async function checkIfWorkoutIsFavorited() {
    if (userId) {
      const favoriteWorkouts = await fetchFavoriteWorkoutPrograms(userId);
      if(favoriteWorkouts) {
        const ids = favoriteWorkouts.map(a => a.id);
        if(ids.includes(workoutProgramId)){
          setIsLiked(true)
        }
        else{
          setIsLiked(false)
        }
      }
    }
  }
  
  useEffect(() => {
    checkIfWorkoutIsFavorited();
  }, [userId, workoutProgramId]);

  function addCompletedExercise(int: number) {
    setCompletedExercises(completedExercises + int);
  }

  async function getWorkoutProgram(): Promise<void> {
    const fetchedWorkoutProgram: WorkoutProgram | null =
      await fetchWorkoutProgramById(workoutProgramId);

    if (fetchedWorkoutProgram) {
      setWorkoutProgram(fetchedWorkoutProgram);
    } else {
      setError(true);
    }
  }

  useEffect(() => {
    getWorkoutProgram();
  }, [completedExercises]);
  return (
    workoutProgram && (
      <ScBaseContainer>
        <WorkoutDescriptor
          title={workoutProgram.name}
          description={workoutProgram.description}
          isLiked={isLiked}
          toggleLike={toggleLike}
          showHeartIcon={true}
        />
        <Spacer size={5} orientation="vertical" />
        <WorkoutProgressBar
          completedValue={completedExercises}
          maxValue={workoutProgram.exercises.length}
        />
        <CardList
          data={workoutProgram.exercises}
          action={addCompletedExercise}
        />
      </ScBaseContainer>
    )
  );
}
