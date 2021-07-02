import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    marginVertical: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
  },

  profilePic: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },

  image: {
    height: 200,
    width: "100%",
    marginBottom: 10,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 5,
  },

  inLine: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
  },

  dataItem: {
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
    paddingVertical: 6,
  },

  profileBar: {
    flexDirection: "row",
    paddingHorizontal: 5,
    paddingVertical: 8,
    alignItems: "center",
  },
});
