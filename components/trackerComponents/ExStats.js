import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Divider } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LineChart, Grid, YAxis, XAxis } from "react-native-svg-charts";
import { G, Circle, Line, Rect } from "react-native-svg";
import * as scale from "d3-scale";
import * as shape from "d3-shape"
import moment from "moment";
import { statsByEx } from "../../helpers/tracker"; 

const ExStats = ({ item, hist, pb, del }) => {
  const stat = statsByEx(
    item,
    hist.map((doc) => doc.data)
  );
  const chartData =
    stat?.exHist &&
    [...stat.exHist].sort((x, y) => x.date.seconds - y.date.seconds);

    // const data = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]
    const data = chartData.map(item => item.exs)

  const deleteEx = () => del(item);
  console.log(data)

  const Decorator = ({ x, y, data }) => {
    return data.map((value, index) => (
      <Circle
        key={index}
        cx={x(index)}
        cy={y(value)}
        r={4}
        stroke={"rgb(134, 65, 244)"}
        fill={"white"}
      />
    ));
  };

  const Tooltip = ({ x, y }) => (
    <G
        x={ x(0)  }
        key={ 'tooltip' }
        onPress={ () => console.log('tooltip clicked') }
    >
        <G y={ 50 }>
            <Rect
                height={ 20 }
                width={ 40 }
                stroke={ 'grey' }
                fill={ 'white' }
                ry={ 10 }
                rx={ 10 }
            />
            <Text
                x={ 75 / 2 }
                dy={ 20 }
                alignmentBaseline={ 'middle' }
                textAnchor={ 'middle' }
                stroke={ 'rgb(134, 65, 244)' }
            >
                { data[1] }
            </Text>
        </G>
        <G x={ 75 / 2 }>
            <Line
                y1={ 50 + 40 }
                y2={ y(data[ 1 ]) }
                stroke={ 'grey' }
                strokeWidth={ 2 }
            />
            <Circle
                cy={ y(data[ 1 ]) }
                r={ 6 }
                stroke={ 'rgb(134, 65, 244)' }
                strokeWidth={ 2 }
                fill={ 'white' }
            />
        </G>
    </G>
)

  return (
    <View
      style={{ marginVertical: 10, justifyContent: "center", marginLeft: 10 }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 7,
        }}
      >
        <Image
          source={
            item.data.photo
              ? { uri: item.data.photo }
              : require("../../assets/boxing.jpeg")
          }
          style={{ height: 40, width: 40, marginRight: 10, borderRadius: 8 }}
        />
        <Text style={{ fontSize: 16, fontWeight: "bold", width: "77%" }}>
          {item.data.name}
        </Text>
        <TouchableOpacity
          onPress={() => {
            deleteEx();
          }}
          style={{
            alignSelf: "flex-start",
            fontSize: 13,
            alignItems: "center",
          }}
        >
          <MaterialCommunityIcons name="delete" size={17} color="crimson" />
        </TouchableOpacity>
      </View>
      <Divider />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 10,
          marginBottom: 15,
        }}
      >
        <View style={{ width: "33%", alignItems: "center" }}>
          <MaterialCommunityIcons
            name="clock-time-ten"
            color="maroon"
            size={22}
          />
          <Text style={{ color: "gray" }}>Last completed</Text>
          <Text>
            {stat.date
              ? moment(new Date(stat.date)).format("DD MMMM YYYY")
              : "No Attempt"}
          </Text>
        </View>
        <Divider orientation="vertical" />
        <View style={{ width: "33%", alignItems: "center" }}>
          <MaterialCommunityIcons name="podium" size={22} color="goldenrod" />
          <Text style={{ color: "gray" }}>Personal Best</Text>
          <Text>{`${pb} kg`}</Text>
        </View>
        <Divider orientation="vertical" />
        <View style={{ width: "33%", alignItems: "center" }}>
          <MaterialCommunityIcons
            name="weight-lifter"
            size={22}
            color="green"
          />
          <Text style={{ color: "gray" }}>Sets Completed</Text>
          <Text>{stat.exStats}</Text>
        </View>
      </View>

      {stat.exHist ? (
        <View style={{ flex: 1 }}>
          <Text style={{ textAlign: "center" }}>Progress Chart</Text>
          <View style={{ flex: 1, flexDirection: "row", padding: 5 }}>
            <YAxis
              data={data}
              style={{ width: "6%", justifyContent: "center" }}
              contentInset={{ top: 10, bottom: 10 }}
              svg={{ fontSize: 10, fill: "grey" }}
              formatLabel={(value, index) => value}
              numberOfTicks={8}
            />
            <LineChart
              style={{ flex: 1,  height: 150, width: "96%" }}
              data={data}
              svg={{ stroke: "rgb(134, 65, 244)" }}
              contentInset={{ top: 10, bottom: 10 }}
              yMax={pb }
              numberOfTicks={8}
              curve={ shape.curveLinear }
  
            >
              <Grid />
              {/* <Tooltip /> */}
            </LineChart>
          </View>{
          <XAxis
            style={{ marginBottom: 12, width: "96%", alignSelf: "flex-end" }}
            data={data}
            formatLabel={(value, index) =>
              
              moment(chartData[index].date.seconds * 1000).format("DD-MMM")
            }
            
            svg={{ fontSize: 10, fill: "black" }}
            contentInset={{ left: 30, right: 30 }}
            spacingInner={0.2}
          />}
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            height: 150,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 18 }}>No Workout Data</Text>
        </View>
      )}
      <Divider />
    </View>
  );
};

export default ExStats;
