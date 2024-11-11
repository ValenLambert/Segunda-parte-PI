import { Text, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { auth } from '../firebase/config'

export default class Home extends Component {

  logout(){
    auth.signOut()
  }
  
  render() {
    return (
      <View style= {styles.container}>
        <Text >Home</Text>
        <TouchableOpacity onPress={()=> this.logout()}>Log out</TouchableOpacity>
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