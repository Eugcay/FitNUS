import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
  
    addImage: {
      flexDirection: "row",
      height: "20%",
      minHeight: 150,
      width: "90%",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "white",
      borderWidth: 1,
      borderStyle: "dashed",
      borderColor: "blue",
      marginTop: 10,
    },
    formItem: {
      marginVertical: 10,
    },
  
    labels: {
      marginBottom: 5,
      fontSize: 15,
      fontWeight: "bold",
    },
  
    bottomButton: {
      alignSelf: "center",
      marginVertical: 15,
      fontSize: 16,
      fontWeight: "bold",
      color: "blue",
      marginLeft: 5
    },
  
    bottomButtonContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },

    dateTimePicker: {
      flexDirection: 'row' 
    }
  });