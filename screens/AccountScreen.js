import React from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity, Button, Alert } from 'react-native';
import * as firebase from 'firebase';

export default class AccountScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      user: {},
    }
  }

  componentDidMount() {
    return fetch(`https://macotedeboeuf.firebaseio.com/users/${firebase.auth().currentUser.uid}.json`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
        this.setState({ user: responseJson })
    })
  }

  _doDisconnect() {
    Alert.alert('Action', 'Voulez-vous vous déconnecter ?', [{ text: 'Oui', onPress: () => {
        firebase.auth().signOut().then(() => {
            this.props.navigation.navigate('LoginStackNavigator')
        }, (error) => {
          Alert.alert('Erreur lors de la déconnexion')
        });
      }
    }, { text: 'Non', onPress: () => {} }])
  }

  _updateUser() {
    const userInfos = firebase.database().ref(`users/${firebase.auth().currentUser.uid}`);
    userInfos.update(this.state.user);
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.inputsContainer}>
          <TextInput
            style={styles.input_st}
            value={this.state.user.lastname}
            placeholder='Nom de famille'
            placeholderTextColor='#ffffff'
            onChangeText={(text) => this.setState(prevState => ({ user: { ...prevState.user, lastname: text } }))}/>
          <TextInput
            style={styles.input_st}
            value={this.state.user.firstname}
            placeholder='Prénom'
            placeholderTextColor='#ffffff'
            onChangeText={(text) => this.setState(prevState => ({ user: { ...prevState.user, firstname: text } }))}/>
          <TextInput
              placeholder='Téléphone'
              style={styles.input_st}
              value={this.state.user.phone}
              keyboardType='phone-pad'
              placeholderTextColor='#ffffff'
              onChangeText={(text) => this.setState({ user: { ...prevState.user, phone: text } })}/>
          <Button title='Sauvegarder' onPress={() => this._updateUser()}/>
          <Button title='Se déconnecter' onPress={() => this._doDisconnect()}/>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#2c3e50'
  },
  inputsContainer: {
    flex: 1,
    alignItems: 'center'
  },
  input_st: {
      borderBottomWidth: 1,
      borderBottomColor: '#ffffff',
      width: 250,
      height: 50,
      paddingTop: 20,
      marginBottom: 35,
      marginTop: 15,
      color: '#ffffff'
  }
});
