import React from "react";
import {
  ScCardContainer,
  ScDescriptionText,
  ScMuscleText,
  ScTitleText,
} from "./Card.styled";

interface CardProps {
  title: string;
  description: string;
  action: () => void;
  // Add muscle group from backend
}

// We can use the types WorkoutProgram and Exercise later on
export default function Card({ title, description, action }: CardProps) {
  return (
    <ScCardContainer onPress={action}>
      {/* Needs muscle group from backend */}
      <ScMuscleText>BACK / BICEPS</ScMuscleText>
      <ScTitleText>{title}</ScTitleText>
      <ScDescriptionText>{description}</ScDescriptionText>
    </ScCardContainer>
  );
}
