import React from "react";
import { WorkoutProgram } from "../../types/API";
import { View, Text } from "react-native";
import {
  ScDecriptorContainer,
  ScDescriptionText,
  ScTitleText,
} from "./Descriptor.styled";

interface DescriptorProps {
  title: string;
  description?: string | undefined;
}

export default function Descriptor({ title, description }: DescriptorProps) {
  return (
    <ScDecriptorContainer>
      <ScTitleText>{title}</ScTitleText>
      {description && <ScDescriptionText>{description}</ScDescriptionText>}
    </ScDecriptorContainer>
  );
}
