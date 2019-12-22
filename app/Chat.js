import React, { Component } from 'react'
import { Text, View } from 'react-native'
import {GiftedChat} from 'react-native-gifted-chat'


export default class Chat extends Component {
    render() {
        return (
            <View>
                <Text style={{marginTop: 60}} >hello sss {this.props.user} </Text>
            </View>
        )
    }
}

Chat.defaultProps = {
   user: 'Guest',
 };