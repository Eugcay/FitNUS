import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  logo: {
    aspectRatio: 1,
    height: '35%',
    minHeight: 100,
    alignSelf: "center",
    marginBottom: -10
  },

  loginButton: {
    marginTop: 15,
    width: "77%",
    alignItems: "center",
    marginVertical: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#F0FFFF",
    borderRadius: 17,
    borderWidth: 1,
    borderColor: "#fff",
  },

  nusButton: {
    marginTop: 15,
    width: "77%",
    alignItems: "center",
    marginVertical: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#FFC94A",
    borderRadius: 17,
    borderWidth: 1,
    borderColor: "#fff",
  },

  buttonText: {
    color: "#0B2A59",
    fontSize: 15,
  },

  name: {
    fontSize: 45,
    color: "#FFD700",
    fontFamily: "Times New Roman",
    fontWeight: "bold",
    marginTop: 10,
  },

  forgotButton: {
    alignItems: "flex-end",
    width: "76%",
    height: 30,
    marginVertical: 8,
    fontSize: 14,
    color: "#F5DC3C",
  },
});
