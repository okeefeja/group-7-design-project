import React from "react";
import { View, Text } from "react-native";
import { ScIngredientSearchCardContainer } from "./IngredientSearchCard.styled";
import Icon from "react-native-vector-icons/Ionicons";
import { ViewCol } from "../Global/ViewFlex";
import Spacer from "../Spacer/Spacer";

interface IngredientSearchCardProps {
  name: string;
  type: string;
}

export default function IngredientSearchCard({
  name,
  type,
}: IngredientSearchCardProps) {
  return (
    <ScIngredientSearchCardContainer>
      <ViewCol>
        <Text style={{ color: "#ff8610", fontWeight: "700", fontSize: 12 }}>
          {type.toUpperCase().split(";")[0]}
        </Text>
        <Spacer orientation="vertical" size={1} />
        <Text style={{ color: "white", fontSize: 16, fontWeight: "600" }}>
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </Text>
      </ViewCol>
      <Icon name="add-sharp" size={20} color="#ff8610" />
    </ScIngredientSearchCardContainer>
  );
}
