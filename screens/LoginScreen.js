import React from 'react';
import { Text, View, Button, TextInput, StyleSheet, Alert, ScrollView, Image, KeyboardAvoidingView } from 'react-native';
import * as firebase from 'firebase';
import firebaseConfig from '../helper/firebaseConfig'
import CustomTextInput from '../components/CustomTextInput';

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

    _changeInput(value, target) {
      this.setState({ target: value })
    }

    render() {
        return (
            <ScrollView style={styles.container} contentContainerStyle={{flexGrow: 1}}>
              <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <View style={styles.input_container}>
                  <Image
                    style={{width: 150, height: 150}}
                    source={require('../assets/images/CDB.png')}
                  />
                  <TextInput
                    style={styles.login_input}
                    placeholder='Email'
                    placeholderTextColor='#ffffff'
                    onChangeText={(text) => this.setState({ mail: text })}/>
                  <TextInput
                    style={styles.login_input}
                    secureTextEntry={true}
                    placeholderTextColor='#ffffff'
                    placeholder='Mot de passe'
                    onChangeText={(pass) => this.setState({ password: pass })}/>
                  <Button title="Se connecter" onPress={() => this._doConnect()}/>
                  <Button title="S'inscrire" onPress={() => this._goToSignUp()}/>
                </View>
              </KeyboardAvoidingView>
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
