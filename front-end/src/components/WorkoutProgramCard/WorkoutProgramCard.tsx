import React, { useEffect, useState } from "react";
import {
  ScCardContainer,
  ScDescriptionText,
  ScMuscleText,
  ScTitleText,
} from "./WorkoutProgramCard.styled";
import { BodyPartList, ExerciseList } from "../../types/API";

interface WorkoutProgramCardProps {
  title: string;
  description: string;
  bodyParts: BodyPartList;
  action: () => void;
}

export default function WorkoutProgramCard({
  title,
  description,
  bodyParts,
  action,
}: WorkoutProgramCardProps) {
  const [bodyPartString, setBodyPartString] = useState("");

  function createBodyPartString() {
    const tmp: string[] = [];
    bodyParts.map((bodyPart) => {
      tmp.push(bodyPart.name);
    });
    const uniqueBodyParts = [...new Set(tmp)];
    setBodyPartString(uniqueBodyParts.join(" / ").toUpperCase());
  }

  useEffect(() => {
    createBodyPartString();
  }, []);
  return (
    <ScCardContainer onPress={action}>
      <ScMuscleText>{bodyPartString}</ScMuscleText>
      <ScTitleText>{title}</ScTitleText>
      <ScDescriptionText>{description}</ScDescriptionText>
    </ScCardContainer>
  );
}
