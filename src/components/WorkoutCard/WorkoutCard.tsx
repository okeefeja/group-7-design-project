import React from "react";
import {
  ScCardContainer,
  ScDescriptionText,
  ScMuscleText,
  ScTitleText,
} from "./WorkoutCard.styled";

interface WorkoutCardProps {
  title: string;
  description: string;
}

export default function WorkoutCard({ title, description }: WorkoutCardProps) {
  return (
    <ScCardContainer>
      {/* Needs muscle group from backend */}
      <ScMuscleText>BACK / BICEPS</ScMuscleText>
      <ScTitleText>{title}</ScTitleText>
      <ScDescriptionText>{description}</ScDescriptionText>
    </ScCardContainer>
  );
}
