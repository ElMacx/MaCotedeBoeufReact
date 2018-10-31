import React from 'react';
import { Text, View, Button, TextInput, StyleSheet, Alert } from 'react-native';
import * as firebase from 'firebase';

export default class SignUpScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      first_name: null,
      last_name: null,
      mail: null,
      phone_number: null,
      password: null,
      confirm_password: null
    }
  }

  _checkPasswords() {
    return (this.state.password === this.state.confirm_password
      && this.state.password && this.state.confirm_password)
  }

  _checkFields() {
    return (this.state.first_name && this.state.last_name && this.state.mail && this.state.phone_number)
  }

  _addUserInDatabase(user) {
    return fetch(`https://macotedeboeuf.firebaseio.com/users.json`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstname: this.state.first_name,
        lastname: this.state.last_name,
        mail: this.state.mail,
        phone: this.state.phone_number,
      })
    })
  }

  _doSignUp() {
    if (this._checkFields() === null) {
        Alert.alert('Erreur', 'Tous les champs doivent etre remplis et valide', [{ text: 'Ok', onPress: () => {} }])
        return;
    } else if (this._checkPasswords() === null) {
        Alert.alert('Erreur', 'Les mots de passe ne correspondent pas', [{ text: 'Ok', onPress: () => {} }])
        return;
    } else {
        firebase.auth().createUserWithEmailAndPassword(this.state.mail, this.state.password)
          .then((result) => {
            this._addUserInDatabase(result.user)
            Alert.alert('Succès', 'Inscription réussie', [{ text: 'Ok', onPress: () => {} }])
            firebase.auth().signInWithEmailAndPassword(this.state.mail, this.state.password)
              .then(() => {
                this.props.navigation.navigate("AppNavigator")
              })
              .catch((err) => {
                Alert.alert('Erreur', err.message, [{ text: 'Ok', onPress: () => {} }])
              })
          })
    }
  }

  render() {
      return (
          <View style={styles.container}>
            <TextInput
                placeholder='Prénom'
                style={styles.input}
                onChangeText={(text) => this.setState({ first_name: text })}/>
            <TextInput
                placeholder='Nom'
                style={styles.input}
                onChangeText={(text) => this.setState({ last_name: text })}/>
            <TextInput
                placeholder='Mail'
                keyboardType='email-address'
                style={styles.input}
                onChangeText={(text) => this.setState({ mail: text })}/>
            <TextInput
                placeholder='Téléphone'
                style={styles.input}
                keyboardType='phone-pad'
                onChangeText={(text) => this.setState({ phone_number: text })}/>
            <TextInput
                placeholder='Mot de passe'
                style={styles.input}
                secureTextEntry={true}
                onChangeText={(text) => this.setState({ password: text })}/>
            <TextInput
                placeholder='Confirmer le mot de passe'
                style={styles.input}
                secureTextEntry={true}
                onChangeText={(text) => this.setState({ confirm_password: text })}/>
            <Button title="S'inscrire" onPress={() => this._doSignUp()}/>
          </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
      marginBottom: 15,
      borderWidth: 1,
      borderColor: 'black',
      width: 250,
      height: 50,
      padding: 15
  },
})
