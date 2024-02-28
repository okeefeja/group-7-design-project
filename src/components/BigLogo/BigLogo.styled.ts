import { StyleSheet } from "react-native";
import {
  paddingLaptop,
  paddingMobile,
  fontSizeLaptop,
  fontSizeMobile,
  isLargeScreen,
  width,
} from "./constants";


export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Aligns children with space between them
    paddingVertical: 10,
    backgroundColor: "#1a1a1a",
  },
  bigLogo:{
    width: 240,
    height: 240,
    borderRadius: 75,
    marginHorizontal: width/2 - 120,
  }

});
