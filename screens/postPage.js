import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Post from '../components/jioComponents/Post'

const PostPage = ({navigation, route}) => {
    return (
        <View>
            <Post navigation={navigation} item={route.params.item} currUser={route.params.currUser}/>
        </View>
    )
}

export default PostPage
