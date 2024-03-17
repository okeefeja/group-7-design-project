import React from "react";
import { ScBaseContainer } from "../../components/BaseContainer/BaseContainer.styled";
import { Text } from "react-native";
import Descriptor from "../../components/Descriptor/Descriptor";
import UserInput from "../../components/UserInput/UserInput";
import Spacer from "../../components/Spacer/Spacer";

export default function AddWorkoutProgramScreen() {
  return (
    <ScBaseContainer>
      <Descriptor title="Add workout program" />
      <Spacer orientation="vertical" size={4} />
      <UserInput title="Name" placeholder="Name" />
      <Spacer orientation="vertical" size={4} />
      <UserInput
        title="Description"
        placeholder="Description"
        textArea={true}
      />
      <Spacer orientation="vertical" size={4} />
      <Text style={{ color: "white", fontSize: 18, fontWeight: "600" }}>
        Add exercises
      </Text>
      <Text style={{ color: "gray", fontSize: 14, fontWeight: "400" }}>
        Click on exercises to select!
      </Text>
      <Spacer orientation="vertical" size={4} />
    </ScBaseContainer>
  );
}
