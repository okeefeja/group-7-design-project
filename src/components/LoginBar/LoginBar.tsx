import React, { useEffect, useState } from "react";
import {
  ScCardContainer,
  ScTitleText,
} from "./LoginBar.styled";
import { ExerciseList } from "../../types/API";

interface LoginBarProps{
  title: string;
}

export default function LoginBar({
  title,
}: LoginBarProps) {
  return (
      <ScCardContainer>
        <ScTitleText>{title}</ScTitleText>
      </ScCardContainer>
  )
}
