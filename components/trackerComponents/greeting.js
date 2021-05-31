import React from "react";
import { Text, View, StyleSheet} from "react-native";

const Greeting = () => {
    const titleLine1 = "Hello Lydia,";
    const titleLine2 = "Keep up the good work!";

    return (
        <View>
            <Text style={styles.line1}> {titleLine1} </Text>
            <Text style={styles.line2}> {titleLine2} </Text>
        </View>
    );
}

const styles=StyleSheet.create({
    line1: {
        fontSize: 20,
        fontWeight: "bold"
    },
    line2: {
        fontSize: 15
    }
})

export default Greeting;