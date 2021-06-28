import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { Divider } from "react-native-elements";
import { connect } from "react-redux";
import Spinner from "../components/Spinner";
import firebase from "firebase";
import { logout } from "../Api/authApi";

const Profile = (props) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [curr, setCurr] = useState(false);
  const [following, setFollow] = useState(false);
  const [followers, setFollowers] = useState([])
  const [numFollowing, setNumFollowing] = useState(0);
  const [numFollowers, setNumFollowers] = useState(0);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      if (props.route.params?.user) {
        const uid = props.route.params?.user.id
        await fetchfollowData(uid)
        setUserId(uid);
        setUser(props.route.params?.user.data);
        setLoading(false);
        if (props.following.indexOf(uid) > -1) {
          setFollow(true);
          console.log("ye");
        } else {
          setFollow(false);
        }
        
      } else {
        setUser(props.currentUser);
        setLoading(false);
        setCurr(true);
        setNumFollowing(props.following.length);
        setNumFollowers(props.followers.length);
        setUserId(firebase.auth().currentUser.uid);

        props.navigation.setOptions({
          headerRight: () => (
            <Text onPress={logout} style={styles.delete}>
              Logout
            </Text>
          ),
        });
      }
    };

    fetchUser();
  }, [
    props.currentUser,
    props.following,
    props.followers,
    props.route.params?.user,
  ]);

  const fetchfollowData = async (uid) => {
    const ref = await firebase.firestore().collection('users').doc(uid)
    await ref.collection('following').onSnapshot(snapshot => {
      let following = []
      snapshot.docs.forEach(doc => {
        following.push(doc.id)
      })
      setNumFollowing(following.length)
    })

    ref.collection('followers').onSnapshot(snapshot => {
      let followers = []
      snapshot.docs.forEach(doc => {
        followers.push(doc.id)
      })
      setNumFollowers(followers.length)
    })
  }

  const follow = async () => {
    const dateFollowed = firebase.firestore.FieldValue.serverTimestamp();
    await firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .collection("following")
      .doc(userId)
      .set({
        dateFollowed,
      });

    firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .collection("followers")
      .doc(firebase.auth().currentUser.uid)
      .set({ dateFollowed });
  };

  const unfollow = async () => {
    await firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .collection("following")
      .doc(userId)
      .delete();

    firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .collection("followers")
      .doc(firebase.auth().currentUser.uid)
      .delete();
  };

  return !loading ? (
    <View style={styles.container}>
      <Image
        source={
          user.photoURL ? { uri: user.photoURL } : require("../assets/user.png")
        }
        style={styles.image}
      />
      <Text style={styles.text}>{user.name}</Text>
      <Text>{curr && user.email}</Text>

      <View style={styles.followers}>
        <Divider orientation="vertical" />
        <View
          style={{
            width: "36%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{fontSize: 16, fontWeight: "bold"}}>{numFollowers}</Text>
          <Text>Followers</Text>
          
        </View>
        <Divider orientation="vertical" />
        <View
          style={{
            width: "36%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{fontSize: 16, fontWeight: "bold"}}>{numFollowing}</Text>
          <Text>Following</Text>
          
        </View>
        <Divider orientation="vertical" />
      </View>

      <Text style={styles.bio}>{user?.bio}</Text>

      {curr && (
        <TouchableOpacity
          style={styles.editButton}
          onPress={() =>
            props.navigation.navigate("Edit Profile", {
              user: user,
            })
          }
        >
          <Text>Edit profile</Text>
        </TouchableOpacity>
      )}

      {!curr && !following && (
        <TouchableOpacity
          style={[styles.editButton, { backgroundColor: "royalblue" }]}
          onPress={() => follow()}
        >
          <Text style={{ color: "whitesmoke" }}>Follow</Text>
        </TouchableOpacity>
      )}

      {!curr && following && (
        <TouchableOpacity
          style={[styles.editButton, { backgroundColor: "silver" }]}
          onPress={() => unfollow()}
        >
          <Text>Unfollow</Text>
        </TouchableOpacity>
      )}
      <View
        style={{
          borderWidth: 1,
          borderColor: "#D3D3D3",
          width: "80%",
          marginVertical: 15,
        }}
      ></View>
    </View>
  ) : (
    <View>
      <Spinner />
    </View>
  );
};

const mapStateToProps = (store) => ({
  currentUser: store.user.currentUser,
  following: store.user.following,
  followers: store.user.followers,
});

export default connect(mapStateToProps, null)(Profile);

const styles = StyleSheet.create({
  delete: {
    color: "red",
    marginRight: 10,
    fontSize: 16,
    alignSelf: "center",
  },

  text: {
    fontSize: 23,
    marginBottom: 5,
  },

  container: {
    flex: 1,
    alignItems: "center",
  },

  image: {
    marginBottom: 25,
    marginTop: 10,
    width: "25%",
    height: "15%",
    alignSelf: "center",
    borderRadius: 120,
    backgroundColor: "#D3D3D3",
    aspectRatio: 1 / 1,
  },

  bio: {
    width: "70%",
    textAlign: "justify",
    marginVertical: 8,
  },

  editButton: {
    marginVertical: 15,
    borderWidth: 1,
    borderColor: "#D3D3D3",
    width: "70%",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 7,
  },

  followers: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    marginVertical: 12
  },
});
