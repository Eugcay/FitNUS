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
import Greeting from "../components/trackerComponents/greeting";
import Donut from "../components/Donut";
import { Divider } from "react-native-elements";
import { connect } from "react-redux";
import {
  getCurrMonth,
  getCurrWeek,
  getStats,
  changeMonth,
  changeWeek,
  reloadPeriod,
  favExercises,
} from "../helpers";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import moment from "moment";
import Spinner from "../components/Spinner";
import MuscleCategoryPie from "../components/trackerComponents/MuscleCategoryPie";
import PieLegend from "../components/trackerComponents/MuscleCategoryLegend";
import { Favourites } from "../components/trackerComponents/Favourites";
import { BarChart, Grid, PieChart } from "react-native-svg-charts";

const Tracker = (props) => {
  const [user, setUser] = useState(null);
  const [month, setMonth] = useState(getCurrMonth());
  const [week, setWeek] = useState(getCurrWeek());
  const [total, setTotal] = useState(null);
  const [weekly, setWeekly] = useState(null);
  const [monthly, setMonthly] = useState(null);
  const [goals, setGoals] = useState({});
  const [statsType, setType] = useState("weekly");
  const [period, setPeriod] = useState(weekly);
  const [favs, setFavs] = useState([]);

  useEffect(() => {
    const tot = props.history
      ? getStats(props.history.map((doc) => doc.data))
      : null;
    const w = props.history ? reloadPeriod(week, props.history) : null;
    const m = props.history ? reloadPeriod(month, props.history) : null;
    const favourites = favExercises(props.history.map((doc) => doc.data));

    setUser(props.currentUser);
    setTotal(tot);
    setWeekly(w);
    setMonthly(m);
    setFavs(favourites);
    setGoals({
      calories: props.currentUser.calGoal,
      duration: props.currentUser.durationGoal,
      distance: props.currentUser.distanceGoal,
      workouts: props.currentUser.workoutGoal,
    });
  }, [props.history, props.currentUser, week, month]);

  const toggleStats = (direction) => {
    if (statsType === "weekly") {
      if (
        new Date().getMonth() >= week.start.getMonth() - 1 &&
        new Date().getMonth() <= week.start.getMonth() + 1
      ) {
        setWeek(changeWeek(week, direction));
        setPeriod(weekly);
      }
    } else {
      setMonth(changeMonth(month, direction));
      setPeriod(monthly);
    }
  };

  const dats = [50, 10, 40, 95, 85];

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
              setPeriod(weekly);
            }}
          >
            <Text style={styles.text}>Weekly</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType("monthly");
              setPeriod(monthly);
            }}
          >
            <Text style={styles.text}>Monthly</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType("total");
              setPeriod(total);
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
      {statsType !== "total" && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity onPress={() => toggleStats("back")}>
            <MaterialCommunityIcons
              name="chevron-left"
              size={20}
              color="gray"
            />
          </TouchableOpacity>
          <Text style={{ fontSize: 20, marginHorizontal: 10 }}>
            {statsType === "weekly"
              ? `${moment(week.start).format("DD MMM")} - ${moment(
                  week.end
                ).format("DD MMM")}`
              : moment(month.start).format("MMMM YY")}
          </Text>
          <TouchableOpacity onPress={() => toggleStats("next")}>
            <MaterialCommunityIcons
              name="chevron-right"
              size={20}
              color="gray"
            />
          </TouchableOpacity>
        </View>
      )}
      {period ? (
        <View style={styles.statContainer}>
          <Text style={styles.statsTitle}>General Stats</Text>
          <View
            style={{ flexDirection: "row", height: 200, paddingVertical: 16 }}
          >
            {period ? (
              <BarChart
                style={{ flex: 1, marginLeft: 8 }}
                data={dats}
                svg={{ fill: "rgba(134, 65, 244, 0.8)" }}
                contentInset={{ top: 10, bottom: 10 }}
                spacing={0.2}
                gridMin={0}
              >
                <Grid direction={Grid.Direction.HORIZONTAL} />
              </BarChart>
            ) : (
              <Spinner />
            )}
          </View>
          {statsType === "total" && <Favourites favs={favs} />}
          <View style={{ backgroundColor: "white", borderRadius: 10, flex: 1 }}>
            <View style={{ padding: 10 }}>
              <Text>Workouts</Text>
              <Text>{period.workouts}</Text>
            </View>
            <Divider />
            <View style={{ padding: 10 }}>
              <View>
                <Text>Total Duration</Text>
                <Text>{(period.duration / 60).toFixed(1)} hrs</Text>
              </View>
            </View>
            <View style={{ padding: 10 }}>
              <View>
                <Text>Average Workout Duration</Text>
                <Text>
                  {period.workouts === 0
                    ? 0
                    : Math.round(period.duration / period.workouts)}{" "}
                  min
                </Text>
              </View>
            </View>
            <View style={{ padding: 10 }}>
              <View>
                <Text>Sets completed</Text>
                <Text>{period.sets} </Text>
              </View>
            </View>
            <View style={{ padding: 10 }}>
              <View>
                <Text>Distance Run</Text>
                <Text>{period.distance} km</Text>
              </View>
            </View>
          </View>
          {period && (
            <View
              style={{
                backgroundColor: "white",
                marginHorizontal: 5,
                marginVertical: 15,
              }}
            >
              <Text style={{ padding: 10, fontSize: 16, fontWeight: "bold" }}>
                Muscles Used
              </Text>
              <MuscleCategoryPie data={period.categories} max={period.sets} />
              <PieLegend data={period.categories} />
            </View>
          )}
        </View>
      ) : (
        <Spinner />
      )}
      <View style={styles.statContainer}>
        <Text style={styles.statsTitle}>Run Stats</Text>
        <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }}>
          <View style={styles.runStat}>
            <Text>Average Pace</Text>
            <Text>0</Text>
          </View>
          <View style={styles.runStat}>
            <Text>Runs</Text>
            <Text>0</Text>
          </View>
          <View style={styles.runStat}>
            <Text>Distance Per Run</Text>
            <Text>0</Text>
          </View>
          <View style={styles.runStat}>
            <Text>Longest Run</Text>
            <Text>0</Text>
          </View>
        </View>
      </View>
      {/* <View style={styles.statchart}>
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
      </View> */}
      <View></View>
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

  statsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  individualStats: {
    flexDirection: "row",
    padding: 10,
  },

  statContainer: {
    marginHorizontal: 20,
    marginVertical: 10,
  },

  runStat: {
    width: "48%",
    alignItems: "center",
    padding: 10,
    backgroundColor: "white",
    margin: 3,
  },
});

const mapStateToProps = (store) => ({
  history: store.user.history,
  currentUser: store.user.currentUser,
});

export default connect(mapStateToProps, null)(Tracker);
