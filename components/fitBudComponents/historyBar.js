import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
//Need to import data from storage

const HistoryBar = () => {
    const title = "History:";
    let historyData = []; //Have to import from firebase
    let longPress = alert("stoptouchingme");

    listEmptyComponent = () => (
        <View
          style={{
            borderWidth: 1,
            height: '50%',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>History has not been made</Text>
        </View>
      );

      return (
        <View>
          {historyData.length > 0 && (
            <FlatList
            style={{ flex: 1 }}
            data={historyData}
            ListHeaderComponent={() => title}
            ListEmptyComponent={() => listEmptyComponent()}
            //ItemSeparatorComponent={() => this.listSeparator()}
            //Item properties: Workout Object
            //To display, name and picture, onLongPress, go to Workout object.
            renderItem={({ item }) => (
                <TouchableOpacity onLongPress={longPress}>
                    <Text style={{ fontSize: 18, fontWeight: '600' }}>
                    {item.name}
                    </Text>
                </TouchableOpacity>
            )}
            />
          )}
        </View>
      );
}

export default HeaderTitle;
    