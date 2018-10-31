import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, Text } from 'react-native';

export default class DiscountScreen extends React.Component {
  static navigationOptions =({navigation})=> ({
      headerRight:(
          <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
            <Text>Add</Text>
          </TouchableOpacity>
      )
  });
  render() {
    return (
      <ScrollView style={styles.container}>
        {/* Go ahead and delete ExpoLinksView and replace it with your
           * content, we just wanted to provide you with some helpful links */}
        <ExpoLinksView />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
