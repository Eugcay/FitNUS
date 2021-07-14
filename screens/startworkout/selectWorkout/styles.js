import { StyleSheet, Dimensions, Platform } from "react-native";

export const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
  },

  title: {
    fontSize: 40,
    color: "whitesmoke",
    shadowRadius: 1,
    shadowColor: "black",
  },

  darken: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  label: {
    width: "50%",
    borderRadius: 130,
    height: "5%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    position: "absolute",
    bottom:
      Platform.OS === "ios"
        ? (Dimensions.get("screen").height * 47) / 100
        : (Dimensions.get("screen").height * 45) / 100,
    backgroundColor: "powderblue",
  },

  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    flexDirection: "row",
    alignItems: "center",
  },
});
