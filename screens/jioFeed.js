import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, ScrollView } from "react-native";
import Post from "../components/jioComponents/Post";
import firebase from "firebase";
import { connect } from "react-redux";

const JioFeed = (props) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("jios")
      .onSnapshot((snapshot) => {
        let jios = [];
        snapshot.docs.forEach((doc) => jios.push({id: doc.id, data: doc.data()}));
        setPosts(jios);
        console.log(jios)
      });
  }, []);

  
  return (
    <ScrollView horizontal={false}>
      {/* <FlatList data={posts} keyExtractor={(item) => item.id} renderItem={(item) => <Post item={item} currUser={props.currUser}/>} /> */}
      {posts.map(item => <Post navigation={props.navigation} item={item} currUser={props.currUser}/>)}
    </ScrollView>
  );
};

const mapStateToProps = (store) => ({
  currUser: store.user.currentUser
})

export default connect(mapStateToProps, null)(JioFeed);


