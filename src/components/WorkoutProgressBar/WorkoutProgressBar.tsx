import React, { useEffect } from "react";
import { Text } from "react-native";
import {
  ScBarContainer,
  ScBarItem,
  ScContainer,
  ScPercentageLabel,
} from "./WorkoutProgressBar.styled";
import { LayoutAnimation } from "react-native";

interface WorkoutProgressBarProps {
  maxValue: number;
  completedValue: number;
}

export default function WorkoutProgressBar({
  maxValue,
  completedValue,
}: WorkoutProgressBarProps) {
  useEffect(() => {
    setTimeout(() => {
      LayoutAnimation.easeInEaseOut();
    }, 250);
  });
  return (
    <ScContainer>
      <ScPercentageLabel>
        {(completedValue / maxValue) * 100}% completed
      </ScPercentageLabel>
      <ScBarContainer>
        <ScBarItem
          size={completedValue}
          color="#49CB00"
          side="left"
          max={maxValue}
        />
        <ScBarItem
          size={maxValue - completedValue}
          color="#111111"
          side="right"
          max={maxValue}
        />
      </ScBarContainer>
    </ScContainer>
  );
}
