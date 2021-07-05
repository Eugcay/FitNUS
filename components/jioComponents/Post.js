import React, { useState, useEffect } from "react";
import { Text, Image, View, TouchableOpacity } from "react-native";
import firebase from "firebase";
import moment from "moment";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Divider } from "react-native-paper";
import { styles } from "./styles";

const Post = ({ navigation, item, currUser }) => {
  const [user, setUser] = useState({});
  const [liked, setLiked] = useState(false);

  const onLike = () => {
    firebase
      .firestore()
      .collection("jios")
      .doc(item.id)
      .set({
        ...item.data,
        likes: item.data.likes.concat({
          uid: firebase.auth().currentUser.uid,
          name: currUser.name,
        }),
      });
  };

  const onUnlike = () => {
    const data = [...item.data.likes];
    const index = data.findIndex(
      (usr) => usr.uid === firebase.auth().currentUser.uid
    );
    data.splice(index, 1);
    firebase
      .firestore()
      .collection("jios")
      .doc(item.id)
      .set({
        ...item.data,
        likes: data,
      });
  };

  useEffect(() => {
    const uid = item.data.user;
    if (
      item.data.likes.findIndex(
        (usr) => usr.uid === firebase.auth().currentUser.uid
      ) > -1
    ) {
      setLiked(true);
    } else {
      setLiked(false);
    }
    firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .onSnapshot((snapshot) => setUser({ ...snapshot.data() }));
  }, [item]);

  return (
    item && (
      <View style={styles.container}>
        <View style={styles.profileBar}>
          <Image
            source={
              user.photoURL
                ? { uri: user.photoURL }
                : require("../../assets/user.png")
            }
            style={styles.profilePic}
          />
          <View style={{ width: "85%" }}>
            <Text>{user.name}</Text>
            <Text>
              {moment(new Date(item.data?.creation.seconds * 1000)).format(
                "D MMM YY h:mm a"
              )}
            </Text>
          </View>
          {item.data.user === firebase.auth().currentUser.uid && (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Start Jio", {
                  jioData: {
                    ...item,
                    data: {
                      ...item.data,
                      time: new Date(item.data.time.seconds * 1000),
                    },
                  },
                })
              }
            >
              <MaterialIcons name="mode-edit" size={18} colo="darkblue" />
            </TouchableOpacity>
          )}
          {/* <TouchableOpacity
          onPress={navigation.navigate("Details", {
            view: true,
            details: item.data.details,
          })}
        >
          <Text style={{ justifyContent: "flex-end" }}>Details</Text>
        </TouchableOpacity> */}
        </View>
        {item.data.img && (
          <Image style={styles.image} source={{ uri: item.data.img }} />
        )}
        <Divider />
        <View>
          <Text style={styles.title}>{item.data.name}</Text>
          <Divider />
          <View style={styles.inLine}>
            <View style={[styles.dataItem, { width: "48%" }]}>
              <MaterialIcons name="location-pin" size={18} color="crimson" />
              <Text style={{ marginTop: 3 }}>{item.data.location.title}</Text>
            </View>

            <View style={[styles.dataItem, { width: "48%" }]}>
              <MaterialIcons name="date-range" size={18} color="darkblue" />
              <Text style={{ marginTop: 3 }}>
                {moment(item.data.time.seconds * 1000).format(
                  "D MMM YYYY, h:mm a"
                )}
              </Text>
            </View>
          </View>
          <View style={styles.inLine}>
            <View style={[styles.dataItem, { width: "48%" }]}>
              <MaterialIcons name="access-time" size={18} color="forestgreen" />
              <Text style={{ marginTop: 3 }}>{item.data.duration}</Text>
            </View>
            <View style={[styles.dataItem, { width: "48%" }]}>
              <MaterialCommunityIcons
                name={item.data.type === "Run" ? "run" : "dumbbell"}
                size={20}
                color="goldenrod"
              />
              <Text style={{ marginTop: 3 }}>{item.data.type}</Text>
            </View>
          </View>
        </View>
        <Divider />
        <Text style={{ marginVertical: 10, padding: 5, textAlign: "justify" }}>
          {item.data.description}
        </Text>
        <View style={{ paddingHorizontal: 5, paddingVertical: 3 }}>
          <TouchableOpacity onPress={() => (liked ? onUnlike() : onLike())}>
            <MaterialCommunityIcons
              name={liked ? "heart" : "heart-outline"}
              size={20}
              color="red"
            />
          </TouchableOpacity>
          <Text style={{ marginTop: 3 }}>
            {item.data.likes.length}{" "}
            {item.data.likes.length === 1 ? "like" : "likes"}
          </Text>
        </View>
      </View>
    )
  );
};

export default Post;
