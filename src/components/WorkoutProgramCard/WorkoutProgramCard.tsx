import React from "react";
import {
  ScCardContainer,
  ScDescriptionText,
  ScMuscleText,
  ScTitleText,
} from "./WorkoutProgramCard.styled";

interface WorkoutProgramCardProps {
  title: string;
  description: string;
  action: () => void;
  // Add muscle group from backend
}

// We can use the types WorkoutProgram and Exercise later on
export default function WorkoutProgramCard({
  title,
  description,
  action,
}: WorkoutProgramCardProps) {
  return (
    <ScCardContainer onPress={action}>
      {/* Needs muscle group from backend */}
      <ScMuscleText>BACK / BICEPS</ScMuscleText>
      <ScTitleText>{title}</ScTitleText>
      <ScDescriptionText>{description}</ScDescriptionText>
    </ScCardContainer>
  );
}
