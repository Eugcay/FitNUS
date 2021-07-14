import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "contain",
    alignItems: "center",
  },

  bottom: {
    width: "100%",
    flex: 1,
    justifyContent: "flex-end",
  },

  caption: {
    color: "white",
    fontSize: 40,
    backgroundColor: "#000000a0",
    textAlign: 'center'
  },

  content: {
    color: "white",
    fontSize: 20,
    backgroundColor: "#000000a0",
    marginBottom: 20,
    textAlign: 'center'
  },

  join: {
    marginBottom: 40,
    width: "80%",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "lightblue",
    borderRadius: 10,
    borderWidth: 1,
    marginHorizontal: 5
  },

  buttonSurrounding: {
    flexDirection: 'row',
    width: "100%",
    backgroundColor: "#000000a0",
    alignItems: "center",
    justifyContent:'center'
  },
});
