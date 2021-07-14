import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },

  addSet: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  setHeader: {
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "silver",
    width: "100%",
  },

  setTitle: {
    fontSize: 17,
  },

  setContent: {
    borderBottomWidth: 0.5,
    borderBottomColor: "silver",
    width: "100%",
    alignItems: "center",
    padding: 5,
    paddingBottom: 8,
  },

  input: {
    flexDirection: "row",
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
  },

  complete: {
    width: "100%",
    alignItems: "center",
    padding: 5,
    backgroundColor: "darkgreen",
    marginVertical: 5,
  },
});
