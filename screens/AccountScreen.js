import React from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity, Button } from 'react-native';
import * as firebase from 'firebase';


export default class AccountScreen extends React.Component {
  static navigationOptions =({navigation})=> ({
      headerRight:(
          <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
            <Text>Add</Text>
          </TouchableOpacity>
      )
  });

  constructor(props) {
    super(props)
    this.state = {
      firstname: '',
      lastname: '',
      adress: ''
    }
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

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.inputsContainer}>
          <Text style={styles.title_text}>Nom</Text>
          <TextInput
            style={styles.input_st}
            placeholder='Nom de famille' onChangeText={(text) => this.setState({ lastname: text })}/>
          <Text style={styles.title_text}>Prénom</Text>
          <TextInput
            style={styles.input_st}
            placeholder='Prénom' onChangeText={(text) => this.setState({ firstname: text })}/>
          <Text style={styles.title_text}>Adresse</Text>
          <TextInput
              placeholder='Adresse'
              style={styles.input_st}
              onChangeText={(text) => this.setState({ adress: text })}/>
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
    backgroundColor: '#fff'
  },
  inputsContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 15,
    flex: 1,
    flexWrap: 'wrap',
    paddingRight: 5,
    textAlign: 'left'
  },
  input_st: {
      marginBottom: 15,
      borderWidth: 1,
      borderColor: 'black',
      width: 250,
      height: 50,
      padding: 15
  }
});
