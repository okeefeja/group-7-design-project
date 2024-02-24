import React, { useState } from "react";
import {
  ScCardContainer,
  ScDescriptionText,
  ScMuscleText,
  ScTitleText,
} from "./ExerciseCard.styled";

interface ExerciseCardProps {
  title: string;
  description: string;
  // Add muscle group from backend
}

// We can use the types WorkoutProgram and Exercise later on
export default function ExerciseCard({
  title,
  description,
}: ExerciseCardProps) {
  const [clicked, setClicked] = useState(false);

  function handleClick() {
    setClicked(!clicked);
  }

  return (
    <ScCardContainer onPress={handleClick} clicked={clicked}>
      {/* Needs muscle group from backend */}
      <ScMuscleText clicked={clicked}>BACK / BICEPS</ScMuscleText>
      <ScTitleText clicked={clicked}>{title}</ScTitleText>
      <ScDescriptionText clicked={clicked}>{description}</ScDescriptionText>
    </ScCardContainer>
  );
}
