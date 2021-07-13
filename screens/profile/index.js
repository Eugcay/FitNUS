import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  SectionList,
} from "react-native";
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
import {
  addToAccruedAchievements,
  updateAccruedAchievements,
  addToSingleAchievements,
} from "../../store/actions/user";
import achListItem from "../../components/achievementsComponents/achListItem";


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
  const [combinedList, setCombinedList] = useState(null);

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
      props.currentUser?.distanceGoal,
      props.currentUser?.durationGoal,
      runWeek,
      workoutWeek
    );

    //Update accruedAchivements in database
    if (props.accruedAchievements?.length === 0) {
      accruedList.forEach((temp) => {
        const tempAch = {
          title: temp.title,
          id: temp.id,
          description: temp.description,
          category: temp.cat,
          periodList: [thisWeek],
        };
        props.addToAccrued(tempAch);
      });
    } else {
      accruedList.forEach((temp) => {
        props.accruedAchievements.forEach((saved) => {
          if (temp.id === saved.data.id) {
            if (saved.data.periodList.includes(thisWeek)) {
              //continue;
            } else {
              //add thisWeek to saved periodList
              //update saved
              // const updated = {
              //     ...saved,
              //     periodList: saved.data.periodList.push(thisWeek), //need to change this to justtake data no time.
              // };
              // props.updateAccrued(updated);
            }
          }
        });
      });
    }

    //check if workout stats meet criteria -> overall - accrued
    const singleList = returnSingleTemp(overallRun, overallWorkout);

    //Update singleAchivements in database
    if (props.singleAchievements?.length === 0) {
      singleList.forEach((temp) => {
        const tempAch = {
          title: temp.title,
          id: temp.id,
          description: temp.description,
          category: temp.cat,
        };
        props.addToSingle(tempAch);
      });
    } else {
      singleList.forEach((temp) => {
        props.singleAchievements.forEach((saved) => {
          if (temp.id === saved.data.id) {
            //continue
          } else {
            //this logic is flawed, will fix later...
            // const tempAch = {
            //   title: temp.title,
            //   id: temp.id,
            //   description: temp.description,
            //   category: temp.cat,
            // };
            // props.addToSingle(tempAch);
          }
        });
      });
    }

    setCombinedList([
      {
        title: "Stacked Achivements",
        data: props.accruedAchievements,
      },
      {
        title: "Milestones",
        data: props.singleAchievements,
      },
    ]);
  }, [
    props.runs,
    props.history,
    props.singleAchievements,
    props.accruedAchievements
  ]);

  useEffect(() => {
    const fetchUser = async () => {
      if (props.route.params?.user) {
        const uid = props.route.params?.user.id;
        await fetchfollowData(uid);
        setCurr(uid === firebase.auth().currentUser.uid);
        setUserId(uid);
        setUser(props.route.params?.user.data);
        setLoading(false);
        if (props.following.indexOf(uid) > -1) {
          setFollow(true);
        } else {
          setFollow(false);
        }
      } else {
        setUser(props.currentUser);

        setCurr(true);
        setNumFollowing(props.following.length);
        setNumFollowers(props.followers.length);
        setUserId(firebase.auth().currentUser.uid);

        setLoading(false);

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
    ref.collection("following").onSnapshot((snapshot) => {
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

  return user ? (
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
          <SectionList
            sections={combinedList}
            keyExtractor={(item, index) => item + index}
            renderItem={achListItem}
            renderSectionHeader={({ section: { title } }) => (
              <Text style={{fontSize: 22, fontWeight: 'bold', padding: 10}}>{title}:</Text>
            )}
          />
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
  accruedAchievements: store.user.accruedAchievements,
  singleAchievements: store.user.singleAchievements,
});

const mapDispatchToProps = (dispatch) => ({
  addToAccrued: (accrued) => dispatch(addToAccruedAchievements(accrued)),
  updateAccrued: (accrued) => dispatch(updateAccruedAchievements(accrued)),
  addToSingle: (single) => dispatch(addToSingleAchievements(single)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
