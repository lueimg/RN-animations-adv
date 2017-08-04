import React, { Component } from 'react';
import { Text, View, Animated, Dimensions, TouchableWithoutFeedback, StyleSheet } from 'react-native';

import styled from 'styled-components/native';

const { width, height } = Dimensions.get("window");

const Container = styled(View) `
    width: ${width};
    height: ${height};
    overflow: hidden;
`;

const TitleWrap = styled(Animated.View) `
    justify-content: center
`;

const TextWrap = styled(Animated.View) `
    background: rgba(0,0,0, .5);
    padding-vertical: 10px;

`;

const TextEl = styled(Text) `
    background-color: transparent;
    font-size: 30px;
    color: #fff;
    text-align: center;
`;


export default class Moment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            scale: new Animated.Value(1)
        }
    }

    componentWillMount = () => {
        this.bgFadeInterpolate = this.state.scale.interpolate({
            inputRange: [.9 , 1],
            outputRange: ["rgba(0,0,0, .3)","rgba(0,0,0, 0)" ]
        });

        this.textFade = this.state.scale.interpolate({
            inputRange: [.9 , 1],
            outputRange: [0,1]
        })

        this.calloutTranslate = this.state.scale.interpolate({
            inputRange: [.9 , 1],
            outputRange: [0, 150]
        })
    }

    handlePress = () => {
        if (this.props.focused) {
            Animated.timing(this.state.scale, {
                toValue: 1,
                duration: 300
            }).start(() =>  this.props.onFocus(false));
            return;
        }
        Animated.timing(this.state.scale, {
            toValue: .9,
            duration: 300
        }).start(()  => this.props.onFocus(true))
    }
    


    render() {

        const animatedStyle = {
            transform: [
                { translateX: this.props.translateX },
                { scale: this.state.scale }
            ]
        }

        const bgFadeStyle = {
            backgroundColor: this.bgFadeInterpolate
        }

        const textFadeStyle = {
            opacity: this.textFade
        };

        const calloutStyle = {
            transform: [{translateY: this.calloutTranslate}]
        }

        return (
            <Container>
                <Animated.Image
                    source={this.props.image}
                    style={[styles.image, animatedStyle]}
                    resizeMode="cover"
                />
                <TouchableWithoutFeedback onPress={this.handlePress}>
                    <TitleWrap style={[StyleSheet.absoluteFill, bgFadeStyle]}>
                        <TextWrap style={textFadeStyle}>
                            <TextEl>
                                {this.props.title}
                            </TextEl>
                        </TextWrap>
                    </TitleWrap>
                </TouchableWithoutFeedback>
                <Animated.View style={[styles.callout, calloutStyle]}>
                    <View>
                        <TextEl>
                            {this.props.title}
                        </TextEl>
                    </View>
                </Animated.View>
            </Container>
        );
    }
};


const styles = StyleSheet.create({
    image: {
        flex: 1,
        width: null,
        height: null
    },
    callout: {
        height: 150,
        backgroundColor: "rgba(0,0,0, .5)",
        justifyContent: 'center', 
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0
    }
})