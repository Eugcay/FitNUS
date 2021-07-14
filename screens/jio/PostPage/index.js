import React, { Component } from 'react'
import { Text, ScrollView } from 'react-native'
import Post from '../../../components/jioComponents/Post'

const PostPage = ({navigation, route}) => {
    return (
        <ScrollView>
            <Post navigation={navigation} item={route.params.item} currUser={route.params.currUser}/>
        </ScrollView>
    )
}

export default PostPage
