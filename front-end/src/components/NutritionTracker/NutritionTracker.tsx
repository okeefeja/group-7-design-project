import React from "react";
import { View, Text } from "react-native";
import { ViewRow, ViewCol } from "../Global/ViewFlex";
import Spacer from "../Spacer/Spacer";

interface NutritionTrackerProps {
  calories: number;
  nutritionData: { label: string; total: number }[];
}

export default function NutritionTracker({
  calories,
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
        {calories}
      </Text>
      <Text style={{ color: "white", fontSize: 18 }}>Calories</Text>
      <Spacer orientation="vertical" size={3} />
      <ViewRow
        style={{
          justifyContent: "space-between",
          width: "70%",
        }}
      >
        {nutritionData.map((element, i) => {
          return (
            <ViewCol style={{ alignItems: "center" }} key={i}>
              <Text style={{ color: "white", fontSize: 22, fontWeight: "600" }}>
                {element.total}g
              </Text>
              <Text style={{ color: "white", fontSize: 16 }}>
                {element.label}
              </Text>
            </ViewCol>
          );
        })}
      </ViewRow>
    </View>
  );
}
