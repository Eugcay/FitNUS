import React from "react";
import { View, ScrollView, Image, StyleSheet } from "react-native";
import ProfilePicture from "../components/trackerComponents/profilePicture";
//import MenuButton from "../components/trackerComponents/menuButton";
import Greeting from "../components/trackerComponents/greeting";
import DataPicker from "../components/trackerComponents/dataPicker";
import DayPicker from "../components/trackerComponents/dayPicker";
import StatChart from "../components/trackerComponents/statChart";
import StatBar from "../components/trackerComponents/statBar";
import Donut from "../components/Donut";

const Tracker = () => {
  return (
    <ScrollView>
      <ProfilePicture />
      <View style={styles.greeting}>
        <Greeting />
      </View>
      {/* <MenuButton /> */}
      <View style={styles.datapicker}>
        <DataPicker />
      </View>
      <View style={styles.daypicker}>
        <DayPicker />
      </View>
      <View style={styles.statchart}>
        <Donut />
        {/* <StatChart /> */}
      </View>
      <View style={styles.statbar}>
        <StatBar />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  greeting: {
    paddingLeft: 20,
    paddingTop: 10,
  },
  datapicker: {
    paddingTop: 10,
  },
  daypicker: {
    paddingTop: 10,
  },
  statchart: {
    paddingTop: 0,
    alignContent: 'center'
  },
  statbar: {
    paddingTop: 0,
    alignContent: 'center',
    height: 150,
  }
});

export default Tracker;

// export default function Tracker({ navigation }) {
//   const [calories, setCalories] = useState(0);
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const getCalories = async () => {
//         await getUserHistory().onSnapshot(snapshot => {
//             const cal = snapshot.data().calories ? snapshot.data().calories : 0
//             setCalories(cal)
//             console.log(calories)
//         })
//         setLoading(false)
//     }

//     getCalories()
//   }, []);

//   return (
//     <View>
//       { loading ? (<Text>Fitness Tracker</Text>) : (<Text>{calories}</Text>)}
//     </View>
//   );
// }
