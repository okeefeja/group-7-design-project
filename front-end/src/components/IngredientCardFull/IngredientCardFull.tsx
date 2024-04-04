import React, { useState } from "react";
import {
  ScGramInput,
  ScIngredientCardFullContainer,
} from "./IngredientCardFull.styled";
import { Text } from "react-native";
import { ViewCol, ViewRow } from "../Global/ViewFlex";
import Spacer from "../Spacer/Spacer";

interface IngredientCardFullProps {
  name: string;
  type: string;
  defaultWeight: number;
  onWeightChange: (weight: number) => void;
}

export default function IngredientCardFull({
  name,
  type,
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
      <ViewCol>
        <Text style={{ color: "#ff8610", fontWeight: "700", fontSize: 12 }}>
          {type.toUpperCase().split(";")[0]}
        </Text>
        <Spacer orientation="vertical" size={1} />
        <Text style={{ color: "white", fontSize: 16, fontWeight: "600" }}>
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </Text>
      </ViewCol>
      <ViewRow style={{ alignItems: "center" }}>
        <ScGramInput
          value={weight.toString()}
          onChangeText={handleInputChange}
          onFocus={() => {
            setFocused(true);
            const caretPosition = weight.length;
            const selection = { start: caretPosition, end: caretPosition };
            setWeight(weight);
          }}
          onBlur={() => setFocused(false)}
          focus={focused}
        />
        <Spacer orientation="horizontal" size={2} />
        <Text style={{ color: "white", fontSize: 16 }}>grams</Text>
      </ViewRow>
    </ScIngredientCardFullContainer>
  );
}
