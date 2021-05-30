import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const FitBudSuggests = () => {
    const title = "Fit-Bud Suggests:";
    let onPress = () => alert("pressmemememe")

    let suggestion = "Suggestion"

    // suggestion = () => (
    //     //get workout object from database
    //     <View>
    //       <Text>History has not been made</Text>
    //     </View>
    // );

    return (
        <View>
            <View>
                <Text>title</Text>
            </View>
            <TouchableOpacity onPress={onPress}>
                    <Text style={{ fontSize: 18, fontWeight: '600' }}>
                        suggestion
                    </Text>
            </TouchableOpacity>
        </View>
    )

}

export default FitBudSuggests;
    