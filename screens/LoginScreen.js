import React from 'react';
import { Text, View, Button, TextInput, StyleSheet, Alert, ScrollView, Image } from 'react-native';
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

    _doConnect() {
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
            <ScrollView style={styles.container} contentContainerStyle={{flexGrow: 1}}>
              <View style={styles.input_container}>
                <Image
                  style={{width: 50, height: 50}}
                  source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
                />
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
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3e50',
    flexDirection: 'column',
  },
  input_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  login_input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff',
    width: 250,
    height: 50,
    paddingTop: 20,
    marginBottom: 35,
    marginTop: 15,
    color: '#ffffff',
  },
})
