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
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { getUserHistory } from "../../Api/userApi";
import { setRandomColor } from "../../helpers";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
];

const HistoryBar = ({ navigation, hist }) => {
  const [history, setHistory] = useState(hist);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(false);

  const getDetails = (item) => {
    navigation.navigate("Workout Details", item);
  };
  // useEffect(() => {
  //   const getHistory = async () => {
  //     const hist = await getUserHistory()
  //       .get()
  //       .then((snapshot) => {
  //           const hist = []
  //           snapshot.docs.forEach((doc) =>
  //             doc
  //               .data()
  //               .workoutRef.get()
  //               .then((snap) => hist.push({id: doc.id, date: doc.data().date, workout: snap.data()}))
  //           )
  //         return hist
  //       })
  //       .then(hist => setHistory(hist))
  //       .then(setLoading(false))
  //       .catch((error) => error);
  //     console.log(history);

  //   };

  //   getHistory();
  // }, []);

  const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      <Text style={[styles.title, textColor]}>
        {!loading && item.workout.name}
      </Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() =>  navigation.navigate("Workout Details", item)} style={[styles.item, {backgroundColor:setRandomColor()}]}>
      <Text style={styles.title}>
        {!loading && item.workout.name}
      </Text>
    </TouchableOpacity>
  )

  // const backgroundColor = setRandomColor();
  // const color = item.id === selectedId ? "white" : "black";

  // return (
  //   <Item
  //     item={item}
  //     onPress={() => getDetails(item)}
  //     backgroundColor={{ backgroundColor }}
  //     textColor={{ color }}
  //   />
  // );

  return !loading ? (
    <FlatList
      horizontal={true}
      data={history}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      extraData={selectedId}
    />
  ) : (
    <View>
      <Text>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    
  },
  title: {
    fontSize: 32,
  },
});

export default HistoryBar;
