import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { StyleSheet } from 'react-native'

export default class NuevoPost extends Component {
  render() {
    return (
      <View style= {styles.container}> 
        <Text>NuevoPost</Text>
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