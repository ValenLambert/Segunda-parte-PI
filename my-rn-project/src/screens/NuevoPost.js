import { Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import {auth, db} from '../firebase/config'

export default class NuevoPost extends Component {
    constructor(props){
      super(props)
      this.state=({
        posts: [],
        email: '',
        textoDescriptivo:'',
        error: '',
        likes: '',
        createdAt:''
      })
    }

    submit(posts, textoDescriptivo, likes){
      db.collection('posts').add({
        owner: auth.currentUser.email,
        textoDescriptivo: textoDescriptivo,
        createdAt: now.Date(),
        posts: posts,
        likes: likes
      })
      .then(()=> this.props.navigation.navigate('Home'))
      .catch(e => (console.log(e)))
    }

  render() {
    return (
      <View style= {styles.container}> 
        <Text style= {styles.texto}> Nuevo Post </Text>
        <View style={styles.container1}> 
          <TextInput 
          style= {styles.input}
          keyboardType='default'
          placeholder='Nombre del post... '
          onChangeText= {text => this.setState({posts: text, error: ''})}
          value= {this.state.posts}
          />
     <br></br>
          <TextInput
          style={styles.input}
          keyboardType='default'
          placeholder='Texto descriptivo...'
          onChangeText={text => this.setState({ textoDescriptivo: text, error: ''})}
          value= {this.state.textoDescriptivo}
          />
          <TouchableOpacity onPress={()=> this.submit(this.state.posts, this.state.textoDescriptivo)}> 
          <Text style={styles.crear} > Crear post </Text>
          </TouchableOpacity>
        </View>
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
    fontSize: 24,
    padding: 5,
    color: "#000"
  },
  container1: {
    alignItems: "center",
    backgroundColor: "#F5EDED",
    flex: 1,
    padding: 8,
    margin: 8,
  // justifyContent: 'space-between'
    // justifyContent: "center",
  },
  titulo:{
    fontSize: 42,
    fontWeight: 'bold'
  },
  input: {
    borderWidth: 2,
    borderColor: '#6482AD',
    padding: 4,
  },
  crear: {
    backgroundColor: "#E2DAD6",
    margin: 5,
    borderRadius: 8,
    fontSize: 18,
    padding: 6,
    borderColor: 'grey',
  },
})