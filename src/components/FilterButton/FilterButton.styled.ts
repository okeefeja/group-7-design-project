// FilterButton.styled.ts
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  button: {
    backgroundColor: "#ff8610", // Button background color
    marginRight: 10,
    paddingHorizontal: 20, // Horizontal padding for width
    paddingVertical: 10, // Vertical padding for height
    borderRadius: 20, // Rounded edges for the oval shape
    alignItems: 'center', // Center text horizontally
    justifyContent: 'center', // Center text vertically
    minHeight: 40, // Minimum height for touch targets
  },
  buttonText: {
    color: "#000000", // Text color
    fontSize: 16, // Text size
  },
});