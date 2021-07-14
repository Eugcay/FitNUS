import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
// import { WeekCalendar, Calendar, Agenda } from "react-native-calendars";
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
  reloadRunPeriod,
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
import * as Progress from "react-native-progress";
import Donut from "../../components/Donut";

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
    const runsPerMonth =
      props.runs && yearlyData(props.runs.map((doc) => doc.data));

    const mR = props.runs && reloadRunPeriod(month, props.runs);
    const runsPerWeek =
      props.runs &&
      monthlyData(
        props.runs.map((doc) => doc.data),
        month
      );
    const wR = props.runs ? reloadRunPeriod(week, props.runs) : null;
    /////Workouts
    const tot = props.history && getStats(props.history.map((doc) => doc.data));

    const workoutsPerMonth =
      props.history && yearlyData(props.history.map((doc) => doc.data));

    const m = props.history && reloadPeriod(month, props.history);
    const workoutsPerWeek =
      props.history &&
      monthlyData(
        props.history.map((doc) => doc.data),
        month
      );

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
      duration: props.currentUser?.durationGoal || null,
      workouts: props.currentUser?.workoutGoal || null,
      runs: props.currentUser?.runGoal || null,
    });
    /////////Workout sets
    setTotal({
      ...tot,
      workoutFreq: workoutsPerMonth.map(
        (run, index) => run + runsPerMonth[index]
      ),
    });
    setMonthly({
      ...m,
      workoutFreq: workoutsPerWeek.map((week, index) => ({
        ...week,
        count: week.count + runsPerWeek[index].count,
      })),
    });
    //.map((run, index) => run + runsPerWeek[index])
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
            workoutFreq: workoutsPerWeek.map((week, index) => ({
              ...week,
              count: week.count + runsPerWeek[index].count,
            })),
          };
        case "total":
          return {
            ...tot,
            workoutFreq: workoutsPerMonth.map(
              (run, index) => run + runsPerMonth[index]
            ),
          };
        default:
          return w;
      }
    };
    setPeriod(getPeriod());
    ///////////////RunPeriod specific stats
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
          return wR;
      }
    };
    setRunPeriod(getRunPeriod());
  }, [props.history, props.currentUser, props.runs, week, month, statsType]);

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

  // convert time in seconds to displayed form
  const secondsToDuration = (seconds) => {
    return (
      (seconds >= 3600 ? Math.floor(seconds / 3600) + "h " : "") +
      Math.floor((seconds % 3600) / 60) +
      "m " +
      (seconds < 3600 ? Math.floor(seconds % 60) + "s" : "")
    );
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
        <>
          <View style={styles.statContainer}>
            <Text style={styles.statsTitle}>General Stats</Text>
            <View
              style={{
                // flexDirection: "row",
                marginBottom: 15,
                justifyContent: "center",
              }}
            >
              {statsType === "weekly" && (
                <View style={{ marginHorizontal: 5, alignItems: "center" }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      marginBottom: 5,
                    }}
                  >
                    <Text style={styles.workoutFreq}>
                      {period.workouts + periodRun.runs}
                    </Text>
                    <Text>
                      {" out of " + (goals.workouts || "2")} workouts completed!
                    </Text>
                  </View>

                  <Progress.Bar
                    animated
                    progress={
                      (period.workouts + periodRun.runs) / (goals.workouts || 2)
                    }
                    width={Dimensions.get("screen").width * 0.85}
                    borderColor={
                      period.workouts + periodRun.runs >
                        (goals.workouts || 2) && "gold"
                    }
                    borderWidth={
                      period.workouts + periodRun.runs > (goals.workouts || 2)
                        ? 2
                        : 1
                    }
                    height={15}
                  />
                </View>
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

            <View style={{ justifyContent: "center" }}>
              <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }}>
                <View style={styles.genStat}>
                  <MaterialCommunityIcons
                    name="clock-time-four-outline"
                    size={17}
                    color="red"
                  />

                  <Text style={styles.statTitleSmall}>Total Duration</Text>
                  <Text>
                    {secondsToDuration(period.duration + periodRun.duration)}
                  </Text>
                </View>
                <View style={styles.genStat}>
                  <MaterialCommunityIcons
                    name="timer-outline"
                    size={16}
                    color="blue"
                  />
                  <Text style={styles.statTitleSmall}>Avg Duration</Text>
                  <Text>
                    {period.workouts + periodRun.runs === 0
                      ? "0m 0s"
                      : secondsToDuration(
                          (period.duration + periodRun.duration) /
                            (period.workouts + periodRun.runs)
                        )}
                  </Text>
                </View>

                <View style={styles.genStat}>
                  <MaterialCommunityIcons
                    name="weight-lifter"
                    size={17}
                    color="goldenrod"
                  />
                  <Text style={styles.statTitleSmall}>Sets</Text>
                  <Text>{period.sets}</Text>
                </View>
                <View style={styles.genStat}>
                  <MaterialCommunityIcons
                    name="map-marker-distance"
                    size={17}
                    color="gray"
                  />
                  <Text style={styles.statTitleSmall}>Distance</Text>
                  <Text>{periodRun.distance.toFixed(2)} km</Text>
                </View>
              </View>
              {statsType !== "weekly" && (
                <View style={styles.workoutCircle}>
                  <Text style={styles.workoutFreq}>
                    {period.workouts + periodRun.runs}
                  </Text>
                  <Text>Workouts</Text>
                </View>
              )}
            </View>

            <View
              style={{
                backgroundColor: "white",
                marginHorizontal: 5,
                marginVertical: 15,
              }}
            >
              <Text
                style={{
                  padding: 10,
                  paddingBottom: 5,
                  fontSize: 16,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Muscles Used
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  paddingBottom: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <View style={{ width: "80%" }}>
                  <MuscleCategoryPie
                    data={period.categories}
                    max={period.sets}
                  />
                </View>
                <PieLegend data={period.categories} />
              </View>
            </View>
          </View>
        </>
      ) : (
        <Spinner />
      )}
      {periodRun ? (
        <View style={styles.statContainer}>
          <Text style={styles.statsTitle}>Run Stats</Text>
          <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }}>
            <View style={styles.runStat}>
              <Text style={styles.statTitleSmall}>Average Pace</Text>
              <Text>
                {periodRun.runs
                  ? (periodRun.duration / 60 / periodRun.distance).toFixed(2)
                  : 0}{" "}
                min/Km
              </Text>
            </View>
            <View style={styles.runStat}>
              <Text style={styles.statTitleSmall}>Runs</Text>
              <Text>{periodRun.runs}</Text>
            </View>
            <View style={styles.runStat}>
              <Text style={styles.statTitleSmall}>Distance Per Run</Text>
              <Text>
                {periodRun.runs
                  ? (periodRun.distance / periodRun.runs).toFixed(2)
                  : 0}{" "}
                Km
              </Text>
            </View>
            <View style={styles.runStat}>
              <Text style={styles.statTitleSmall}>Longest Run</Text>
              <Text>{periodRun.longest.toFixed(2)} Km</Text>
            </View>
          </View>
        </View>
      ) : (
        <Spinner />
      )}
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
