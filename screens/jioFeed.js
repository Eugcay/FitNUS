import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, ScrollView } from "react-native";
import Post from "../components/jioComponents/Post";
import firebase from "firebase";
import { connect } from "react-redux";

const JioFeed = (props) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPosts(props.feed)
  }, [props.feed]);

  
  return (posts && posts.length !== 0 ) ? (
    <ScrollView horizontal={false}>
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
  following: store.user.following,
  feed: store.jios.feed
})

export default connect(mapStateToProps, null)(JioFeed);


