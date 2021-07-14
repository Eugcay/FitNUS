import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Agenda } from "react-native-calendars";
import { Header } from "react-native-elements";
import { connect } from "react-redux";
import moment from "moment";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const WorkoutHistory = (props) => {
  const [workouts, setWorkouts] = useState([]);
  const [runs, setRuns] = useState([]);

  const [selectedDate, setDate] = useState(new Date().toDateString());
  const [items, setItems] = useState({});

  useEffect(() => {
    setWorkouts(props.history);
    setRuns(props.runs);
  }, [props.history, props.runs]);

  const withinRange = (curr, date) => {
    return (
      Date.parse(date) > curr.timestamp - 31 * 24 * 60 * 60 * 1000 &&
      Date.parse(date) < curr.timestamp + 31 * 24 * 60 * 60 * 1000
    );
  };

  const setNewItems = (arr, day) => {
    for (let i = -31; i <= 31; i++) {
      const strTime = timeToString(
        new Date(day.timestamp + i * 24 * 60 * 60 * 1000)
      );
      if (!items[strTime]) {
        items[strTime] = [];
      }
    }
    arr
      .filter((workout) => withinRange(day, workout.data.date.toDate()))
      .forEach((workout) => {
        const strTime = timeToString(workout.data.date.toDate());

        const template = { ...workout.data, id: workout.id };
        if (!items[strTime].find((item) => item.id === template.id)) {
          items[strTime].push(template);
        }
      });
    const newItems = {};
    Object.keys(items).forEach((key) => {
      newItems[key] = items[key].sort((x, y) => x.date > y.date);
    });
    setItems(newItems);
  };

  const loadItems = (day) => {
    setTimeout(() => {
      setNewItems(workouts, day);
      setNewItems(runs, day);
      setNewItems(
        props.upcoming.map((item) => ({
          ...item,
          data: { ...item.data, date: item.data.time },
        })),
        day
      );
    }, 500);
  };

  const timeToString = (time) => {
    // const date = new Date(time);
    return time.toISOString().split("T")[0];
  };

  const renderItem = (item) => {
    return (
      <TouchableOpacity
        style={[
          styles.container,
          {
            backgroundColor:
              item?.jioStatus || item.type ? "palegreen" : "white",
          },
        ]}
        onPress={() =>
          props.navigation.navigate(
            item?.exercises
              ? "Workout Details"
              : item?.locList
              ? "Run Details"
              : "Jio Details",
            item.type
              ? {
                  item: { data: item, id: item.id },
                  currUser: props.currentUser,
                }
              : { workout: item }
          )
        }
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ width: "90%" }}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={{ fontSize: 15 }}>
              {moment(item.date.toDate()).format("h:mm a")}
            </Text>
          </View>
          <MaterialCommunityIcons
            name={
              item?.exercises || item.type === "Static"
                ? "dumbbell"
                : "run-fast"
            }
            size={20}
            color={
              item?.exercises || item.type === "Static"
                ? "goldenrod"
                : "crimson"
            }
            style={{ justifyContent: "center" }}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Header
        centerComponent={{
          text: "Workout History",
          style: { fontSize: 20 },
        }}
      ></Header>
      <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        selected={selectedDate}
        showClosingKnob={true}
        renderItem={renderItem}
        renderEmptyDate={() => <View></View>}
      />
    </View>
  );
};

const mapStateToProps = (store) => ({
  history: store.history.workouts,
  runs: store.history.runs,
  completed: store.jios.completed,
  upcoming: store.jios.upcoming,
  user: store.user.currentUser,
});

export default connect(mapStateToProps, null)(WorkoutHistory);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    margin: 5,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
