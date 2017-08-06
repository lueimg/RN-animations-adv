import React, { Component } from 'react';
import { Text, View, StyleSheet, Animated } from 'react-native';


const CenterNonFilled = () => {
    return (
        <View style={[StyleSheet.absoluteFill, styles.fit ]}>
            <View style={[styles.leftHeart, styles.heartShape, styles.emptyFill]}></View>
            <View style={[styles.rightHeart, styles.heartShape, styles.emptyFill]}></View>
        </View>
    )
}

export default class Heart extends Component {

  render() {

    const {filled, style} = this.props;

    const fillStyle = filled ? styles.filledHeart: styles.empty;

    // const CenterNonFilled = undefined;
    // const fillStyle = undefined;

    return (
      <Animated.View {...this.props} style={[styles.heart, style]}>
        <View style={[styles.leftHeart, styles.heartShape, fillStyle]}></View>
        <View style={[styles.rightHeart, styles.heartShape, fillStyle]}></View>
        {!filled &&  <CenterNonFilled />}
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
    heart: {
        width: 50,
        height: 50,
        backgroundColor: 'transparent'
    },
    heartShape: {
        width: 30,
        height: 45,
        position: 'absolute',
        top: 0,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
    },
    filledHeart: {
        backgroundColor: '#e31745'
    },
    
    emptyFill: {
        backgroundColor: '#fff'
    },
    empty: {
        backgroundColor: '#ccc'
    },

    rightHeart: {
        transform: [
            { rotate: '45deg'},
        ],
        right: 5
    },
    leftHeart: {
       transform: [
           { rotate: '-45deg'}
       ],
        left: 5
    },
    fit: {
       transform : [
           { scale: .9}
       ]
    }
})