import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Button,
} from "react-native";
import { Divider } from "react-native-elements";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Header } from "react-native-elements";

const EditExercise = (props) => {
  const { exercise } = props.route.params;

  const [currKey, setCurrKey] = useState(1);
  const [sets, setSets] = useState([
    { key: 1, weight: 0, reps: 0, completed: false },
  ]);

  useEffect(() => {
    props.navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    if (exercise?.sets) {
      setSets(exercise?.sets);
    }
  }, [exercise]);

  const setWeight = (index, val) => {
    let data = [...sets];
    data[index] = { ...data[index], weight: val };
    console.log(data[index]);
    setSets(data);
  };

  const setReps = (index, val) => {
    let data = [...sets];
    data[index] = { ...data[index], reps: val };
    console.log(data[index]);
    setSets(data);
  };

  const addSet = () => {
    let data = [...sets];
    data = data.concat({
      key: currKey + 1,
      weight: 0,
      reps: 0,
      completed: false,
    });
    setCurrKey(currKey + 1);
    setSets(data);
    console.log(sets);
  };

  const deleteSet = (index) => {
    let data = [...sets];
    data.splice(index, 1);
    setSets(data);
    console.log(data);
  };

  const completeSet = (index) => {
    let data = [...sets];
    data[index] = { ...data[index], completed: true };
    setSets(data);
    console.log(sets);
  };

  const editSet = (index, type) => {
    let data = [...sets];
    if (type === "INCREMENT_WEIGHT") {
      const newWeight = data[index].weight + 2.5;
      data[index] = { ...data[index], weight: newWeight };
    } else if (type === "DECREASE_WEIGHT") {
      const newWeight = data[index].weight > 0 ? data[index].weight - 2.5 : 0;
      data[index] = { ...data[index], weight: newWeight };
    } else if (type === "INCREMENT_REPS") {
      const newReps = data[index].reps + 1;
      data[index] = { ...data[index], reps: newReps };
    } else if (type === 'DECREASE_REPS'){
      const newReps = data[index].reps > 0 ? data[index].reps - 1 : 0;
      data[index] = { ...data[index], reps: newReps };
    }
    console.log(data[index]);
    setSets(data); 
  };

  const saveEx = () => {
    const ex = { ...exercise, sets: sets };
    console.log(sets);
    props.navigation.navigate({
      name: "Start Workout",
      params: { exercise: ex },
      merge: true,
    })
  };

  const renderItem = ({ item }) => {
    const index = sets.indexOf(item);
    if (!item.completed) {
      return (
        <View
          style={{
            flex: 1,
            width: "100%",
            alignItems: "center",
            borderWidth: 1,
            marginVertical: 15,
          }}
        >
          <View style={styles.setHeader}>
            <Text style={styles.setTitle}>Set {index + 1}</Text>
            <TouchableOpacity
              onPress={() => {
                deleteSet(index);
              }}
              style={{ position: "absolute", right: 10 }}
            >
              <MaterialCommunityIcons name="delete" size={17} />
            </TouchableOpacity>
          </View>
          <View style={styles.setContent}>
            <Text>Weight (kg)</Text>
            <View style={styles.input}>
              <TouchableOpacity onPress={() => editSet(index, 'DECREASE_WEIGHT')}>
                <MaterialCommunityIcons name="minus" size={20} />
              </TouchableOpacity>
              <TextInput
                placeholder="0"
                onChangeText={(text) => setWeight(index, text)}
                value={item.weight !== 0 ? item.weight.toString() : ""}
                style={{ fontSize: 20, width: "40%", textAlign: "center" }}
              />
              <TouchableOpacity onPress={() => editSet(index, 'INCREMENT_WEIGHT')}>
                <MaterialCommunityIcons name="plus" size={20} />
              </TouchableOpacity>
            </View>
          </View>
          <Divider width={1} color="gray" />
          <View style={styles.setContent}>
            <Text>Reps</Text>
            <View style={styles.input}>
              <TouchableOpacity onPress={() => editSet(index, 'DECREASE_REPS')}>
                <MaterialCommunityIcons name="minus" size={20} />
              </TouchableOpacity>
              <TextInput
                placeholder="0"
                value={item.reps !== 0 ? item.reps.toString() : ""}
                onChangeText={(text) => setReps(index, text)}
                style={{ fontSize: 20, width: "40%", textAlign: "center" }}
              />
              <TouchableOpacity onPress={() => editSet(index, 'INCREMENT_REPS')}>
                <MaterialCommunityIcons name="plus" size={20} />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => completeSet(index)}
            style={styles.complete}
          >
            <Text style={{ color: "white" }}>Complete</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={styles.setHeader}>
          <Text style={styles.setTitle}>Set {index + 1} completed!</Text>
          <Text>
            {item.weight ? item.weight : 0} kg x {item.reps ? item.reps : 0}{" "}
            reps
          </Text>
        </View>
      );
    }
  };

  return (
    <>
      <Header
        leftComponent={
          <TouchableOpacity
            onPress={saveEx}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <MaterialCommunityIcons
              name="chevron-left"
              size={23}
              color="white"
            />
            <Text style={{ color: "white", fontSize: 20, marginLeft: 4 }}>
              Save
            </Text>
          </TouchableOpacity>
        }
        centerComponent={{
          text: exercise?.data.name,
          style: { fontSize: 20, color: "#fff" },
        }}
      ></Header>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={sets}
          keyExtractor={(item) => item.key}
          renderItem={renderItem}
          extraData={sets}
          style={{ width: "80%", marginVertical: 5 }}
        />
        <TouchableOpacity onPress={addSet} style={styles.addSet}>
          <Ionicons name="add-outline" color="green" size={23} />
          <Text style={{ color: "green" }}>ADD SET</Text>
        </TouchableOpacity>
        <Button onPress={saveEx} title="Save" color="green" />
      </SafeAreaView>
    </>
  );
};

export default EditExercise;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },

  addSet: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  setHeader: {
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "silver",
    width: "100%",
  },

  setTitle: {
    fontSize: 17,
  },

  setContent: {
    borderBottomWidth: 0.5,
    borderBottomColor: "silver",
    width: "100%",
    alignItems: "center",
    padding: 5,
    paddingBottom: 8,
  },

  input: {
    flexDirection: "row",
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
  },

  complete: {
    width: "100%",
    alignItems: "center",
    padding: 5,
    backgroundColor: "darkgreen",
  },
});
