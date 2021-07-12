import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Agenda } from "react-native-calendars";
import { Header } from "react-native-elements";
import { connect } from "react-redux";
import moment from "moment";
import { TouchableOpacity } from "react-native";

const WorkoutHistory = (props) => {
  const [workouts, setWorkouts] = useState([]);
  const [runs, setRuns] = useState([]);

  const [selectedDate, setDate] = useState(new Date().toDateString());
  const [items, setItems] = useState({});

  useEffect(() => {
    setWorkouts(props.history);
    setRuns(props.runs);

    loadItems(new Date());
  }, [props.history, props.runs]);

  const withinRange = (curr, date) => {
    return (
      Date.parse(date) > Date.parse(curr) - 7 * 24 * 60 * 60 * 1000 &&
      Date.parse(date) < Date.parse(curr) + 7 * 24 * 60 * 60 * 1000
    );
  };

  const setNewItems = (arr, day) => {
    arr
      .filter((workout) => withinRange(day, workout.data.date.toDate()))
      .forEach((workout) => {
        const strTime = timeToString(workout.data.date.toDate());
        if (!items[strTime]) {
          items[strTime] = [];
        }
        const template = { ...workout.data, color: "green" };
        if (!items[strTime].includes(template)) {
          items[strTime].push(template);
        }
      });
    const newItems = {};
    Object.keys(items).forEach((key) => {
      newItems[key] = items[key];
    });
    setItems(newItems);
  };

  const loadItems = (day) => {
    setItems({});
    setNewItems(props.history, day);
    setNewItems(props.runs, day);
    setNewItems(
      props.upcoming.map((item) => ({
        ...item,
        data: { ...item.data, date: item.data.time },
      })),
      day
    );
    console.log(items);
  };

  const timeToString = (time) => {
    // const date = new Date(time);
    return time.toISOString().split("T")[0];
  };

  const renderItem = ( item ) => {
    return (
        <TouchableOpacity style={styles.container} onPress={() => props.navigation.navigate('Workout Details', {workout: item})}>
      <View >
        <Text>{item.name}</Text>
        <Text>{item.date.toDate().toDateString()}</Text>
      </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Header
        centerComponent={{
          text: "Workout History",
          style: { fontSize: 20, color: "#fff" },
        }}
      ></Header>
      <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        selected={selectedDate}
        showClosingKnob={true}
        onDayChange={(day) => {
          console.log("day changed");
        }}
        onDayPress={(day) => {
          console.log("day pressed");
        }}
        renderItem={renderItem}
        renderEmptyDate={() => <View/>}
      />
    </View>
  );
};

const mapStateToProps = (store) => ({
  history: store.history.workouts,
  runs: store.history.runs,
  completed: store.jios.completed,
  upcoming: store.jios.upcoming,
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
  },
});
