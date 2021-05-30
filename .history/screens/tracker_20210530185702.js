import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { getUserHistory } from "../Api/userApi";
import { getWorkoutById } from "../Api/workoutApi";

export default function Tracker({ navigation }) {
  const [calories, setCalories] = useState(0);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getCalories = async () => { 
        await getUser().onSnapshot(snapshot => {
            const cal = snapshot.data().calories
            setCalories(cal)
            console.log(calories)
        })

        setLoading(false)
    }

    getCalories()
  }, []);
  return (
    <View>
      { loading ? (<Text>Fitness Tracker</Text>) : (<Text>{calories}</Text>)}
    </View>
  );
}
