import React, { useState } from "react";
import { Text, View } from "react-native";
import { ScTextInput } from "./UserInput.styled";

interface UserInputProps {
  placeholder: string;
}

export default function UserInput({ placeholder }: UserInputProps) {
  const [focused, setFocused] = useState(false);

  return (
    <View>
      <Text style={{ color: "white" }}>Name</Text>
      <ScTextInput
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        focus={focused}
      />
    </View>
  );
}
