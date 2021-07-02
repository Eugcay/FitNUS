import { StyleSheet, Dimensions } from "react-native";

export const styles = StyleSheet.create({
  delete: {
    color: "red",
    marginRight: 10,
    fontSize: 16,
    alignSelf: "center",
  },

  text: {
    fontSize: 23,
    marginBottom: 5,
  },

  container: {
    flex: 1,
    alignItems: "center",
  },

  image: {
    marginBottom: 25,
    marginTop: 10,
    width: "25%",
    height: "15%",
    alignSelf: "center",
    borderRadius: 120,
    backgroundColor: "#D3D3D3",
    aspectRatio: 1 / 1,
  },

  bio: {
    width: "70%",
    textAlign: "justify",
    marginVertical: 8,
  },

  editButton: {
    marginVertical: 15,
    borderWidth: 1,
    borderColor: "#D3D3D3",
    width: "70%",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 7,
  },

  followers: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    marginVertical: 12,
  },

  achievementMaster: {
    width: Dimensions.get("window").width * 0.85,
    justifyContent: "space-between",
    backgroundColor: "whitesmoke",
    marginTop: 15,
    marginBottom: 65,
  },
  achievementBox: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    marginVertical: 2,
    height: 70,
    backgroundColor: "#fff",
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  achievementDescription: {
    fontSize: 12,
    color: "grey",
    width: "80%",
  },

  divider: {
    borderWidth: 1,
    borderColor: "#D3D3D3",
    width: "90%",
    marginVertical: 15,
  }
});
