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
import { Divider } from "react-native-elements";
import { connect } from "react-redux";
import { updateUser } from "../store/actions/user";
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
  concatWithoutDupe,
  statsByEx,
} from "../helpers";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import moment from "moment";
import { LineChart, Grid, XAxis, YAxis } from "react-native-svg-charts";
import { Circle, Path } from "react-native-svg";
import Spinner from "../components/Spinner";
import MuscleCategoryPie from "../components/trackerComponents/MuscleCategoryPie";
import PieLegend from "../components/trackerComponents/MuscleCategoryLegend";
import { FrequencyBarChart } from "../components/trackerComponents/FrequencyBarChart";
import { Favourites } from "../components/trackerComponents/Favourites";

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

  useEffect(() => {
    const tot = props.history
      ? getStats(props.history.map((doc) => doc.data))
      : null;
    const w = props.history ? reloadPeriod(week, props.history) : null;
    const m = props.history ? reloadPeriod(month, props.history) : null;
    const favourites = favExercises(props.history.map((doc) => doc.data));

    setUser(props.currentUser);
    setTotal({
      ...tot,
      workoutFreq: yearlyData(props.history.map((doc) => doc.data)),
    });
    setWeekly(w);
    setMonthly({
      ...m,
      workoutFreq: monthlyData(
        props.history.map((doc) => doc.data),
        month
      ),
    });
    setFavs(favourites);
    setExercises(props.currentUser?.tracked ? props.currentUser?.tracked : []);
    setGoals({
      calories: props.currentUser.calGoal,
      duration: props.currentUser.durationGoal,
      distance: props.currentUser.distanceGoal,
      workouts: props.currentUser.workoutGoal,
    });

    setType(statsType);
    setPeriod(period);
    console.log(exercises)
  }, [props.history, props.currentUser, week, month]);

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

  const deleteEx = (ex) => {
    const dat = [...exercises];
    dat.splice(exercises.indexOf(ex), 1);
    props.updateTracker({ ...props.currentUser, tracked: dat });
  };

//   const Decorator = ({ x, y, data }) => {
//     return data.map((value, index) => (
//         <Circle
//             key={ index }
//             cx={ x(index) }
//             cy={ y(value) }
//             r={ 4 }
//             stroke={ 'rgb(134, 65, 244)' }
//             fill={ 'white' }
//         />
//     ))
// }

  const ExStats = ({ item }) => {
    const stat = statsByEx(
      item,
      props.history.map((doc) => doc.data)
    );
    const chartData = stat?.exHist && [...stat.exHist].sort(
      (x, y) => x.date.seconds - y.date.seconds
    );
    const pb = props.currentUser.pb.find((ex) => ex.exercise === item.data.name)
      ? props.currentUser.pb.find((ex) => ex.exercise === item.data.name).best +
        " kg"
      : "No PB found";

    return (
      <View
        style={{ marginVertical: 10, justifyContent: "center", marginLeft: 10 }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 7,
          }}
        >
          <Image
            source={
              item.data.photo
                ? { uri: item.data.photo }
                : require("../assets/boxing.jpeg")
            }
            style={{ height: 40, width: 40, marginRight: 10, borderRadius: 8 }}
          />
          <Text style={{ fontSize: 16, fontWeight: "bold", width: "77%" }}>
            {item.data.name}
          </Text>
          <TouchableOpacity
            onPress={() => {
              deleteEx(item);
            }}
            style={{
              alignSelf: "flex-start",
              fontSize: 13,
              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons name="delete" size={17} color="crimson" />
          </TouchableOpacity>
        </View>
        <Divider />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 10,
            marginBottom: 15,
          }}
        >
          <View style={{ width: "33%", alignItems: "center" }}>
            <MaterialCommunityIcons
              name="clock-time-ten"
              color="maroon"
              size={22}
            />
            <Text style={{ color: "gray" }}>Last completed</Text>
            <Text>
              {stat.date
                ? moment(new Date(stat.date)).format("DD MMMM YYYY")
                : "No Attempt"}
            </Text>
          </View>
          <Divider orientation="vertical" />
          <View style={{ width: "33%", alignItems: "center" }}>
            <MaterialCommunityIcons name="podium" size={22} color="goldenrod" />
            <Text style={{ color: "gray" }}>Personal Best</Text>
            <Text>{pb}</Text>
          </View>
          <Divider orientation="vertical" />
          <View style={{ width: "33%", alignItems: "center" }}>
            <MaterialCommunityIcons
              name="weight-lifter"
              size={22}
              color="green"
            />
            <Text style={{ color: "gray" }}>Sets Completed</Text>
            <Text>{stat.exStats}</Text>
          </View>
        </View>

         {stat.exHist ? <View style={{ flex: 1 }}>
          <Text>Progress Chart</Text>
          <View style={{ flex: 1, flexDirection: "row", padding: 5 }}>
            <YAxis
              data={chartData.map((item) => item.exs)}
              style={{ width: "6%", justifyContent: "center" }}
              contentInset={{ top: 10, bottom: 10 }}
              svg={{ fontSize: 10, fill: "grey" }}
              yMax={100}
            />
            <LineChart
              style={{ flex: 1, minHeight: 150, maxHeight: 200, width: "96%" }}
              data={chartData.map((item) => { console.log(item.exs); return item.exs})}
              svg={{ stroke: 'rgb(134, 65, 244)'}}
              contentInset={{ top: 10, bottom: 10 }}
              ymin={100}
              yMax={100}
            >
              <Grid />
            </LineChart>
          </View>
          <XAxis
            style={{ marginBottom: 12, width: "95%", alignSelf: "flex-end" }}
            data={chartData}
            formatLabel={(value, index) =>
              moment(chartData[index].date.seconds * 1000).format("DD-MMM-YY")
            }
            svg={{ fontSize: 10, fill: "black" }}
            contentInset={{ left: 30, right: 30 }}
            spacingInner={0.2}
          />
        </View> : (
          <View style={{flex: 1, height: 150, alignItems: "center", justifyContent: 'center'}}>
            <Text style={{fontSize: 18}}>No Workout Data</Text>
          </View>
        )}
        <Divider />
      </View>
    );
  };

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
      <View style={styles.dropdown}></View>
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
          {statsType === "weekly" && <WeekCalendar minDate={moment(week.start).format('YYYY-MM-DD')} maxDate={moment(week.end).format('YYYY-MM-DD')}/>}
            {!period && <Spinner />}
            {statsType !== "weekly" && period && (
              <FrequencyBarChart
                type={statsType}
                data={period?.workoutFreq ? period?.workoutFreq : dats}
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
                    : Math.round(period.duration / (60 * period.workouts)) + ':' + Math.round((period.duration / period.workouts) % 60)}{" "}
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
      <View></View>
      <View style={styles.statbar}>
        <Text style={styles.statsTitle}>Exercise Stats</Text>
        <View style={styles.addEx}>
          {exercises && props.history &&
            exercises.map((item) => {
              return <ExStats item={item} key={exercises.indexOf(item)} />;
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

  statchart: {
    paddingTop: 0,
    alignContent: "center",
  },

  statbar: {
    marginVertical: 10,
    marginHorizontal: 15,
  },

  addEx: {
    backgroundColor: "white",
    borderRadius: 10,
    flex: 1,
    padding: 10,
    justifyContent: "center",
    minHeight: 150,
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

  exStats: {
    backgroundColor: "lightblue",
    height: 30,
    width: "30%",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 5,
    marginVertical: 10,
  },
});

const mapStateToProps = (store) => ({
  history: store.user.history,
  currentUser: store.user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  updateTracker: (user) => dispatch(updateUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Tracker);
