import React, { useEffect, useState } from "react";
import {
  ScCardContainer,
  ScDescriptionText,
  ScMuscleText,
  ScTitleText,
} from "./WorkoutProgramCard.styled";
import { ExerciseList } from "../../types/API";

interface WorkoutProgramCardProps {
  title: string;
  description: string;
  exercises: ExerciseList;
  action: () => void;
}

export default function WorkoutProgramCard({
  title,
  description,
  exercises,
  action,
}: WorkoutProgramCardProps) {
  const [muscleGroupString, setMuscleGroupString] = useState("");

  function createMuscleGroupString() {
    const tmp: string[] = [];
    exercises.map((exercise) => {
      exercise.muscle_groups.map((muscleGroup) => {
        tmp.push(muscleGroup.name);
      });
    });
    const uniqueMuscleGroups = [...new Set(tmp)];
    setMuscleGroupString(uniqueMuscleGroups.join(" / ").toUpperCase());
  }

  useEffect(() => {
    createMuscleGroupString();
  }, []);
  return (
    <ScCardContainer onPress={action}>
      <ScMuscleText>{muscleGroupString}</ScMuscleText>
      <ScTitleText>{title}</ScTitleText>
      <ScDescriptionText>{description}</ScDescriptionText>
    </ScCardContainer>
  );
}
