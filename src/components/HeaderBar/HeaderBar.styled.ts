import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Aligns children with space between them
    paddingBottom : 20,
    paddingTop : 50,
    paddingHorizontal: 20, // Fixed padding for mobile
    backgroundColor: "#1a1a1a",
  },
  profilePic: {
    top: 10,
    width: 50, // Fixed width for mobile
    height: 50, // Fixed height for mobile
    borderRadius: 25, // Ensure this is half of width/height
    backgroundColor : "#ff8610",
  },
  title: {
    top: 10,
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 24, // Adjusted fixed font size for mobile
    color: "#ff8610",
    marginHorizontal: 10, // Gives the title some breathing room on the sides
  },
  userName: {
    top: 10,
    fontWeight: "bold",
    fontSize: 24, // Adjusted fixed font size for mobile
    color: "#ff8610",
    alignSelf: "center",
  },

});
