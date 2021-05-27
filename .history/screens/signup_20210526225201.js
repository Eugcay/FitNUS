import React, {useState} from "react";
import { View, Button, TextInput} from "react-native";

const SignupScreen = () => {
  const [form, setForm] = useState({name: '', userId: '', password: ''})
  
  const handleChange = event => {
      setForm({
            ...form,
          [event.target.name]: event.target.value
      })
  }

  return (

  );
};

export default SignupScreen;
