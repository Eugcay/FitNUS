import React, {useState} from "react";
import { View, Button, TextInput, StyleSheet} from "react-native";
import Background from "../components/Background";
import Background from "../components/Background";

const SignupScreen = () => {
  const [form, setForm] = useState({name: '', userId: '', password: ''})
  
  const handleChange = event => {
      setForm({
            ...form,
          [event.target.name]: event.target.value
      })
  }

  return (
    <Backgorund>
        <Image
        source={require("../assets/National_University_of_Singapore_logo_NUS.png")}
        style={styles.logo}
      />
    </Backgorund>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
    logo: {
        width: '70%',
        height: '14%',
        alignSelf: "center",
    },
})
