import React, { useEffect, useState } from "react";
import {
  ScCardContainer,
  ScDescriptionText,
  ScMuscleText,
  ScTitleText,
} from "./ExerciseCard.styled";

interface ExerciseCardProps {
  title: string;
  description: string;
  muscleGroups: { id: number; name: string }[];
  action: (int: number) => void;
}

// We can use the types WorkoutProgram and Exercise later on
export default function ExerciseCard({
  title,
  description,
  muscleGroups,
  action,
}: ExerciseCardProps) {
  const [clicked, setClicked] = useState(false);
  const [muscleGroupString, setMuscleGroupString] = useState("");

  function handleCount() {
    if (!clicked) {
      action(1);
    } else {
      action(-1);
    }
  }

  function handleClick() {
    setClicked(!clicked);
    handleCount();
  }

  function createMuscleGroupString() {
    if (muscleGroups) {
      const tmp = muscleGroups
        .map((muscleGroup) => muscleGroup.name)
        .join(" / ");
      setMuscleGroupString(tmp.toUpperCase());
    }
  }

  useEffect(() => {
    createMuscleGroupString();
  }, []);

  return (
    <ScCardContainer onPress={handleClick} clicked={clicked}>
      <ScMuscleText clicked={clicked}>{muscleGroupString}</ScMuscleText>
      <ScTitleText clicked={clicked}>{title}</ScTitleText>
      <ScDescriptionText clicked={clicked}>{description}</ScDescriptionText>
    </ScCardContainer>
  );
}
