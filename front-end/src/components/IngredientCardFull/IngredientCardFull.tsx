import React, { useState } from "react";
import {
  ScGramInput,
  ScIngredientCardFullContainer,
} from "./IngredientCardFull.styled";
import { Text } from "react-native";

interface IngredientCardFullProps {
  name: string;
}

export default function IngredientCardFull({ name }: IngredientCardFullProps) {
  const [focused, setFocused] = useState(false);

  return (
    <ScIngredientCardFullContainer>
      <Text style={{ color: "white" }}>{name}</Text>
      <ScGramInput
        placeholder="100g"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        focus={focused}
      />
    </ScIngredientCardFullContainer>
  );
}
