import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import firebase from "firebase";

const JioFeed = (props) => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    firebase
      .firestore()
      .collection("jio")
      .onSnapshot((snapshot) => {
        let jios = [];
        snapshot.docs.forEach((doc) => jios.push(doc.data()));
        setPosts(jios);
      });
  }, []);
  return (
    <View>
      <Text>Jio Feed</Text>
    </View>
  );
};

export default JioFeed;

const styles = StyleSheet.create({});
