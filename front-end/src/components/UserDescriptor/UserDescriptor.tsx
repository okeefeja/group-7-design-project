import React from "react";
import { View, Text } from "react-native";
import Spacer from "../Spacer/Spacer";

interface UserDescriptorProps {
  username: string;
  email: string;
  // TODO: Add profilePic
}

export default function UserDescriptor({
  username,
  email,
}: UserDescriptorProps) {
  return (
    <View style={{ display: "flex", alignItems: "center" }}>
      <View
        style={{
          backgroundColor: "white",
          height: 200,
          width: 200,
          borderRadius: 999,
        }}
      />
      <Spacer orientation="vertical" size={2} />
      <Text style={{ color: "white", fontSize: 22, fontWeight: "600" }}>
        {username}
      </Text>
      <Text style={{ color: "gray", fontSize: 16, fontWeight: "400" }}>
        {email}
      </Text>
    </View>
  );
}
