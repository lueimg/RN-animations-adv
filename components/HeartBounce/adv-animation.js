import React, { Component } from 'react';
import { StyleSheet, Text, View, AppRegistry, Image, ScrollView, Dimensions, Animated, TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';

import Heart from './Heart';

const { width, height } = Dimensions.get("window");

export default class Animation extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      liked: false,
      scale: new Animated.Value(0),
      animations: [
        new Animated.Value(0),
        new Animated.Value(0),
        new Animated.Value(0),
        new Animated.Value(0),
        new Animated.Value(0),
        new Animated.Value(0)
      ]
    }
  }

  triggerLike = () => {
    this.setState({ liked: !this.state.liked }, () => {
      Animated.spring(this.state.scale, {
        toValue: 2,
        friction: 3
      }).start(() => {
        this.state.scale.setValue(0);
      })
    });

  }

  render() {

    const bouncyHeart = this.state.scale.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [1, .8, 1]
    })

    const heartButtonStyle = {
      transform: [
        { scale: bouncyHeart }
      ]
    }

    return (
      <View style={styles.container}>
        <View>
          <TouchableWithoutFeedback onPress={this.triggerLike}>
            <Animated.View style={heartButtonStyle}>
              <Heart filled={this.state.liked}></Heart>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})