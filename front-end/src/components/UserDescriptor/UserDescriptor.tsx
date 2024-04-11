import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Spacer from "../Spacer/Spacer";
import Icon from "react-native-vector-icons/Ionicons";

interface UserDescriptorProps {
  username: string;
  email: string;
  profilePic: string;
  onPress: () => void;
  editable?: boolean;
}

export default function UserDescriptor({
  username,
  email,
  profilePic,
  onPress,
  editable,
}: UserDescriptorProps) {
  return (
    <View style={{ display: "flex", alignItems: "center" }}>
      <TouchableOpacity
        style={{ display: "flex", alignItems: "flex-end" }}
        onPress={onPress}
      >
        <View style={{ position: "relative", top: 20, left: 8 }}>
          <Icon
            name="pencil-sharp"
            size={28}
            color={editable ? "#ff8610" : "black"}
          />
        </View>
        <Image
          source={{ uri: profilePic }}
          style={{
            height: 250,
            width: 250,
            borderRadius: 999,
          }}
        />
      </TouchableOpacity>

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
