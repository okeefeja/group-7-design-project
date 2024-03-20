import React from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Spacer from "../Spacer/Spacer";
import { TouchableOpacity } from "react-native-gesture-handler";

interface CollapserProps {
  title: string;
  selected: boolean;
  handleClick: () => void;
}

export default function Collapser({
  title,
  selected,
  handleClick,
}: CollapserProps) {
  return (
    <TouchableOpacity
      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      onPress={handleClick}
    >
      <View style={{ width: 20 }}>
        {selected ? (
          <Icon name="chevron-down" color={"#ff8610"} size={18} />
        ) : (
          <Icon name="chevron-right" color={"#ff8610"} size={18} />
        )}
      </View>
      <Spacer orientation="horizontal" size={1} />
      <Text style={{ color: "white", fontSize: 18, fontWeight: "600" }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
