import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

const MenuButton = () => {

    return (
        <View>
            <TouchableOpacity 
                onPress={() => alert("hello!")}
                style={styles.menuButton}
            >
                <Ionicons name="ellipsis-horizontal-circle" size={24} color="black" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    menuButton: {
        marginTop: 20,
        width: 50,
        height: 50,
        borderRadius: 100,
        alignSelf: "center",
    }
})

export default MenuButton;