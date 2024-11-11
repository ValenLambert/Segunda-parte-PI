import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { StyleSheet } from 'react-native'

export default class Profile extends Component {
  render() {
    return (
      <View style= {styles.container}>
        <Text>Profile</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
      alignItems: "center",
      backgroundColor: "#DFF2EB",
      flex: 1,
      
  }})