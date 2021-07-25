import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { secondsToDuration } from "../../helpers";

const RunStats = ({periodRun, statsType}) => {
  return (
    <View style={{ justifyContent: "center", marginTop: 15 }}>
      <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }}>
        <View style={styles.genStat}>
          <Text style={styles.statTitleSmall}>Average Pace</Text>
          <Text>
            {periodRun.runs
              ? (periodRun.duration / 60 / periodRun.distance).toFixed(2)
              : 0}{" "}
            min/Km
          </Text>
        </View>
        <View style={styles.genStat}>
          <Text style={styles.statTitleSmall}>Total Duration</Text>
          <Text>{secondsToDuration(periodRun.duration)}</Text>
        </View>
        <View style={styles.genStat}>
          <Text style={styles.statTitleSmall}>Distance Per Run</Text>
          <Text>
            {periodRun.runs
              ? (periodRun.distance / periodRun.runs).toFixed(2)
              : 0}{" "}
            Km
          </Text>
        </View>
        <View style={styles.genStat}>
          <Text style={styles.statTitleSmall}>Longest Run</Text>
          <Text>{periodRun.longest.toFixed(2)} Km</Text>
        </View>
      </View>
      {statsType !== "weekly" && (
        <View style={styles.workoutCircle}>
          <Text style={styles.workoutFreq}>{periodRun.runs}</Text>
          <Text>Runs</Text>
        </View>
      )}
    </View>
  );
};

export default RunStats;

const styles = StyleSheet.create({
  workoutCircle: {
    width: 100,
    height: 100,
    borderRadius: 55,
    borderWidth: 8,
    borderColor: "whitesmoke",
    backgroundColor: "white",
    position: "absolute",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },

  statTitleSmall: {
    fontSize: 15,
    fontWeight: "bold",
    marginVertical: 5,
  },

  genStat: {
    width: "47%",
    minHeight: 100,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
    padding: 10,
    backgroundColor: "white",
    margin: 3,
    marginVertical: 5,
    borderRadius: 5,
  },

  workoutFreq: {
    fontSize: 18,
    color: "darkgreen",
  },
});
