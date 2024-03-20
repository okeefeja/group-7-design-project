import React from "react";
import { ScButtonLabel, ScCancelButton } from "./CancelButton.styled";
import { Text } from "react-native";

export default function CancelButton() {
  return (
    <ScCancelButton>
      <ScButtonLabel>Cancel</ScButtonLabel>
    </ScCancelButton>
  );
}
