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
import Greeting from "../../components/trackerComponents/greeting";
import { Divider } from "react-native-elements";
import { connect } from "react-redux";
import { updateUser } from "../../store/actions/user";
import {
  getCurrMonth,
  getCurrWeek,
  getStats,
  changeMonth,
  changeWeek,
  reloadPeriod,
  favExercises,
  yearlyData,
  monthlyData,
  getRunStats,
  reloadRunPeriod
} from "../../helpers/tracker";
import { concatWithoutDupe } from "../../helpers";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import moment from "moment";
import Spinner from "../../components/Spinner";
import MuscleCategoryPie from "../../components/trackerComponents/MuscleCategoryPie";
import PieLegend from "../../components/trackerComponents/MuscleCategoryLegend";
import ExStats from "../../components/trackerComponents/ExStats";
import { FrequencyBarChart } from "../../components/trackerComponents/FrequencyBarChart";
import { Favourites } from "../../components/trackerComponents/Favourites";
import { styles } from "./styles";

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
  const [exercises, setExercises] = useState([]);
  const [totalRun, setRunTotal] = useState(null);
  const [weeklyRun, setRunWeekly] = useState(null);
  const [monthlyRun, setRunMonthly] = useState(null);
  const [periodRun, setRunPeriod] = useState(weeklyRun);


  useEffect(() => {
    ///////////Runs
    const totRun = props.runs
      ? getRunStats(props.runs.map((doc) => doc.data))
      : null;
    const runsPerMonth = props.runs
      ? yearlyData(props.runs.map((doc) => doc.data))
      : null;
    const mR = props.runs ? reloadRunPeriod(month, props.runs) : null;
    const runsPerWeek = props.runs
      ? monthlyData(
          props.runs.map((doc) => doc.data),
          month
        )
      : null;
    const wR = props.runs ? reloadRunPeriod(week, props.runs) : null;
    /////Workouts
    const tot = props.history
      ? getStats(props.history.map((doc) => doc.data))
      : null;
    const workoutsPerMonth = props.history
      ? yearlyData(props.history.map((doc) => doc.data))
      : null;
    const m = props.history ? reloadPeriod(month, props.history) : null;
    const workoutsPerWeek = props.history
      ? monthlyData(
          props.history.map((doc) => doc.data),
          month
        )
      : null;
    const w = props.history ? reloadPeriod(week, props.history) : null;
    
    ///////Favs - Overall
    const favourites = favExercises(props.history.map((doc) => doc.data));
    setFavs(favourites);
    //////User data
    setUser(props.currentUser);
    ///////Tracked exercises with the graph and stats
    setExercises(props.currentUser?.tracked ? props.currentUser?.tracked : []);
    ////////Goals
    setGoals({
      duration: props.currentUser.durationGoal,
      distance: props.currentUser.distanceGoal,
      workouts: props.currentUser.workoutGoal,
      runs: props.currentUser.runGoal,
    });
    /////////Workout sets
    setTotal({
      ...tot,
      workoutFreq: workoutsPerMonth,
    });
    setMonthly({
      ...m,
      workoutFreq: workoutsPerWeek,
    });
    setWeekly(w);
    ///////////Run sets
    setRunTotal({
      ...totRun,
      workoutFreq: runsPerMonth,
    });
    setRunMonthly({
      ...mR,
      workoutFreq: runsPerWeek,
    });
    setRunWeekly(wR);
    ///////////WorkoutPeriod
    const getPeriod = () => {
      switch (statsType) {
        case "weekly":
          return w;
        case "monthly":
          return {
            ...m,
            workoutFreq: workoutsPerWeek,
          };
        case "total":
          return {
            ...tot,
            workoutFreq: workoutsPerMonth,
          };
        default:
          return m;
      }
    };
    setPeriod(getPeriod());
    ///////////////RunPeriod
    const getRunPeriod = () => {
      switch (statsType) {
        case "weekly":
          return wR;
        case "monthly":
          return {
            ...mR,
            workoutFreq: runsPerWeek,
          };
        case "total":
          return {
            ...totRun,
            workoutFreq: runsPerMonth,
          };
        default:
          return mR;
      }
    };
    setRunPeriod(getRunPeriod());
  }, [props.history, props.currentUser, week, month, statsType, props.runs]);

  useEffect(() => {
    const ex = props.route.params?.exercises;
    if (ex) {
      setExercises(concatWithoutDupe(exercises, ex));
      props.updateTracker({
        ...props.currentUser,
        tracked: concatWithoutDupe(exercises, ex),
      });
    } else {
      console.log("no data");
    }
  }, [props.route.params?.exercises]);

  const toggleStats = (direction) => {
    if (statsType === "weekly") {
      if (
        (new Date().getMonth() >= week.start.getMonth() - 1 ||
          direction === "back") &&
        (new Date().getMonth() <= week.start.getMonth() + 1 ||
          direction === "next")
      ) {
        setWeek(changeWeek(week, direction));
        setType("weekly");
      }
    } else {
      setMonth(changeMonth(month, direction));
      setType("monthly");
    }
  };

  const deleteEx = (ex) => {
    const dat = [...exercises];
    dat.splice(exercises.indexOf(ex), 1);
    props.updateTracker({ ...props.currentUser, tracked: dat });
  };

  return (
    <ScrollView>
      <TouchableOpacity>
        <Image
          source={
            user?.photoURL
              ? { uri: user?.photoURL }
              : require("../../assets/user.png")
          }
          style={styles.dp}
        />
      </TouchableOpacity>
      <View style={styles.greeting}>
        <Greeting user={user} />
      </View>
      <View style={styles.datapicker}>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType("weekly");
              setPeriod(weekly);
              setRunPeriod(weeklyRun);
            }}
          >
            <Text style={styles.text}>Weekly</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType("monthly");
              setPeriod(monthly);
              setRunPeriod(monthlyRun);
            }}
          >
            <Text style={styles.text}>Monthly</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType("total");
              setPeriod(total);
              setRunPeriod(totalRun);
            }}
          >
            <Text style={styles.text}>Overall</Text>
          </TouchableOpacity>
        </View>
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
          <View style={{ flexDirection: "row", marginBottom: 15 }}>
            {statsType === "weekly" && (
              <WeekCalendar
                minDate={moment(week.start).format("YYYY-MM-DD")}
                maxDate={moment(week.end).format("YYYY-MM-DD")}
              />
            )}
            {!period && <Spinner />}
            {statsType !== "weekly" && period && (
              <FrequencyBarChart
                type={statsType}
                data={period?.workoutFreq}
                goal={goals.workouts}
              />
            )}
          </View>
          {statsType === "total" && (
            <Favourites favs={favs} pb={props.currentUser.pb} />
          )}
          <View style={{ backgroundColor: "white", borderRadius: 10, flex: 1 }}>
            <View style={{ padding: 10 }}>
              <Text>Workouts</Text>
              <Text>{period.workouts}</Text>
            </View>
            <Divider />
            <View style={{ padding: 10 }}>
              <View>
                <Text>Total Duration</Text>
                <Text>{(period.duration / 3600).toFixed(1)} hrs</Text>
              </View>
            </View>
            <View style={{ padding: 10 }}>
              <View>
                <Text>Average Workout Duration</Text>
                <Text>
                  {period.workouts === 0
                    ? 0
                    : Math.round(period.duration / (60 * period.workouts)) +
                      ":" +
                      Math.round((period.duration / period.workouts) % 60)}{" "}
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
                <Text>Distance Ran</Text>
                <Text>{(periodRun.distance).toFixed(2)} km</Text>
              </View>
            </View>
          </View>

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
        </View>
      ) : (
        <Spinner />
      )}
      <View style={styles.statContainer}>
        <Text style={styles.statsTitle}>Run Stats</Text>
        <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }}>
          <View style={styles.runStat}>
            <Text>Average Pace</Text>
            <Text>{((periodRun.duration / 60) / periodRun.distance).toFixed(2)} min/Km</Text>
          </View>
          <View style={styles.runStat}>
            <Text>Runs</Text>
            <Text>{periodRun.runs}</Text>
          </View>
          <View style={styles.runStat}>
            <Text>Distance Per Run</Text>
            <Text>{(periodRun.distance / periodRun.runs).toFixed(2)} Km</Text>
          </View>
          <View style={styles.runStat}>
            <Text>Longest Run</Text>
            <Text>{(periodRun.longest).toFixed(2)} Km</Text>
          </View>
        </View>
      </View>
      <View></View>
      <View style={styles.statbar}>
        <Text style={styles.statsTitle}>Exercise Stats</Text>
        <View style={styles.addEx}>
          {exercises &&
            props.history &&
            props.currentUser?.pb &&
            exercises.map((item) => {
              return (
                <ExStats
                  item={item}
                  key={exercises.indexOf(item)}
                  hist={props.history}
                  pb={
                    props.currentUser.pb.find(
                      (ex) => ex.exercise === item.data.name
                    )
                      ? props.currentUser.pb.find(
                          (ex) => ex.exercise === item.data.name
                        ).best + " kg"
                      : "No PB found"
                  }
                  del={deleteEx}
                />
              );
            })}
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate("Add to Dashboard", {
                dashboard: true,
              })
            }
            style={styles.exStats}
          >
            <Text>Add Exercises</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const mapStateToProps = (store) => ({
  history: store.history.workouts,
  currentUser: store.user.currentUser,
  runs: store.history.runs,
});

const mapDispatchToProps = (dispatch) => ({
  updateTracker: (user) => dispatch(updateUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Tracker);
