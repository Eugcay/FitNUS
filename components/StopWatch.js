import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

export default class StopWatch extends Component {
    constructor(props) {
        super(props)

        this.state = {
            hrs: 0,
            min: 0,
            sec: 0,
            msec: 0,
            start: false
        },

        this.session = null
    }

    twoDigits = (num) => {
        return num <= 9 ? `0${num}` : num
    }

    handleToggle = () => {
        this.setState({
            start: !this.state.start
        },
        () => this.start()
        )
    }

    start = () => {
        if (this.state.start) {
            this.session = setInterval(() => {
                if (this.state.msec !== 98) {
                    this.setState({
                        msec: this.state.msec + 7
                    })
                } else if (this.state.sec !== 59) {
                    this.setState({
                        msec: 0,
                        sec: this.state.sec + 1
                    })
                } else if (this.state.min !== 59) {
                    this.setState({
                        msec: 0,
                        sec: 0,
                        min: this.state.min + 1
                    })
                } else {
                    this.setState({
                        msec: 0,
                        sec: 0,
                        min: 0,
                        hrs: this.state.hrs + 1
                    })
                }
            }, 60)
        } else {
            clearInterval(this.session)
        }
    }

    render() {
        return (
            <View>
            <View style={styles.contianer}>
                {this.state.hrs > 0 && <Text>{this.twoDigits(this.state.hrs)} :</Text>}
                <Text>{this.twoDigits(this.state.min)} :</Text>
                <Text>{this.twoDigits(this.state.sec)} :</Text>
                {this.state.hrs === 0 && <Text>{this.twoDigits(this.state.msec)}</Text>}
            </View>
            <TouchableOpacity onPress={() => this.handleToggle()}>
              <AntDesign name={this.state.start ? 'pausecircle' : 'play'} size={24} color="black" />
            </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    contianer: {
        display: 'flex',
        flexDirection: 'row',
    }
})
