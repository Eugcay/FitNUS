import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { WeekCalendar, Calendar, Agenda } from "react-native-calendars";
import Dropdown from "react-native-material-dropdown/src/components/dropdown";
import Greeting from "../components/trackerComponents/greeting";
import Donut from "../components/Donut";
import { connect } from "react-redux";
import {
  getCurrMonth,
  getCurrWeek,
  getStats,
  changeMonth,
  changeWeek,
} from "../helpers";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import moment from "moment";

const Tracker = (props) => {
  const [user, setUser] = useState(null);
  const [month, setMonth] = useState(getCurrMonth());
  const [week, setWeek] = useState(getCurrWeek());
  const [total, setTotal] = useState({});
  const [weekly, setWeekly] = useState({});
  const [monthly, setMonthly] = useState({});
  const [goals, setGoals] = useState({});

  useEffect(() => {
    const hist = props.history;
    const tot = props.stats;
    const w = getStats(
      hist
        .map((doc) => doc.data)
        .filter(
          (doc) =>
            doc.date.seconds * 1000 <= Date.parse(week.end) &&
            doc.date.seconds * 1000 >= Date.parse(week.start)
        )
    );
    const m = getStats(
      hist
        .map((doc) => doc.data)
        .filter(
          (doc) =>
            doc.date.seconds * 1000 <= Date.parse(month.end) &&
            doc.date.seconds * 1000 >= Date.parse(month.start)
        )
    );

    setUser(props.currentUser);
    setTotal(tot);
    setWeekly(w);
    setMonthly(m);

    setGoals({
      calories: props.currentUser.calGoal,
      duration: props.currentUser.durationGoal,
      distance: props.currentUser.distanceGoal,
      workouts: props.currentUser.workoutGoal,
    });

    console.log(m);
  }, [props.history, props.currentUser, props.stats]);

  const toggleStats = (direction) => {
    if (statsType === 'weekly') {
      if (new Date().getMonth() >= week.start.getMonth() - 1 && new Date().getMonth() <= week.start.getMonth() + 1 )
      setWeek(changeWeek(week, direction))
    } else {
      setMonth(changeMonth(month, direction))
    }
  }

  const calories = {
    val: 1405,
    max: goals.calories,
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

  const workoutsPerWeek = {
    val: 2,
    max: 3,
    units: "",
    color: "midnightblue",
  };

  const data = [
    { value: "calories" },
    { value: "time" },
    { value: "distance" },
    { value: "workouts" },
  ];

  const [statsType, setType] = useState("weekly");
  const [donut, setDonut] = useState("calories");

  return (
    <ScrollView>
      <TouchableOpacity>
        <Image
          source={
            user?.photoURL
              ? { uri: user?.photoURL }
              : require("../assets/user.png")
          }
          style={styles.dp}
        />
      </TouchableOpacity>
      <View style={styles.greeting}>
        <Greeting user={user} />
      </View>
      {/* <MenuButton /> */}
      <View style={styles.datapicker}>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType("weekly");
            }}
          >
            <Text style={styles.text}>Weekly</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType("monthly");
            }}
          >
            <Text style={styles.text}>Monthly</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType("overall");
            }}
          >
            <Text style={styles.text}>Overall</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* <View style={styles.daypicker}>
        {statsType === "weekly" && <WeekCalendar onDayPress={day => console.log(day)}/>}
        {statsType === "monthly" && <Calendar  onMonthChange={(month) => console.log(month)} />}
      </View> */}
      <View style={styles.dropdown}>
        {/* <Dropdown
          value={donut}
          label="select"
          data={data}
          onChangeText={(value) => setDonut(value)}
        /> */}
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
        <TouchableOpacity onPress={() => toggleStats('back')}>
          <MaterialCommunityIcons name="chevron-left" size={20} color="gray" />
        </TouchableOpacity>
        <Text style={{fontSize: 20, marginHorizontal: 10}}>{statsType === 'weekly' ? `${moment(week.start).format('DD MMM')} - ${moment(week.end).format('DD MMM')}` : moment(month.start).format("MMMM YY")}</Text>
        <TouchableOpacity onPress={() => toggleStats('next')}>
          <MaterialCommunityIcons name="chevron-right" size={20} color="gray" />
        </TouchableOpacity>
      </View>
      <View style={styles.statchart}>
        {donut === "calories" && (
          <Donut
            val={calories.val}
            max={calories.max}
            color={calories.color}
            units={calories.units}
          />
        )}
        {donut === "time" && (
          <Donut
            val={time.val}
            max={time.max}
            color={time.color}
            units={time.units}
          />
        )}
        {donut === "distance" && (
          <Donut
            val={distance.val}
            max={distance.max}
            color={distance.color}
            units={distance.units}
          />
        )}
        {donut === "workouts" && (
          <Donut
            val={workoutsPerWeek.val}
            max={workoutsPerWeek.max}
            color={workoutsPerWeek.color}
            units={workoutsPerWeek.units}
          />
        )}
      </View>
      <View style={styles.statbar}>{/* <StatBar /> */}</View>
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
    borderRadius: 20,
    marginVertical: 10,
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
    marginHorizontal: 10,
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

  dropdown: {
    width: "20%",
    marginHorizontal: 15,
  },
});

const mapStateToProps = (store) => ({
  history: store.user.history,
  currentUser: store.user.currentUser,
  stats: store.stats.statistics,
});

// const mapDispatchToProps = (dispatch) => ({
//   statsBetween: (start, end, period) =>
//     dispatch(getStatsByPeriod(start, end, period)),
// });

export default connect(mapStateToProps, null)(Tracker);
