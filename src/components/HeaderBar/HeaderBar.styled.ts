// HeaderBar.styled.ts
import { StyleSheet } from "react-native";
import {
  paddingLaptop,
  paddingMobile,
  fontSizeLaptop,
  fontSizeMobile,
  isLargeScreen,
} from "./constants";

// HeaderBar.styled.ts
export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Aligns children with space between them
    paddingVertical: 10,
    paddingHorizontal: isLargeScreen ? paddingLaptop : paddingMobile,
    backgroundColor: "#1a1a1a",
  },
  profilePic: {
    width: isLargeScreen ? 80 : 50,
    height: isLargeScreen ? 80 : 50,
    borderRadius: isLargeScreen ? 40 : 25,
  },
  title: {
    flex: 1,
    flexShrink: 1, // Allows the title to shrink if necessary
    textAlign: "center",
    fontWeight: "bold",
    fontSize: isLargeScreen ? fontSizeLaptop : fontSizeMobile,
    color: "#ff8610",
    marginHorizontal: 10, // Gives the title some breathing room on the sides
  },
  userName: {
    fontWeight: "bold",
    fontSize: isLargeScreen ? fontSizeLaptop : fontSizeMobile,
    color: "#ff8610",
    alignSelf: "center",
  },
});
