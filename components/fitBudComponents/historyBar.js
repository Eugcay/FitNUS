// import React from "react";
// import { Text, TouchableOpacity, View, FlatList} from "react-native";
//Need to import data from storage

// const HistoryBar = () => {
//     const title = "History:";
//     let historyData = []; //Have to import from firebase
//     let longPress = () => alert("stoptouchingme");

//     listEmptyComponent = () => (
//         <View
//           style={{
//             borderWidth: 1,
//             height: '50%',
//             flex: 1,
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}>
//           <Text>History has not been made</Text>
//         </View>
//       );

//       return (
//         <View>
//           {historyData.length > 0 && (
//             <FlatList
//             style={{ flex: 1 }}
//             data={this.historyData}
//             horizontal = {True}
//             ListHeaderComponent={() => this.title}
//             ListEmptyComponent={() => this.listEmptyComponent()}
//             //ItemSeparatorComponent={() => this.listSeparator()}
//             //Item properties: Workout Object
//             //To display, name and picture, onLongPress, go to Workout object.
//             renderItem={({ item }) => (
//                 <TouchableOpacity onLongPress={longPress}>
//                     <Text style={{ fontSize: 18, fontWeight: '600' }}>
//                     {item.name}
//                     </Text>
//                 </TouchableOpacity>
//             )}
//             />
//           )}
//         </View>
//       );
// }

import React, { useState, useEffect } from "react";
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { getUserHistory } from "../../Api/userApi";
import { setRandomColor } from "../../helpers";

const HistoryBar = ({ navigation, hist }) => {
  const [history, setHistory] = useState(hist);
 

  console.log(history)

  if ( history && history.length === 0) {
    return (
      <TouchableOpacity
        onPress={() => alert('hello')}
        style={[styles.item, { backgroundColor: setRandomColor() }]}
      >
        <Text >Create new workout</Text>
      </TouchableOpacity>
    );
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("Workout Details", { workout: item.workout, date: item.date })}
      style={[styles.item, { backgroundColor: setRandomColor() }]}
    >
      <Text style={styles.title}>{item.workout.name}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      horizontal={true}
      data={history}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    width: 160,
    maxHeight: 100,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    alignItems: 'center'
  },
  title: {
    fontSize: 32,
  },
});

export default HistoryBar;
