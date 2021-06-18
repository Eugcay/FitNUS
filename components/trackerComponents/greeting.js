import React from "react";
import { Text, View, StyleSheet} from "react-native";

const Greeting = (props) => {
    const user = props.user
    const titleLine1 = `Hello ${user?.name ? user.name : ''},`;
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