import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { Divider } from "react-native-elements";
import { connect } from "react-redux";
import Spinner from "../../components/Spinner";
import firebase from "firebase";
import { logout } from "../../Api/authApi";
import { AntDesign } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from "./styles";

//Achivement imports
import {
  getCurrWeek,
  reloadPeriod,
  getRunStats,
  getStats,
  reloadRunPeriod,
} from "../../helpers/profile";
import { returnAccruedTemp, returnSingleTemp } from "./achievements";
import { addToAccruedAchievements, updateAccruedAchievements } from "../../store/actions/user"; 

const Profile = (props) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [curr, setCurr] = useState(false);
  const [following, setFollow] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [numFollowing, setNumFollowing] = useState(0);
  const [numFollowers, setNumFollowers] = useState(0);
  const [userId, setUserId] = useState("");
  //Achivements state
  const [thisWeek, setWeek] = useState(getCurrWeek());
  const [runWeek, setRunWeek] = useState(null);
  const [workoutWeek, setWorkoutWeek] = useState(null);
  const [overallRun, setOverallRun] = useState(null);
  const [overallWorkout, setOverallWorkout] = useState(null);

  //Achievements stuff
  useEffect(() => {
    //getWeek first -> Done in intial state alr

    //Fetch run, workout stats -> Overall and week.
    //Overall
    const overallRun = props.runs
      ? getRunStats(props.runs.map((doc) => doc.data))
      : null;
    setOverallRun(overallRun); //return object{distance duration, longest, no.}

    const overallWorkout =
      props.history && getStats(props.history.map((doc) => doc.data));
    setOverallWorkout(overallWorkout); //returns object{duration, sets, no.}
    //Week
    const runWeek = props.runs ? reloadRunPeriod(thisWeek, props.runs) : null;
    setRunWeek(runWeek);

    const workoutWeek = props.history
      ? reloadPeriod(thisWeek, props.history)
      : null;
    setWorkoutWeek(workoutWeek);

    //Check if workout stats meet criteria -> week - accrued
    const accruedList = returnAccruedTemp(
      props.currentUser.distanceGoal,
      props.currentUser.durationGoal,
      runWeek,
      workoutWeek
    );

    //Update accruedAchivements in database
    if (props.accruedAchievements.length === 0) {
      console.log(props.accruedAchievements)
      accruedList.forEach((temp) => {
        const tempAch = {
          title: temp.title,
          id: temp.id,
          description: temp.description,
          category: temp.cat,
          periodList: [thisWeek]
        }
        props.addToAccrued(tempAch);
      })
    } else {
      accruedList.forEach((temp) => {
        props.accruedAchievements.forEach((saved) => {
          if (temp.id === saved.data.id) {
            if (saved.data.periodList.includes(thisWeek)) {
              //continue;
            } else {
              //add thisWeek to saved periodList
              //update saved
              const updated = {
                id: saved.id,
                data: {
                  ...saved.data,
                  periodList: saved.data.periodList.push(thisWeek)
                }
              }
              props.updateAccrued(updated)
            }
          }
        })
      })
    }

    //check if workout stats meet criteria -> overall - accrued
    const singleList = returnSingleTemp(
      overallRun,
      overallWorkout
    )

    //Update singleAchivements in database
    
    
  }, [props.currentUser, props.runs, props.history]);

  useEffect(() => {
    const fetchUser = async () => {
      if (props.route.params?.user) {
        const uid = props.route.params?.user.id;
        await fetchfollowData(uid);
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
    const ref = await firebase.firestore().collection("users").doc(uid);
    await ref.collection("following").onSnapshot((snapshot) => {
      let following = [];
      snapshot.docs.forEach((doc) => {
        following.push(doc.id);
      });
      setNumFollowing(following.length);
    });

    ref.collection("followers").onSnapshot((snapshot) => {
      let followers = [];
      snapshot.docs.forEach((doc) => {
        followers.push(doc.id);
      });
      setNumFollowers(followers.length);
    });
  };

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
    <ScrollView>
      <View style={styles.container}>
        <Image
          source={
            user.photoURL
              ? { uri: user.photoURL }
              : require("../../assets/user.png")
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
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              {numFollowers}
            </Text>
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
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              {numFollowing}
            </Text>
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
                user,
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
        <View style={styles.divider}></View>
        <View style={styles.achievementMaster}>
          <TouchableOpacity style={styles.achievementBox}>
            <View style={{ justifyContent: "center", paddingLeft: 10 }}>
              <Text style={styles.achievementTitle}>Master Jioer!</Text>
              <Text style={styles.achievementDescription}>
                Jioed 5 people to exercise with you! Wah, popular sia!
              </Text>
            </View>
            <View style={{ justifyContent: "center", right: 30 }}>
              <AntDesign name="team" size={24} color="black" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.achievementBox}>
            <View style={{ justifyContent: "center", paddingLeft: 10 }}>
              <Text style={styles.achievementTitle}>Loyal Jioee!</Text>
              <Text style={styles.achievementDescription}>Joined 5 jios!</Text>
            </View>
            <View style={{ justifyContent: "center", left: 170 }}>
              <AntDesign name="team" size={24} color="black" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.achievementBox}>
            <View style={{ justifyContent: "center", paddingLeft: 10 }}>
              <Text style={styles.achievementTitle}>ON FIRE</Text>
              <Text style={styles.achievementDescription}>
                One workout everyday for a week! Damn you're on fire
              </Text>
            </View>
            <View style={{ justifyContent: "center", right: 30 }}>
              <SimpleLineIcons name="fire" size={24} color="black" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.achievementBox}>
            <View style={{ justifyContent: "center", paddingLeft: 10 }}>
              <Text style={styles.achievementTitle}>Meep Meep</Text>
              <Text style={styles.achievementDescription}>
                Ran more than 20% the speed of a roadrunner!
              </Text>
            </View>
            <View style={{ justifyContent: "center", right: -8 }}>
              <MaterialCommunityIcons name="run-fast" size={24} color="black" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.achievementBox}>
            <View style={{ justifyContent: "center", paddingLeft: 10 }}>
              <Text style={styles.achievementTitle}>Pulling your weight</Text>
              <Text style={styles.achievementDescription}>
                Deadlifted more than your own body weight!
              </Text>
            </View>
            <View style={{ justifyContent: "center", left: 20 }}>
              <MaterialCommunityIcons
                name="weight-lifter"
                size={24}
                color="black"
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.achievementBox}>
            <View style={{ justifyContent: "center", paddingLeft: 10 }}>
              <Text style={styles.achievementTitle}>Potty training</Text>
              <Text style={styles.achievementDescription}>
                Squat more than your own body weight
              </Text>
            </View>
            <View style={{ justifyContent: "center", left: 45 }}>
              <MaterialCommunityIcons
                name="weight-lifter"
                size={24}
                color="black"
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
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
  history: store.history.workouts,
  runs: store.history.runs,
  accruedAchievements: store.user.accruedAchievements
});

const mapDispatchToProps = (dispatch) => ({
  addToAccrued: (accrued) => dispatch(addToAccruedAchievements(accrued)),
  updateAccrued: (accrued) => dispatch(updateAccruedAchievements(accrued)),
  //addToSingle: (single) => dispatch(addToSingleAchievements(single))
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
