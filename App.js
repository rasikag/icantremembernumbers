import React, { Component } from 'react';
import { Text, View } from 'react-native';
import SplashScreen from 'react-native-splash-screen'

export default class App extends Component {

  componentDidMount() {
    SplashScreen.hide();
  }
  
  render() {
    return (
      <View>
        <Text>Hello</Text>
      </View>
    )
  }
}

