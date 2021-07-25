import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { secondsToDuration } from "../../helpers";

const GenStats = ({ period, periodRun, statsType }) => {

  return (
    <View style={{ justifyContent: "center" }}>
      <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }}>
        <View style={styles.genStat}>
          <MaterialCommunityIcons
            name="clock-time-four-outline"
            size={18}
            color="darkgreen"
          />

          <Text style={styles.statTitleSmall}>Total Duration</Text>
          <Text>{secondsToDuration(period.duration + periodRun.duration)}</Text>
        </View>
        <View style={styles.genStat}>
          <MaterialCommunityIcons name="timer-outline" size={17} color="blue" />
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
          {statsType !== "weekly" ? (
            <>
              <MaterialCommunityIcons
                name="map-marker-distance"
                size={17}
                color="crimson"
              />
              <Text style={styles.statTitleSmall}>Distance</Text>
              <Text>{periodRun.distance.toFixed(2)} km</Text>
            </>
          ) : (
            <>
              <MaterialCommunityIcons
                name="run-fast"
                size={17}
                color="crimson"
              />
              <Text style={styles.statTitleSmall}>Runs</Text>
              <Text>{periodRun.runs}</Text>
            </>
          )}
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
  );
};

export default GenStats;

const styles = StyleSheet.create({
  workoutFreq: {
    fontSize: 18,
    color: "blue",
  },

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
});
