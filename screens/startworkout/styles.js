import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  button: {
    marginHorizontal: 8,
    width: "45%",
    alignItems: "center",
    justifyContent: "center",
    height: "20%",
    borderRadius: 5,
  },

  caption: {
    color: "white",
    fontSize: 40,
    backgroundColor: "#000000a0",
  },

  content: {
    color: "white",
    fontSize: 20,
    backgroundColor: "#000000a0",
    marginBottom: 20,
  },

  join: {
    marginBottom: 40,
    width: "80%",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "white",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#fff",
  },

  buttonSurrounding: {
    width: "100%",
    backgroundColor: "#000000a0",
    alignItems: "center",
  },

  bottomButton: {
    marginHorizontal: 8,
    width: "45%",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    borderRadius: 5,
  },

  bottombar: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30
  },
  statbar: {
    flexDirection: "row",
    marginHorizontal: 10,
    borderTopColor: "#C0C0C0",
    borderBottomColor: "#C0C0C0",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    alignItems: "center",
    height: 45
  },
  startstop: {
    width: "30%",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
    backgroundColor: "#0B2A59",
    borderRadius: 5,
    height: 35,
  },
  stopwatch: {
    width: "70%",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
  },

  image: {
    flex: 1,
    resizeMode: "contain",
    alignItems: "center",
  },

  circle: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "gray",
    marginHorizontal: 12,
    width: 50,
    height: 50,
    borderRadius: 50,
  },

  itemReplace: {
    minHeight: "100%",
    width: "50%",
    backgroundColor: "royalblue",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    marginRight: 1,
  },
  
  itemDelete: {
    minHeight: "100%",
    width: "50%",
    backgroundColor: "red",
    alignItems: "center",
    borderRadius: 4,
    justifyContent: "center",
  }
});

export const options = {
  container: {
    alignItems: "center",
    width: "70%",
    justifyContent: "center",
    marginHorizontal: 5,
  },
  text: {
    fontSize: 25,
    color: "#000000",
    marginLeft: 7,
  },
};
