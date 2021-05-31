import React from "react";
import { Text, View, StyleSheet, fontFamily} from "react-native";

const HeaderTitle = () => {
    const titleLine1 = "Select";
    const titleLine2 = "Workout!";

    return (
        <View>
            <Text> {titleLine1} </Text>
            <Text> {titleLine2} </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    words: {
        fontWeight: 'bold',
        fontFamily: "Bungee-Regular"
    }
})

export default HeaderTitle;
    