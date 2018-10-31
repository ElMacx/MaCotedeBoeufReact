import React from 'react';
import { Text, View, Button, TextInput, StyleSheet, Alert } from 'react-native';
import * as firebase from 'firebase';
import firebaseConfig from '../helper/firebaseConfig'

export default class LoginScreen extends React.Component {

    constructor(props) {
      super(props)
      this.state = {
        mail: '',
        password: ''
      }
    }

    componentDidMount() {
      firebase.initializeApp(firebaseConfig);
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.props.navigation.navigate("AppNavigator")
        }
      })
    }

    _doConnect() {
      console.log('Mail', this.state.mail)
      console.log('Pass', this.state.password)
      firebase.auth().signInWithEmailAndPassword(this.state.mail, this.state.password)
        .then(() => {
          this.props.navigation.navigate("AppNavigator")
        })
        .catch(e => {
          Alert.alert(
            'Erreur',
            'Votre email ou votre mot de passe est erroné',
            [{ text: 'Ok', onPress: () => {} }]
          )
        })
    }

    _goToSignUp() {
      this.props.navigation.navigate('SignUp')
    }

    render() {
        return (
            <View style={styles.container}>
              <TextInput
                style={styles.login_input}
                placeholder='Email' onChangeText={(text) => this.setState({ mail: text })}/>
              <TextInput
                style={styles.login_input}
                secureTextEntry={true}
                placeholder='Mot de passe'
                onChangeText={(pass) => this.setState({ password: pass })}/>
              <Button title="Se connecter" onPress={() => this._doConnect()}/>
              <Button title="S'inscrire" onPress={() => this._goToSignUp()}/>
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
  login_input: {
      marginBottom: 15,
      borderWidth: 1,
      borderColor: 'black',
      width: 250,
      height: 50,
      padding: 15
  },
})
