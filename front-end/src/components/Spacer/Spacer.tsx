import React from "react";
import { ScSpacer } from "./Spacer.styled";

interface SpacerProps {
  size: 1 | 2 | 3 | 4 | 5;
  orientation: "vertical" | "horizontal";
}

export default function Spacer({ size, orientation }: SpacerProps) {
  return <ScSpacer size={size - 1} orientation={orientation} />;
}
