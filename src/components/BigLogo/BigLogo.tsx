// Create a new file CustomHeader.tsx
import React from "react";
import { View, Text, Image, StyleSheet, ImageURISource } from "react-native";
import { CustomHeaderProps } from "../../types/API";
import { styles } from "./BigLogo.styled";
import { isLargeScreen } from "./constants";
import { ImageSourcePropType } from "react-native";


const BigLogo = (image: ImageURISource,) => {
    return (
        <View style={{ width: isLargeScreen ? 80 : 50 }}>
            <Image source={{uri: '../assets/Logo.png'}} style={styles.bigLogo} />
        </View>
    )
}

export default BigLogo;