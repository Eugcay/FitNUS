import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import firebase from "firebase";
import Post from "../components/jioComponents/Post";

import { connect } from "react-redux";
import { ListItem, Avatar } from "react-native-elements";

const MyJios = (props) => {
  const [myPosts, setPosts] = useState([]);

  useEffect(() => {
    setPosts(props.upcoming);
  }, [props.upcoming]);

  return myPosts && myPosts.length > 0 ? (
    <ScrollView horizontal={false}>
      {myPosts.map((item) => (
        <Post
          navigation={props.navigation}
          item={item}
          currUser={props.currUser}
        />
      ))}
    </ScrollView>
  ) : (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 18 }}>No Jios to view</Text>
    </View>
  );
};

const mapStateToProps = (store) => ({
  currUser: store.user.currentUser,
  upcoming: store.jios.upcoming,
});

export default connect(mapStateToProps, null)(MyJios);
