import React from "react";
import { View, Text } from "react-native";
import { ScIngredientSearchCardContainer } from "./IngredientSearchCard.styled";
import Icon from "react-native-vector-icons/Ionicons";

interface IngredientSearchCardProps {
  name: string;
}

export default function IngredientSearchCard({
  name,
}: IngredientSearchCardProps) {
  return (
    <ScIngredientSearchCardContainer>
      <Text style={{ color: "white", fontSize: 15, fontWeight: "600" }}>
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </Text>
      <Icon name="add-sharp" size={20} color="#ff8610" />
    </ScIngredientSearchCardContainer>
  );
}
