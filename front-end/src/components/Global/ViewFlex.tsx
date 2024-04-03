import React, { PropsWithChildren } from "react";
import { View } from "react-native";

interface ViewProps {
  style?: any;
}

export function ViewCol({ children, style }: PropsWithChildren<ViewProps>) {
  return (
    <View style={{ display: "flex", flexDirection: "column", ...style }}>
      {children}
    </View>
  );
}

export function ViewRow({ children, style }: PropsWithChildren<ViewProps>) {
  return (
    <View style={{ display: "flex", flexDirection: "row", ...style }}>
      {children}
    </View>
  );
}
