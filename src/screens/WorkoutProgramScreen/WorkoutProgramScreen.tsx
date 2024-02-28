import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import CardList from "../../components/CardList/CardList";
import Card from "../../components/WorkoutProgramCard/WorkoutProgramCard";
import { WorkoutProgram } from "../../types/API";
import { fetchWorkoutProgramById } from "../../services/API";
import { ScBaseContainer } from "../../components/BaseContainer/BaseContainer.styled";
import WorkoutProgressBar from "../../components/WorkoutProgressBar/WorkoutProgressBar";
import WorkoutDescriptor from "../../components/WorkoutDescriptor/Descriptor";
import Spacer from "../../components/Spacer/Spacer";

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
