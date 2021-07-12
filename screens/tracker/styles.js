import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
      borderRadius: 50,
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

    genStat: {
      width: "48%",
      height: 90,
      alignItems: "center",
      justifyContent: 'center',
      padding: 10,
      backgroundColor: "white",
      margin: 3,
      marginVertical: 5
    },

    workoutFreq: {
      fontSize: 18,
      color: "blue",
    },

    workoutCircle: {
      width: 110,
      height: 110,
      borderRadius: 55,
      borderWidth: 8,
      borderColor: "whitesmoke",
      backgroundColor: "white",
      position: "absolute",
      alignSelf: "center",
      alignItems: "center",
      justifyContent: "center",
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

    statTitleSmall: {
      fontSize: 15,
      fontWeight: "bold",
      marginVertical: 5, 
    }
  });