import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Post from '../components/jioComponents/Post'

const PostPage = (props) => {
    return (
        <View>
            <Post navigation={props.navigation} item={props.item} user={props.currUser}/>
        </View>
    )
}

export default PostPage
