import React from "react";
import { ScBaseContainer } from "../../components/BaseContainer/BaseContainer.styled";
import Descriptor from "../../components/Descriptor/Descriptor";
import { Text } from "react-native";
import UserInput from "../../components/UserInput/UserInput";

export default function AddWorkoutProgramScreen() {
  return (
    <ScBaseContainer>
      <Descriptor title="Add workout program" />
      <UserInput placeholder="Name" />
    </ScBaseContainer>
  );
}
