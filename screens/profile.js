import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { connect } from "react-redux";

const Profile = (props) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {


    setUser(props.currentUser)
    setLoading(false)

    console.log(user)
  }, [props.currentUser]);

  return (
    <View style={styles.container}>
      <Image source={! loading && user.photoURL ? {uri: user.photoURL} : require("../assets/user.png")} style={styles.image} />
      <Text style={styles.text}>{!loading && user.name}</Text>
      <Text>{!loading && user.email}</Text>
      

      {!loading && (<TouchableOpacity
        style={styles.editButton}
        onPress={() => props.navigation.navigate("Edit Profile", {
            user: user
        })}
      >
        <Text>Edit profile</Text>
      </TouchableOpacity>)}
      <Text style={styles.bio}>{!loading && user?.bio}</Text>
      <View style={{borderWidth: 1, borderColor: "#D3D3D3", width:'80%', marginVertical:15}}></View>
    </View>
    
  );
};


const mapStateToProps = (store) => ({
  currentUser: store.user.currentUser
})


export default connect(mapStateToProps, null)(Profile)

const styles = StyleSheet.create({
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
  },

  bio: {
    width: '80%',
    textAlign: 'justify',
    marginTop: 10
  },

  editButton: {
    marginVertical: 15,
    borderWidth: 1,
    borderColor: "#D3D3D3",
    width: "40%",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 7,
  },
});
