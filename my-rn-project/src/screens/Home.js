import { Text, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { auth } from '../firebase/config'

export default class Home extends Component {


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Bienvenido/a: </Text>
        <Text>{auth.currentUser.email}</Text>
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5EDED",
    flex: 1,
    padding: 25,
    alignContent: "space-between"
  },
  title: {
    fontSize: 26,
    fontWeight: "bold"
  },
  logout: {
    backgroundColor: "#FF6F6F",
    margin: 5,
    borderRadius: 5,
    fontSize: 16,
    padding: 5
  }
})