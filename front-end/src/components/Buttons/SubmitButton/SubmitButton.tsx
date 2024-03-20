import React from "react";
import { ScButtonLabel, ScSubmitButton } from "./SubmitButton.styled";

interface SubmitButtonProps {
  label: string;
  onClick: () => void;
  style?: any;
}

export default function SubmitButton({
  label,
  onClick,
  style = {},
}: SubmitButtonProps) {
  return (
    <ScSubmitButton onPress={onClick} style={style}>
      <ScButtonLabel>{label}</ScButtonLabel>
    </ScSubmitButton>
  );
}
