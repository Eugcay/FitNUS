import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Divider } from "react-native-elements";
import { Ionicons,  MaterialCommunityIcons } from "@expo/vector-icons";
import { Menu, Provider } from "react-native-paper";

const EditExercise = (props) => {
  const { exercise } = props.route.params;

  const [sets, setSets] = useState([{ key: 1, weight: null, reps: null }]);

  const setWeight = (index, val) => {
    const data = [...sets];
    data[index] = { ...data[index], weight: val };
    setSets(data);
  };

  const setReps = (index, val) => {
    const data = [...sets];
    data[index] = { ...data[index], reps: val };
    setSets(data);
  };

  const addSet = () => {
    let data = [...sets];
    data = data.concat({ key: data.length + 1, weight: null, reps: null });
    setSets(data);
  };

  const renderItem = ({ item }) => {
    const index = sets.indexOf(item);
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
          <Options/>
        </View>
        <View style={styles.setContent}>
          <Text>Weight (kg)</Text>
          <TextInput
            value={item.weight}
            onChange={(text) => setWeight(index, text)}
          />
        </View>
        <Divider width={1} color="gray" />
        <View style={styles.setContent}>
          <Text>Reps</Text>
          <TextInput
            value={item.reps}
            onChange={(text) => setReps(index, text)}
          />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>{exercise?.data.name}</Text>
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
    </SafeAreaView>
  );
};

const Options = () => {
    const [visible, setVisible] = useState(false)

    
    
    return (
        <Provider>
            <Menu
            visible={visible}
            onDismiss={() => setVisible(false)}
            anchor={<TouchableOpacity onPress={() => setVisible(true)}><MaterialCommunityIcons name="dots-vertical"/></TouchableOpacity>}>
                
            </Menu>
        </Provider>
    )
}


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
    backgroundColor: "silver",
    width: "100%",
  },

  setTitle: {
    fontSize: 17,
  },

  setContent: {
    borderBottomWidth: 1,
    borderBottomColor: "silver",
    width: "100%",
    alignItems: "center",
    padding: 5,
    paddingBottom: 8
  },
});
