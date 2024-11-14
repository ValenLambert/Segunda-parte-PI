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
        <Text>Bienvenido/a: {auth.currentUser.username}</Text>
        <TouchableOpacity onPress={()=> this.logout()}>Log out</TouchableOpacity>
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
      
  }})