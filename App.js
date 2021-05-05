import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Welcome from './Screens/Welcome'

export default class App extends React.Component{
  render(){
    return(
      <View style={styles.container}>
        <Welcome/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor:'royalblue'
  },
});