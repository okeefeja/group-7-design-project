import React from "react";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ScTextButtonLabel } from "./TextButton.styled";

interface TextButtonProps {
  label: string;
  onClick: () => void;
}

export default function TextButton({ label, onClick }: TextButtonProps) {
  return (
    <TouchableOpacity onPress={onClick}>
      <ScTextButtonLabel>{label}</ScTextButtonLabel>
    </TouchableOpacity>
  );
}
