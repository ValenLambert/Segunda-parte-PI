import { Text, View, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import Form from '../components/Form';
import { StyleSheet } from 'react-native';

export default class Login extends Component {
    constructor (props) {
        super(props);
    }

    componentDidMount (){
        console.log("mount")
    }

    componentDidUpdate (){
        console.log("update")
    }

    componentWillUnmount(){
        console.log("unmount")
    }

    register () {
       this.props.navigation.navigate("Register")
    }


  render() {
    return (
      <View style={styles.container}>
    
        <Form navigation={this.props.navigation}/>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <Text style={styles.register1}>O sino</Text>
        <TouchableOpacity onPress = {()=> this.register()}>
            <Text style={styles.register}>!Registrate!</Text>
        </TouchableOpacity> 
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
      alignItems: "center",
      backgroundColor: "#DFF2EB",
      flex: 1,
      padding: 200,
      
  },
  
  register1: {
    width: 45
},
  register: {
      borderWidth: 0.5,
      borderColor: "#7AB2D3",
      backgroundColor: "lightblue"
  }
}) 