import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animation from './components/adv-animation.js';

export default class App extends React.Component {
  render() {
    return (
      <Animation></Animation>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
