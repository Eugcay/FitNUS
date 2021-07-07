import React, { useState, useEffect } from "react";
import { ScrollView, Text } from "react-native";
import Post from "../components/jioComponents/Post";
import { connect } from "react-redux";

const JiosCompleted = (props) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPosts(props.completed);
  }, [props.completed]);

  return (
    <ScrollView horizontal={false}>
      {posts.map((item) => (
        <Post
          navigation={props.navigation}
          item={item}
          currUser={props.currUser}
        />
      ))}
    </ScrollView>
  );
};

const mapStateToProps = (store) => ({
  completed: store.jios.completed,
});

export default connect(mapStateToProps, null)(JiosCompleted);
