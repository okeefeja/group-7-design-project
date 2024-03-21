import React from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import Spacer from "../Spacer/Spacer";
import { ScCardContainer } from "./SelectExerciseCard.styled";
import { Exercises } from "../../types/API";

interface SelectExerciseCardProps {
  exercise: Exercises;
  isSelected: boolean;
  handleClick: (id: number) => void;
}

export default function SelectExerciseCard({
  exercise,
  isSelected,
  handleClick,
}: SelectExerciseCardProps) {
  return (
    <ScCardContainer
      onPress={() => handleClick(exercise.id)}
      selected={isSelected}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ color: "#ff8610", fontWeight: "700", fontSize: 12 }}>
          {exercise.muscle_groups[0]?.name.toUpperCase()}
        </Text>
        <Icon
          name="check"
          color={isSelected ? "#ff8610" : "#303030"}
          size={12}
        />
      </View>
      <Spacer orientation="vertical" size={1} />
      <Text style={{ color: "white", fontWeight: "600" }}>{exercise.name}</Text>
    </ScCardContainer>
  );
}
