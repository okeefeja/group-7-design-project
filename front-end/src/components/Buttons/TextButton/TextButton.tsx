import React from "react";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ScTextButtonLabel } from "./TextButton.styled";

interface TextButtonProps {
  label: string;
  onClick: () => void;
  bold?: boolean;
}

export default function TextButton({
  label,
  onClick,
  bold = false,
}: TextButtonProps) {
  return (
    <TouchableOpacity onPress={onClick}>
      <ScTextButtonLabel bold={bold}>{label}</ScTextButtonLabel>
    </TouchableOpacity>
  );
}
