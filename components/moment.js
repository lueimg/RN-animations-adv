import React, { Component } from 'react';
import { Text, View, Animated, Dimensions, TouchableWithoutFeedback, StyleSheet } from 'react-native';

import styled from 'styled-components/native';

const {width, height} = Dimensions.get("window");

const Container = styled(View)`
    width: ${width};
    height: ${height};
    overflow: hidden;
`;

const TitleWrap = styled(View)`
    justify-content: center
`;

const TextWrap = styled(View)`
    background: rgba(0,0,0, .5);
    padding-vertical: 10px;

`;

const TextEl = styled(Text)`
    background-color: transparent;
    font-size: 30px;
    color: #fff;
    text-align: center;
`;



export default class Moment extends Component {
  render() {

    const animatedStyle = {
        transform: [
            { translateX: this.props.translateX }
        ]
    }

    return (
      <Container>
        <Animated.Image 
            source={this.props.image}
            style={[styles.image, animatedStyle]}
            resizeMode="cover"
        />
        <TitleWrap style={StyleSheet.absoluteFill}>
            <TextWrap>
                <TextEl>
                    {this.props.title}
                </TextEl>
            </TextWrap>
        </TitleWrap>
      </Container>
    );
  }
};


const styles = StyleSheet.create({
    image: {
        flex: 1,
        width: null,
        height: null
    }
})