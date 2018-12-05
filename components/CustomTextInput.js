import React from 'react'
import { StyleSheet, View, TextInput } from 'react-native'
import { Icon } from 'react-native-elements'

class CustomTextInput extends React.Component {
  constructor(props) {
    super(props)
    console.log(this.props)
  }

  render() {
    return (
      <View style={styles.main_container}>
        <Icon style={styles.searchIcon} name={this.props.icon} size={20} color="#000"/>
        <TextInput
            style={styles.input}
            placeholder="User Nickname"
            placeholderTextColor='#ffffff'
            onChangeText={(searchString) => this.props.inputChange(searchString)}
            underlineColorAndroid="transparent"
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 250,
    height: 50,
  },
  searchIcon: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff',
    color: '#ffffff',
  },
  input: {
      flex: 1,
      paddingTop: 10,
      paddingRight: 10,
      paddingBottom: 10,
      paddingLeft: 0,
      color: '#ffffff',
      borderBottomWidth: 1,
      borderBottomColor: '#ffffff',
  },
})

export default CustomTextInput
