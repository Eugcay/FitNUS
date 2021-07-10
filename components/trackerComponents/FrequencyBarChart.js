import React from "react";
import { View, Text } from "react-native";
import { BarChart, XAxis, YAxis, Grid } from "react-native-svg-charts";
import { Defs, LinearGradient, Stop, Line } from "react-native-svg";
import moment from "moment";

import * as scale from "d3-scale";

export const FrequencyBarChart = (props) => {
  const type = props.type;
  const data = props.data
  const goal = props?.goal || 2;

  const yaxis = type === "total" ? data : data.map((week) => week.count);
  let max = yaxis.reduce((x, y) => Math.max(x, y), 0);
  
  const yVals = [];

  for (let i = 0; i <= max; i = i + 1) {
    yVals.push(max - i);
  }

  const weekToString = (week) => {
    return moment(week.start).format("DD MMM");
  };

  const Gradient = () => (
    <Defs key={"gradient"} rx={5}>
      <LinearGradient id={"gradient"} x1={"0%"} y={"0%"} x2={"0%"} y2={"100%"} >
        <Stop offset={"0%"} stopColor={"coral"} />
        <Stop offset={"100%"} stopColor={"indianred"} />
      </LinearGradient>
    </Defs>
  );
  const HorizontalLine = (({ y }) => (
    <Line
        key={ 'goal' }
        x1={ '0%' }
        x2={ '100%' }
        y1={ y(goal) }
        y2={ y(goal) }
        stroke={ 'grey' }
        strokeDasharray={ [ 4, 8 ] }
        strokeWidth={ 2 }
    />
))

  return (
    <View style={{ flex: 1, height: 270 }}>
      <Text style={{ fontSize: 18, textAlign: "center" }}>
        Workout Frequency
      </Text>
      <View style={{ flex: 1, flexDirection: "row", padding: 5 }}>
        <YAxis
          style={{ width: "4%", justifyContent: "center" }}
          data={yVals}
          svg={{ fill: "rgba(134, 65, 244, 0.8)" }}
          spacingInner={0.5}
          scale={scale.scaleBand}
          formatLabel={(value, index) => value}
        />
        <BarChart
          style={{ width: "95%" }}
          data={type === "total" ? data : data.map((wk) => wk.count)}
          svg={{ strokeWidth: 2, fill: "url(#gradient)" }}
          spacing={0.2}
          spacingInner={0.3}
          scale={scale.scaleBand}
          gridMin={0}
          contentInset={{ top: 10, bottom: 10 }}
          animate={true}
        >
          <Grid
            direction={Grid.Direction.HORIZONTAL}
            svg={{ fill: "lightgray" }}
          />
          <Gradient />
          {type === 'monthly' && <HorizontalLine />}
        </BarChart>
      </View>
      <XAxis
        style={{ marginBottom: 12, width: "96%", alignSelf: "flex-end" }}
        data={data}
        scale={scale.scaleBand}
        formatLabel={(value, index) =>
          type === "total"
            ? moment().month(index).format("MMM")
            : weekToString(data[index].week)
        }
        svg={{
          fill: "black",
        }}
        spacingInner={0.2}
      />
    </View>
  );
};
