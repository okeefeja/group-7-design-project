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
  },
  bigLogo:{
    width: 240,
    height: 240,
    borderRadius: 75,
    position: 'absolute',
    bottom: -50,
    left: 35,
    // marginHorizontal: width/2 - 120,
    // marginLeft: 10,
    // marginRight: 'auto',
  }

});
