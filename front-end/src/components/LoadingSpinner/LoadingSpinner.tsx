import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import Spacer from "../Spacer/Spacer";

interface LoadingSpinnerProps {
  text: string;
}

export default function LoadingSpinner({ text }: LoadingSpinnerProps) {
  return (
    <View style={{ display: "flex", alignItems: "center" }}>
      <ActivityIndicator size={"large"} color="white" />
      <Spacer orientation="vertical" size={1} />
      <Text style={{ color: "white", fontSize: 16 }}>{text}</Text>
    </View>
  );
}
