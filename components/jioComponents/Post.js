import React, { useState, useEffect } from "react";
import { Text, Image, View, TouchableOpacity, FlatList } from "react-native";
import firebase from "firebase";
import moment from "moment";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Divider } from "react-native-paper";
import { styles } from "./styles";
import ExListItem from "../detailsComponents/ExListItem";

const Post = ({ navigation, item, currUser }) => {
  const [user, setUser] = useState({});
  const [liked, setLiked] = useState(false);
  const [details, setDetails] = useState(false);
  const [completed, setCompleted] = useState(item.data.completed);
  const currUserId = firebase.auth().currentUser.uid;
  console.log(item.data?.img)

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

  const onLike = () => {
    if (item.data.likes.length >= 8) {
      alert(
        "Sorry! A maximum of 8 people can gather in light of Covid-19 regulations."
      );
    } else {
      firebase
        .firestore()
        .collection("jios")
        .doc(item.id)
        .set({
          ...item.data,
          likes: item.data.likes.concat({
            uid: currUserId,
            name: currUser.name,
            photoURL: currUser.photoURL,
          }),
        });
    }
  };

  const onUnlike = () => {
    const data = [...item.data.likes];
    const index = data.findIndex((usr) => usr.uid === currUserId);
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
    if (item.data.likes.findIndex((usr) => usr.uid === currUserId) > -1) {
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
          <View style={{ width: "75%" }}>
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
              >
                <MaterialIcons name="mode-edit" size={18} colo="darkblue" />
              </TouchableOpacity>
            </>
          )}
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
              {item.data.time && (
                <Text style={{ marginTop: 3 }}>
                  {moment(item.data?.time.toDate()).format(
                    "D MMM YYYY, h:mm a"
                  )}
                </Text>
              )}
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
        <Divider />
        <View
          style={{
            paddingHorizontal: 5,
            paddingVertical: 3,
            marginVertical: 10,
          }}
        >
          {!completed && item.data.user !== currUserId && (
            <TouchableOpacity
              onPress={() => (liked ? onUnlike() : onLike())}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <MaterialCommunityIcons
                name={liked ? "heart" : "heart-outline"}
                size={20}
                color="red"
              />
              <Text
                style={{ marginHorizontal: 3, color: liked ? "red" : "black" }}
              >
                {!liked ? "Join" : "Leave"}
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Likes", {
                likes: item.data.likes,
                currUserId,
                postID:
                  item.data.user === currUserId && item.id,
              })
            }
          >
            <Text
              style={{ marginTop: 3, textShadowRadius: 2, color: "darkblue" }}
            >
              {item.data.likes.length}{" "}
              {item.data.likes.length === 1 ? "person " : "people "}
              {completed ? "joined" : "going"}
            </Text>
          </TouchableOpacity>
        </View>

        <Divider />
        <TouchableOpacity
          onPress={() => setDetails(!details)}
          style={styles.inLine}
        >
          <Text style={{ justifyContent: "flex-end" }}>Details</Text>
          <MaterialCommunityIcons name="menu-down" size={18} />
        </TouchableOpacity>

        {details && item.data.type !== "Run" && (
          <FlatList
            data={item.data.details}
            keyExtractor={(item) => item.id}
            renderItem={ExListItem}
            scrollEnabled={false}
          />
        )}
        {details && item.data.type === 'Run' && (
          <Text style={{ marginVertical: 10, padding: 5, textAlign: "justify" }}>{item.data.details}</Text> 
        )}
      </View>
    )
  );
};

export default Post;
