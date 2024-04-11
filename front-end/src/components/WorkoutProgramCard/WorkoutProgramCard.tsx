import React, { useEffect, useState } from "react";
import {
  ScCardContainer,
  ScDescriptionText,
  ScMuscleText,
  ScOwnerText,
  ScTitleText,
} from "./WorkoutProgramCard.styled";
import { BodyPartList, ExerciseList } from "../../types/API";
import { View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Spacer from "../Spacer/Spacer";

interface WorkoutProgramCardProps {
  title: string;
  owner: string;
  description: string;
  bodyParts: BodyPartList;
  size?: "small" | "large";
  action: () => void;
}

export default function WorkoutProgramCard({
  title,
  owner,
  description,
  bodyParts,
  size = "large",
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
    <ScCardContainer onPress={action} size={size}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <ScMuscleText size={size}>{bodyPartString}</ScMuscleText>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Icon name="person" color="gray" size={16} />
          <Spacer orientation="horizontal" size={1} />
          <ScOwnerText size={size}>{owner}</ScOwnerText>
        </View>
      </View>
      <ScTitleText size={size}>{title}</ScTitleText>
      <ScDescriptionText size={size}>{description}</ScDescriptionText>
    </ScCardContainer>
  );
}
