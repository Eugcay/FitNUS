import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Divider } from "react-native-elements";
import { styles } from "./styles";
import firebase from "firebase";
import moment from "moment";

const Preview = ({ navigation, item, currUser }) => {
  const [user, setUser] = useState({});
  const [completed, setCompleted] = useState(item.data.completed);
  const [expiring, setExpired] = useState(false)
  const currUserId = firebase.auth().currentUser.uid;

  useEffect(() => {
    const uid = item.data.user;
    firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .onSnapshot((snapshot) => setUser({ ...snapshot.data() }));
    
       setExpired()
  }, [item]);

  const start = () => {
    const template = {
      name: item.data.name,
      exercises: item.data.details,
      description: item.data.description,
      imageURL: item.data?.img,
      jio: {
        people: item.data.likes,
        id: item.id,
      },
    };

    navigation.navigate("Start Workout", {
      screen: item.data.type === "Run" ? "Run Map" : "Start Workout",
      params: {
        template,
      },
    });
  };

  const removeJio = (id) => {
    firebase
      .firestore()
      .collection("jios")
      .doc(id)
      .delete()
      .then(props.navigation.navigate("Main"));
  };

  return (
    <TouchableOpacity
      style={[styles.container, {backgroundColor: item.data?.time && item.data?.time.toDate() < new Date() && !completed? '#FFA500' : 'white'}]}
      onPress={() =>
        navigation.navigate("Post", { navigation, item, currUser })
      }
    >
      <View style={styles.profileBar}>
        <Image
          source={
            user.photoURL
              ? { uri: user.photoURL }
              : require("../../assets/user.png")
          }
          style={styles.profilePic}
        />
        <View style={{ width: "70%" }}>
          <Text>{user.name}</Text>
          {item.data.creation && (
            <Text>
              {moment(item.data.creation.toDate()).format("D MMM YY h:mm a")}
            </Text>
          )}
        </View>
        {item.data.user === currUserId && !completed && (
          <>
            <TouchableOpacity
              style={{ marginRight: 5 }}
              onPress={() => start()}
            >
              <MaterialCommunityIcons name="play" size={20} color="green" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Start Jio", {
                  jioData: {
                    ...item,
                    data: {
                      ...item.data,
                      time: item.data.time.toDate(),
                    },
                  },
                })
              }
               style={{marginRight: 5}}
            >
              <MaterialIcons name="mode-edit" size={18} color="darkblue" />
              
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => removeJio(item.id)}><MaterialCommunityIcons name='close' size={18} color='crimson' /></TouchableOpacity>
          </>
        )}
      </View>
      <Divider />
      <Text style={styles.title}>{item.data.name}</Text>
    </TouchableOpacity>
  );
};

export default Preview;
