import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { CustomHeaderProps } from "../../types/API";
import { styles } from "./HeaderBar.styled";



const CustomHeader: React.FC<CustomHeaderProps> = ({
  title,
  userName,
  profilePic,
}) => {
  //add profilePic
  return (
    <View style={styles.container}>

        <Image source={profilePic} style={styles.profilePic} />

      <Text style={styles.title}>{title}</Text>

        <Text style={styles.userName}>{userName}</Text>

  
    </View>
  );
};

export default CustomHeader;
