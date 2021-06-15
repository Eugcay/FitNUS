import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { ListItem } from "react-native-elements";

import { Menu, Divider, Provider } from "react-native-paper";

// const MyComponent = (props) => {
//   const [visible, setVisible] = useState(false);

//   const openMenu = () => setVisible(true);

//   const closeMenu = () => setVisible(false);

//   return (
//     <Provider>
//       <View
//         style={{
//           flex: 1,
//           justifyContent: 'center'
//         }}
//       >
//         <Menu
//           visible={visible}
//           onDismiss={closeMenu}
//           anchor={<Button onPress={openMenu}></Button>}
//         >
//           <Menu.Item onPress={() => {}} title="Replace" />
//           <Divider />
//           <Menu.Item onPress={() => {}} title="Delete" />
//         </Menu>
//       </View>
//     </Provider>
//   );
// };

import HeaderTop from "../components/startWorkoutComponents/headerTop";

const StartWorkout = ({ navigation, route }) => {
  const [exercises, setExercises] = useState([]);
  const [replaced, setReplaced] = useState(null);
  const [workoutStatus, setStatus] = useState("Not Started");

  const clearWorkout = () => {
    setExercises([]);
    console.log(exercises);
  };

  const deleteItem = (item) => {
    const index = exercises.indexOf(item);
    const data = [...exercises];
    data.splice(index, 1);
    setExercises(data);
    console.log(exercises);
  };

  const replaceItem = (item) => {
    setReplaced(item);
    navigation.navigate("Add Exercises", { item: item });
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("Edit", { exercise: item })}
      >
        <ListItem.Swipeable
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
          bottomDivider={true}
          rightContent={
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => replaceItem(item)}
                style={{
                  minHeight: "100%",
                  width: "50%",
                  backgroundColor: "royalblue",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 4,
                  marginRight: 1,
                }}
              >
                <MaterialCommunityIcons
                  name="swap-horizontal"
                  size={24}
                  color="white"
                />
                <Text style={{ color: "white", fontSize: 16 }}>Replace</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => deleteItem(item)}
                style={{
                  minHeight: "100%",
                  width: "50%",
                  backgroundColor: "red",
                  alignItems: "center",
                  borderRadius: 4,
                  justifyContent: "center",
                }}
              >
                <MaterialCommunityIcons name="delete" size={24} color="white" />
                <Text style={{ color: "white", fontSize: 16 }}>Delete</Text>
              </TouchableOpacity>
            </View>
          }
        >
          <View style={styles.circle}>
            <Text>{exercises.indexOf(item) + 1}</Text>
          </View>
          <ListItem.Content>
            <ListItem.Title>{item.data.name}</ListItem.Title>
            <ListItem.Subtitle>
              {item.sets
                ? `0/${item.sets} sets completed`
                : "0/1 sets completed"}
            </ListItem.Subtitle>
          </ListItem.Content>
          <TouchableOpacity>
            <MaterialCommunityIcons name="dots-vertical" size={23} />
          </TouchableOpacity>
        </ListItem.Swipeable>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    if (route.params?.replace) {
      const index = exercises.indexOf(replaced);
      const data = [...exercises];
      data.splice(index, 1, route.params.exercises[0]);
      setExercises(data);
      console.log(exercises[index]);
    } else if (route.params?.exercises) {
      setExercises(exercises.concat(route.params?.exercises));
      console.log(exercises);
    }
  }, [route.params?.exercises, route.params?.replace]);

  return (
    <View style={{ flex: 1 }}>
      <HeaderTop />
      <View>
        <TouchableOpacity onPress={() => navigation.navigate("Map")}>
          <Text>Map</Text>
        </TouchableOpacity>
        <View>
          {workoutStatus == "Not Started" || workoutStatus == "Paused" ? (
            <TouchableOpacity onPress={() => setStatus("Continue")}>
              <AntDesign name="play" size={24} color="black" />
            </TouchableOpacity>
          ) : (
            <View>
              <TouchableOpacity onPress={() => setStatus("Paused")}>
                <AntDesign name="pausecircle" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity>
                <MaterialCommunityIcons
                  name="stop-circle"
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
        <FlatList
          data={exercises}
          keyExtractor={(item) => item.key}
          renderItem={renderItem}
          style={{ marginVertical: 15 }}
          extraData={exercises}
          // ItemSeparatorComponent={() => {
          //   return <Divider />;
          // }}
        />
      </View>
      <View
        style={{
          flex: 1,
          position: "absolute",
          bottom: 40,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "center",
          height: "5%",
        }}
      >
        <TouchableOpacity
          style={[styles.bottomButton, { backgroundColor: "#00BFFF" }]}
          onPress={() => navigation.navigate("Add Exercises")}
        >
          <Text>Add exercises</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.bottomButton, { backgroundColor: "#F08080" }]}
          onPress={clearWorkout}
        >
          <Text>Clear Workout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default StartWorkout;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "contain",
    alignItems: "center",
  },

  bottom: {
    width: "100%",
    flex: 1,
    justifyContent: "flex-end",
  },

  caption: {
    color: "white",
    fontSize: 40,
    backgroundColor: "#000000a0",
  },

  content: {
    color: "white",
    fontSize: 20,
    backgroundColor: "#000000a0",
    marginBottom: 20,
  },

  join: {
    marginBottom: 40,
    width: "80%",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "white",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#fff",
  },

  buttonSurrounding: {
    width: "100%",
    backgroundColor: "#000000a0",
    alignItems: "center",
  },

  circle: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "gray",
    marginHorizontal: 12,
    width: 50,
    height: 50,
    borderRadius: 50,
  },

  bottomButton: {
    marginHorizontal: 8,
    width: "45%",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    borderRadius: 5,
  },
});
