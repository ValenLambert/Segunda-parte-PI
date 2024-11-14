import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { StyleSheet } from 'react-native'

export default class Busqueda extends Component {
  render() {
    return (
      <View style= {styles.container}>
        <Text>Busqueda</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
      alignItems: "center",
      backgroundColor: "#F5EDED",
      flex: 1,
      
  }})