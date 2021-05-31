import React from "react";
import { View, Dimensions, StyleSheet} from "react-native";
import Svg, {Circle} from "react-native-svg"

// import { PieChart, ProgressChart } from "react-native-chart-kit";
import { VictoryPie } from "victory-native";

const StatChart = () => {
  const data = [, , , , 0.75];
  return (
      <View >
        <Svg width={'100%'} height={300}>
        <Circle cx={Dimensions.get('window').width/2} cy={150} r={55} fill="#FFF01A"/>
        <VictoryPie
          colorScale={["#0B2A59"]}
          data={[{ x: "560", y: 75 }]}
          startAngle={0}
          endAngle={270}
          labels={({ datum }) => `Calories Burnt: ${datum.x}`}
          innerRadius={80}
          labelRadius={({ innerRadius }) => innerRadius - 5}
          height={300}
          width={Dimensions.get('window').width}
          padding={10}
          style={{
            labels: {
              fontSize: 12,
              fill: "#A6A6A6",
              fontWeight: 'bold'
            },
          }}
        />
      </Svg>
      </View>
      /* <ProgressChart
        data={data}
        width={Dimensions.get("window").width}
        height={200}
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#F2F2F2",
          backgroundGradientTo: "#F2F2F2",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(55, 205, 0, ${opacity})`,
          style: {
            borderRadius: 80,
            paddingRight: 50,
          },
        }}
      />
    <Text style={styles.text}>Calories</Text> */
  );
};

// const styles = StyleSheet.create({
//   text: {
//     position: "absolute",
//     top: "45%",
//     left: "33%",
//     width: "100%",
//     height: "100%",
//     fontWeight: 'bold',
//   },
// });

export default StatChart;
