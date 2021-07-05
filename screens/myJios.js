import React, { useEffect, useState } from "react";
import { ScrollView, Text } from "react-native";
import firebase from "firebase";
import Post from "../components/jioComponents/Post";

const MyJios = (props) => {
  const uid = firebase.auth().currentUser.uid;
  const [myPosts, setPosts] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("jios")
      .where("user", ">=", uid)
      .where("user", "<=", uid)
      .onSnapshot((snapshot) => {
        let jios = [];
        snapshot.docs.forEach((doc) =>
          jios.push({ id: doc.id, data: doc.data() })
        );
        setPosts(jios);
        console.log(jios);
      });
  }, []);
  return (
    <ScrollView horizontal={false}>
      {/* <FlatList data={posts} keyExtractor={(item) => item.id} renderItem={(item) => <Post item={item} currUser={props.currUser}/>} /> */}
      {myPosts.map(item => <Post navigation={props.navigation} item={item} currUser={props.currUser}/>)}
    </ScrollView>
  );
};

export default MyJios;
