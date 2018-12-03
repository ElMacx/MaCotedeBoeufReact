// Loading.js
import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import * as firebase from 'firebase';
import firebaseConfig from '../helper/firebaseConfig'

export default class LoadingScreen extends React.Component {

  componentDidMount() {
    firebase.initializeApp(firebaseConfig);
    firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? 'AppNavigator' : 'LoginStackNavigator')
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
        <ActivityIndicator size="large" />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
