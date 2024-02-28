import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingVertical: 15,
      paddingHorizontal : 10,
      alignItems : "center",
    },
    button: {
      backgroundColor: "#ff8610", // Button background color
      marginRight: 10,
      paddingHorizontal: 20, // Horizontal padding, increase if you need wider buttons
      paddingVertical: 10, // Vertical padding, adjust for the desired height
      borderRadius: 20, // This creates the rounded edges for the oval shape
      alignItems: 'center', // This ensures the text is centered within the button
      justifyContent: 'center', // This ensures the text is centered vertically
      minHeight : 40,
    },
    buttonText: {
      color: "#000000", // Text color
      fontSize: 16,
      // Add other text styling such as font size or font weight if needed
    },
  });
