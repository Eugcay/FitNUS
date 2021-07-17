import { StyleSheet, Dimensions } from "react-native";

export const styles = StyleSheet.create({
  finishRunBorder: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 20,
    bottom: 80,
    height: Dimensions.get("window").height * 0.6,
    padding: 30,
    width: Dimensions.get("window").width * 0.9,
  },
  finishRunDistance: {
    color: "black",
    fontSize: 28,
    flex: 0.25,
  },
  finishRunTime: {
    color: "black",
    fontSize: 28,
    flex: 0.25,
  },
  finishRunPace: {
    color: "black",
    fontSize: 28,
    flex: 0.25,
  },
  finishRunButton: {
    alignSelf: "center",
    backgroundColor: "lightgreen",
    padding: 10,
    borderRadius: 16,
    margin: 10,
    width: 135,
    bottom: -20,
  },
  finishRunButtonText: {
    alignSelf: "center",
    color: "white",
    fontSize: 18,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  overlay: {
    position: "absolute",
    bottom: 50,
    alignItems: "center",
  },
  bottombar: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    height: "5%",
  },
  distanceBox: {
    alignSelf: "center",
    bottom: 360,
  },
  distance: {
    fontSize: 30,
    color: "#0B2A59",
    textShadowColor: "black",
    textShadowOffset: {
      width: 50,
      height: -10,
    },
  },
  timeBox: {
    bottom: 335,
    left: 64,
  },
  time: {
    color: "#0B2A59",
    fontSize: 15,
  },
  ranBox: {
    bottom: 354,
    left: 125,
  },
  ran: {
    color: "#0B2A59",
    fontSize: 15,
  },
  startButtonBox: {
    alignSelf: "center",
    backgroundColor: "#0B2A59",
    padding: 10,
    borderRadius: 16,
    width: 150,
    bottom: -20,
  },
  startButton: {
    alignSelf: "center",
    color: "white",
    fontSize: 18,
  },
  continueButtonBox: {
    alignSelf: "center",
    backgroundColor: "#0B2A59",
    padding: 10,
    borderRadius: 16,
    margin: 10,
    width: 135,
    bottom: -20,
  },
  pauseButtonBox: {
    alignSelf: "center",
    backgroundColor: "#F08080",
    padding: 10,
    borderRadius: 16,
    margin: 10,
    width: 135,
    bottom: -20,
  },
  pauseButton: {
    alignSelf: "center",
    color: "white",
    fontSize: 18,
  },
  finishButtonBox: {
    alignSelf: "center",
    backgroundColor: "lightgreen",
    padding: 10,
    borderRadius: 16,
    margin: 10,
    width: 135,
    bottom: -20,
  },
});

export const options = {
  container: {
    width: Dimensions.get("window").width,
    alignItems: "center",
    bottom: 350,
  },
  text: {
    fontSize: 62,
    color: "#0B2A59",
    margin: 0,
  },
};
