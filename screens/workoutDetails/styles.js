import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  image: {
    width: "100%",
    height: "20%",
    minHeight: 250,
  },

  title: {
    fontSize: 22,
  },

  top: {
    marginVertical: 5,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#C0C0C0",
  },

  body: {
    marginVertical: 5,
    marginHorizontal: 10,
    textAlign: "justify",
  },

  circle: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "gray",
    marginHorizontal: 12,
    width: 30,
    height: 30,
    borderRadius: 50,
  },

  statbar: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 5,
    borderTopColor: "#C0C0C0",
    borderBottomColor: "#C0C0C0",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  statbox: {
    width: "30%",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
  },

  start: {
    backgroundColor: "lightgreen",
    marginVertical: 10,
    width: "95%",
    alignSelf: "center",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },

  scroll: {
    paddingBottom: 80,
  },
});
