import React from "react";
import { View, Text } from "react-native";
import { ViewRow, ViewCol } from "../Global/ViewFlex";
import Spacer from "../Spacer/Spacer";

interface NutritionTrackerProps {
  nutritionData: {
    calories: number;
    macros: { label: string; total: number }[];
  };
}

export default function NutritionTracker({
  nutritionData,
}: NutritionTrackerProps) {
  return (
    <View style={{ display: "flex", alignItems: "center" }}>
      <Text
        style={{
          color: "white",
          fontSize: 80,
          fontWeight: "600",
          height: 75,
        }}
      >
        {Number(nutritionData.calories.toFixed(1))}
      </Text>
      <Text style={{ color: "white", fontSize: 18 }}>Calories</Text>
      <Spacer orientation="vertical" size={3} />
      <ViewRow
        style={{
          justifyContent: "space-between",
          width: "70%",
        }}
      >
        {nutritionData.macros.map((macro, i) => {
          return (
            <ViewCol style={{ alignItems: "center" }} key={i}>
              <Text style={{ color: "white", fontSize: 22, fontWeight: "600" }}>
                {Number(macro.total.toFixed(1))}g
              </Text>
              <Text style={{ color: "white", fontSize: 16 }}>
                {macro.label}
              </Text>
            </ViewCol>
          );
        })}
      </ViewRow>
    </View>
  );
}
