import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  logo: {
    aspectRatio: 1,
    height: '20%',
    minHeight: 100,
    alignSelf: "center",
  },

  input: {
    backgroundColor: "#CCE5FF",
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
    height: "5%",
    marginVertical: 13,
    borderWidth: 1.5,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
    opacity: 0.8,
    minHeight: 40,
  },

  inputbox: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    color: "black",
  },

  link: {
    fontWeight: "bold",
    color: "#FFC94A",
  },

  SignupButton: {
    marginTop: 15,
    width: "80%",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#FFC94A",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#fff",
    marginBottom: 80,
  },

  forgotButton: {
    height: 30,
    marginBottom: 30,
    color: "#F5DC3C",
  },

  backButton: {
    width: "80%",
    marginBottom: 40,
    alignSelf: "auto",
  },
});
