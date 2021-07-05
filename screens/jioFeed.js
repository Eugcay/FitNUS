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
        const jiosFollowing = jios.filter(jio => props.following.includes(jio.user))
        setPosts(jiosFollowing);
        console.log(jiosFollowing)
      });
  }, []);

  
  return (posts && posts.length !== 0 ) ? (
    <ScrollView horizontal={false}>
      {/* <FlatList data={posts} keyExtractor={(item) => item.id} renderItem={(item) => <Post item={item} currUser={props.currUser}/>} /> */}
      {posts.map(item => <Post navigation={props.navigation} item={item} currUser={props.currUser}/>)}
    </ScrollView>
  ) : (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{fontSize: 18}}>No Jios to view</Text>
    </View>
  )
};

const mapStateToProps = (store) => ({
  currUser: store.user.currentUser,
  following: store.user.following
})

export default connect(mapStateToProps, null)(JioFeed);


