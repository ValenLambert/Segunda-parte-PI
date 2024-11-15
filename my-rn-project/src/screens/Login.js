import { Text, View, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import Form from '../components/Form';
import { StyleSheet } from 'react-native';
import { auth } from '../firebase/config'; 


export default class Login extends Component {
  constructor(props) {
    super(props);
  }


  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.props.navigation.navigate("Loggeado")
      } 
    });
  }

  componentDidUpdate() {
    console.log("update")
  }

  componentWillUnmount() {
    console.log("unmount")
  }

  register() {
    this.props.navigation.navigate("Register")
  }


  render() {
    return (
      <View style={styles.container}>

        <Form navigation={this.props.navigation} />
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <Text style={styles.text1}>Si aun no tiene cuenta:</Text>
        <TouchableOpacity onPress={() => this.register()}>
          <Text style={styles.register}>Registrate</Text>
        </TouchableOpacity>
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

  register: {
    borderColor: "#7FA1C3",
    backgroundColor: "#608BC1",
    margin: 5,
    borderRadius: 5,
    fontSize: 16,
    padding: 5
  },
  text1: {
    fontSize: 16,
    textDecorationLine: "underline"
  },

}) 