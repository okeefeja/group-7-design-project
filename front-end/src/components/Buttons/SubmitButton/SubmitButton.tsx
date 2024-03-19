import React from "react";
import { ScButtonLabel, ScSubmitButton } from "./SubmitButton.styled";

interface SubmitButtonProps {
  label: string;
  onClick: () => void;
}

export default function SubmitButton({ label, onClick }: SubmitButtonProps) {
  return (
    <ScSubmitButton onPress={onClick}>
      <ScButtonLabel>{label}</ScButtonLabel>
    </ScSubmitButton>
  );
}
