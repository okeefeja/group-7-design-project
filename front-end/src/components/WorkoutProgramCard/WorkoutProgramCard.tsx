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
  action: () => void;
}

export default function WorkoutProgramCard({
  title,
  owner,
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
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <ScMuscleText>{bodyPartString}</ScMuscleText>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Icon name="person" color="gray" size={16} />
          <Spacer orientation="horizontal" size={1} />
          <ScOwnerText>{owner}</ScOwnerText>
        </View>
      </View>
      <ScTitleText>{title}</ScTitleText>
      <ScDescriptionText>{description}</ScDescriptionText>
    </ScCardContainer>
  );
}
