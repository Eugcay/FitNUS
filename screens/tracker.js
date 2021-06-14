import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import ProfilePicture from "../components/trackerComponents/profilePicture";
//import MenuButton from "../components/trackerComponents/menuButton";
import Greeting from "../components/trackerComponents/greeting";
import DayPicker from "../components/trackerComponents/dayPicker";
import StatBar from "../components/trackerComponents/statBar";
import Donut from "../components/Donut";
import { connect } from "react-redux";
import { SET_USER } from "../store/actions/types";

const Tracker = (props) => {
  const [user, setUser] = useState(null);
  const [total, setTotal] = useState({});
  const [weekly, setWeekly] = useState({});
  const [monthly, setMonthly] = useState({});
  const [goals, setGoals] = useState({});

  useEffect(() => {
    const getStats = (arr) =>
      arr.reduce(
        (x, y) => ({
          calories: x.calories + y.calories,
          duration: x.duration + y.duration,
        }),
        {
          calories: 0,
          duration: 0,
        }
      );

    const today = new Date();

    const tot = getStats(props.history);
    const week = getStats(
      props.history.filter(
        (doc) => Date.now() - doc.date.seconds * 1000 < 7 * 24 * 3600 * 1000
      )
    );
    const month = getStats(
      props.history.filter(
        (doc) =>
          today.getMonth() === new Date(doc.date.seconds * 1000).getMonth()
      )
    );

    setUser(props.currentUser);
    setTotal(tot);
    setWeekly(week);
    setMonthly(month);

    setGoals({
      calories: props.currentUser.caloriesGoal,
      duration: props.currentUser.durationGoal,
      distance: props.currentUser.distanceGoal,
      workouts: props.currentUser.workoutGoal,
    });

    console.log(goals);
  }, [props.history, props.currentUser]);

  const calories = {
    val: 1405,
    max: 1300,
    units: "cal",
    color: "gold",
  };

  const time = {
    val: 100,
    max: 200,
    units: "min",
    color: "green",
  };

  const distance = {
    val: 4.8,
    max: 6,
    units: "km",
    color: "tomato",
  };

  const [stats, setStats] = useState(calories);
  const [donut, setDonut] = useState({
    calories: true,
    time: false,
    distance: false,
  });

  return (
    <ScrollView>
      <TouchableOpacity>
        <Image source={user.photoURL ? {uri: user.photoURL} : require("../assets/user.png")} style={styles.dp} />
      </TouchableOpacity>
      <View style={styles.greeting}>
        <Greeting />
      </View>
      {/* <MenuButton /> */}
      <View style={styles.datapicker}>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setStats(calories);
              setDonut({ calories: true, time: false, distance: false });
            }}
          >
            <Text style={styles.text}>Calories</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setStats(time);
              setDonut({ calories: false, time: true, distance: false });
            }}
          >
            <Text style={styles.text}>Time</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setStats(distance);
              setDonut({ calories: false, time: false, distance: true });
            }}
          >
            <Text style={styles.text}>Distance</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.daypicker}>
        <DayPicker />
      </View>
      <View style={styles.statchart}>
        {donut.calories && (
          <Donut
            val={calories.val}
            max={calories.max}
            color={calories.color}
            units={calories.units}
          />
        )}
        {donut.time && (
          <Donut
            val={time.val}
            max={time.max}
            color={time.color}
            units={time.units}
          />
        )}
        {donut.distance && (
          <Donut
            val={distance.val}
            max={distance.max}
            color={distance.color}
            units={distance.units}
          />
        )}
      </View>
      <View style={styles.statbar}>
        <StatBar />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    backgroundColor: "#0B2A59",
    width: "30%",
    height: 45,
    borderRadius: 15,
  },
  text: {
    textAlign: "center",
    paddingTop: 13,
    color: "white",
    fontWeight: "bold",
  },
  greeting: {
    paddingLeft: 20,
    paddingTop: 10,
  },
  datapicker: {
    paddingTop: 10,
  },
  daypicker: {
    paddingTop: 10,
  },
  statchart: {
    paddingTop: 0,
    alignContent: "center",
  },

  statbar: {
    paddingTop: 0,
    alignContent: "center",
    height: 150,
  },

  dp: {
    marginTop: 20,
    width: 70,
    height: 70,
    borderRadius: 100,
    alignSelf: "center",
    backgroundColor: "#D3D3D3",
  },
});

const mapStateToProps = (store) => ({
  history: store.user.history,
  currentUser: store.user.currentUser,
});

export default connect(mapStateToProps, null)(Tracker);

// export default function Tracker({ navigation }) {
//   const [calories, setCalories] = useState(0);
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const getCalories = async () => {
//         await getUserHistory().onSnapshot(snapshot => {
//             const cal = snapshot.data().calories ? snapshot.data().calories : 0
//             setCalories(cal)
//             console.log(calories)
//         })
//         setLoading(false)
//     }

//     getCalories()
//   }, []);

//   return (
//     <View>
//       { loading ? (<Text>Fitness Tracker</Text>) : (<Text>{calories}</Text>)}
//     </View>
//   );
// }
