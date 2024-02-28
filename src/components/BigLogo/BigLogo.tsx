// Create a new file CustomHeader.tsx
import React from "react";
import { View, Text, Image, StyleSheet, ImageURISource } from "react-native";
import { CustomHeaderProps } from "../../types/API";
import { styles } from "./BigLogo.styled";
import { isLargeScreen } from "./constants";
import { ImageSourcePropType } from "react-native";

// Import your local image directly
const logoImage = require('../../../assets/Logo.png');

const BigLogo = () => {
    return (
        <View style={{ width: isLargeScreen ? 80 : 50 }}>
            {/* Use the imported logoImage directly in the source prop */}
            <Image source={logoImage} style={styles.bigLogo} />
        </View>
    )
}

export default BigLogo;