import React, { useState } from "react";
import {
  ScGramInput,
  ScIngredientCardFullContainer,
} from "./IngredientCardFull.styled";
import { Text } from "react-native";
import { ViewRow } from "../Global/ViewFlex";
import Spacer from "../Spacer/Spacer";

interface IngredientCardFullProps {
  name: string;
  defaultWeight: number;
  onWeightChange: (weight: number) => void;
}

export default function IngredientCardFull({
  name,
  defaultWeight,
  onWeightChange,
}: IngredientCardFullProps) {
  const [focused, setFocused] = useState(false);
  const [weight, setWeight] = useState(defaultWeight.toString());

  // Function to handle input change
  const handleInputChange = (text: string) => {
    // Only allow input if it contains only digits
    if (/^\d*$/.test(text)) {
      setWeight(text);
      onWeightChange(parseInt(text));
    }
  };

  return (
    <ScIngredientCardFullContainer>
      <Text style={{ color: "white" }}>{name}</Text>
      <ViewRow style={{ alignItems: "center" }}>
        <ScGramInput
          value={weight.toString()}
          onChangeText={handleInputChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          focus={focused}
        />
        <Spacer orientation="horizontal" size={2} />
        <Text style={{ color: "white", fontSize: 16 }}>grams</Text>
      </ViewRow>
    </ScIngredientCardFullContainer>
  );
}
