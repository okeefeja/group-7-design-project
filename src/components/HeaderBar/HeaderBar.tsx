// Create a new file CustomHeader.tsx
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { CustomHeaderProps } from "../../types/API";
import { styles } from "./HeaderBar.styled";
import { isLargeScreen } from "./constants";

const CustomHeader: React.FC<CustomHeaderProps> = ({
  title,
  userName,
  profilePic,
}) => {
  //add profilePic
  return (
    <View style={styles.container}>
      <View style={{ width: isLargeScreen ? 80 : 50 }}>
        {/* Invisible Spacer */}
        <Image source={profilePic} style={styles.profilePic} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <View style={{ width: isLargeScreen ? 80 : 50 }}>
        {/* Invisible Spacer */}
        <Text style={styles.userName}>{userName}</Text>
      </View>
    </View>
  );
};

export default CustomHeader;
