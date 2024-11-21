import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { StyleSheet } from 'react-native'

export default class NuevoPost extends Component {
  render() {
    return (
      <View style= {styles.container}> 
        <Text style= {styles.texto}> Nuevo Post </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
      alignItems: "center",
      backgroundColor: "#F5EDED",
      flex: 1,
      
  },
  texto: {
    borderColor: "#7FA1C3",
    backgroundColor: "#E2DAD6",
    margin: 36,
    borderRadius: 5,
    fontSize: 18,
    padding: 5,
    color: "#000"
  },
})