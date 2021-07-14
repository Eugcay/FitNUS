import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#0B2A59",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 30,
    color: "gold",
    marginVertical: 30,
  },

  emailBox: {
    flexDirection: "row",
    width: "70%",
    height: "4%",
    minHeight: 30,
    borderRadius: 5,
    backgroundColor: "lightblue",
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignItems: "center",
    marginVertical: 20,
  },

  backButton: {
    flexDirection: "row",
    position: "absolute",
    top: Platform.OS === "ios" ? 50 : 30,
    left: 30,
  },

  resetButton: {
    backgroundColor: "gold",
    width: "50%",
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    marginTop: 20,
  },
});
