import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  logo: {
    width: "70%",
    height: "14%",
    minHeight: 100,
    alignSelf: "center",
  },

  image: {
    marginBottom: 20,
    width: 150,
    height: 170,
    alignSelf: "center",
  },

  input: {
    backgroundColor: "#CCE5FF",
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
    height: "5%",
    marginVertical: 10,
    borderWidth: 1.5,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
    opacity: 0.8,
    minHeight: 40,
  },

  layout: {
    flex: 1,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "blue",
  },

  loginButton: {
    marginTop: 7,
    width: "80%",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#FFC94A",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#fff",
  },

  signUpButton: {
    height: 30,
    marginBottom: 2,
    fontSize: 14,
    color: "#F5DC3C",
  },

  forgotButton: {
    alignItems: "flex-end",
    width: "76%",
    height: 30,
    marginTop: 8,
    fontSize: 14,
    color: "#F5DC3C",
  },

  backButton: {
    width: "85%",
    marginBottom: 30,
    alignSelf: "auto",
  },
});
