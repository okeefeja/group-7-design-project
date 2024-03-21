import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { ScHeaderContainer, styles } from "./HeaderBar.styled";
import TextButton from "../Buttons/TextButton/TextButton";
import Spacer from "../Spacer/Spacer";
import { getAuth } from "firebase/auth";

interface CustomHeaderProps {
  username: string;
  navigation: any;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  username,
  navigation,
}) => {
  //add profilePic

  const handleSignOut = () => {
    const auth = getAuth();
    auth.signOut();
    navigation.navigate("LoginScreen");
  };
  return (
    <ScHeaderContainer>
      <View
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        {/* Emulates profilePic for now */}
        <View
          style={{
            height: 35,
            width: 35,
            backgroundColor: "white",
            borderRadius: 999,
          }}
        />
        <Spacer orientation="horizontal" size={2} />
        <Text style={{ color: "white", fontSize: 22, fontWeight: "600" }}>
          {username}
        </Text>
      </View>
      <TextButton label="Sign out" onClick={handleSignOut} />
    </ScHeaderContainer>
  );
};

export default CustomHeader;
