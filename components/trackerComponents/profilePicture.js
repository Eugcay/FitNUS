import React from 'react';
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';

const ProfilePicture = () => {
    return (
        <View>
            <TouchableOpacity>
                <Image 
                    source={require("../../assets/user.png")} 
                    style={styles.dp}
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    dp: {
        marginTop: 20,
        width: 70,
        height: 70,
        borderRadius: 100,
        alignSelf: "center",
        backgroundColor: "#D3D3D3"
    }
});

export default ProfilePicture;

    
