import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

const MenuButton = () => {

    return (
        <View>
            <TouchableOpacity onPress={() => alert("hello!")}>
                <Ionicons name="ellipsis-horizontal-circle" size={24} color="black" />
            </TouchableOpacity>
        </View>
    );
}

export default MenuButton;
    