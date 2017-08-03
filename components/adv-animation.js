import React, { Component } from 'react';
import { Text, View, AppRegistry, Image, ScrollView, Dimensions, Animated } from 'react-native';
import styled from 'styled-components/native';
import Moment from './moment.js';

const {width, height} = Dimensions.get("window");
// 4 images

const Items = [
  { image: require('../images/drink1.jpg'), title: "Vokda Cran" },
  { image: require('../images/drink2.jpg'), title: "Old Fashion"},
  { image: require('../images/drink3.jpg'), title: "Mule" },
  { image: require('../images/drink4.jpg'), title: "Strawberry Daiquiri" }
];

const Separator = styled(View)`
    background-color: #000;
    position: absolute;
    top: 0;
    bottom: 0;
    width: 5px;
`;
const getSeparator = (i) => {
    return <Separator 
                key={i}
                style={{left: (i-1) * width - 2.5}}
            />
}

const getInterpolate = (animatedScroll, i) => {
  const inputRange = [
    i - 1 * width,
    i * width,
    (i + 1) * width
  ]
  const outputRange = i === 0 ? [0,0,150] : [-300, 0, 150];
  return animatedScroll.interpolate({
    inputRange,
    outputRange,
    extrapolate: 'clamp'
  });
}

export default class Animation extends Component {
  constructor(props, context) {
    super(props, context);
     this.state = {
       animatedScroll: new Animated.Value(0)
    }
  }
  

  render() {
    return (
      <View>
        <ScrollView
          pagingEnabled
          horizontal
          scrollEventThrottle={16}
          onScroll={
            Animated.event([
              {
                nativeEvent: {
                  contentOffset: {
                    x: this.state.animatedScroll
                  }
                }
              }
            ])
          }
        >
          {Items.map((item, i) => {
            return( 
              <Moment 
                key={i}
                translateX={getInterpolate(this.state.animatedScroll, i)}                
                {...item}
              />)
          })}
          {Array.apply( null, {length: Items.length + 1 }).map((_, i) => {
            return getSeparator(i)
          })}
        </ScrollView>
      </View>
    );
  }
}