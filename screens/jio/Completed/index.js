import React, { useState, useEffect } from "react";
import { ScrollView, Text, StyleSheet, View } from "react-native";
import Post from "../../../components/jioComponents/Post";
import Preview from "../../../components/jioComponents/Preview";
import { connect } from "react-redux";
import e from "cors";

const JiosCompleted = (props) => {
  const [week, setWeek] = useState([]);
  const [month, setMonth] = useState([]);
  const [past, setPast] = useState([]);

  useEffect(() => {
    const sameWeek = (date) => {
      return date > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    };

    const sameMonth = (date) => {
      return (
        date.getMonth() === new Date().getMonth() &&
        date.getFullYear === new Date().getFullYear()
      );
    };

    setWeek(
      props.completed.filter((item) => sameWeek(item.data.time.toDate()))
    );
    setMonth(
      props.completed.filter(
        (item) =>
          sameMonth(item.data.time.toDate()) &&
          !sameWeek(item.data.time.toDate())
      )
    );
    setPast(
      props.completed.filter(
        (item) =>
          !sameMonth(item.data.time.toDate()) &&
          !sameWeek(item.data.time.toDate())
      )
    );
  }, [props.completed]);

  const renderList = (arr) => {
    if (arr.length === 0) {
      return (
        <View style={styles.empty}>
          <Text>No Activity</Text>
        </View>
      );
    } else {
      return arr.map((item) => (
        <Preview
          navigation={props.navigation}
          item={item}
          currUser={props.currUser}
        />
      ));
    }
  };

  return (
    <ScrollView horizontal={false}>
      <Text style={styles.period}>Recent</Text>
      {renderList(week)}

      <Text style={styles.period}>In the Past Month</Text>
      {renderList(month)}

      <Text style={styles.period}>Older</Text>
      {renderList(past)}
    </ScrollView>
  );
};

const mapStateToProps = (store) => ({
  completed: store.jios.completed,
});

export default connect(mapStateToProps, null)(JiosCompleted);

const styles = StyleSheet.create({
  period: {
    marginHorizontal: 10,
    marginTop: 10,
    fontSize: 17,
    fontWeight: "bold",
  },

  empty: {
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
    marginVertical: 5,
    backgroundColor: 'white'
  },
});
