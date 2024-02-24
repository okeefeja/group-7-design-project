import React from "react";
import { ScBarContainer, ScBarItem } from "./WorkoutProgressBar.styled";

export default function WorkoutProgressBar() {
  return (
    <ScBarContainer>
      <ScBarItem size={2} color="red" />
      <ScBarItem size={3} color="blue" />
    </ScBarContainer>
  );
}
