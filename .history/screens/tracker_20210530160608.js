import React, { useState } from "react";
import { View, Text } from "react-native"
import {getUserHistory } from "../API/userApi";
import { getWorkoutById } from "../API/workoutApi";


export default function Tracker({navigation}) {
    const [calories, setCalories] = useState(0)

    function totalCalories() {
        return getUserHistory().onSnapshot((snapshot) => {
          snapshot.docs
            .map((doc) =>
              getWorkoutById(doc.id).onSnapshot(
                (documentSnapshot) => documentSnapshot.data().calories
              )
            )
            .reduce((x, y) => x + y, 0);
        });
      }
    return (
        <View>
            <Text>Fitness Tracker</Text>
        </View>
    )
}