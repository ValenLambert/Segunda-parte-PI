import { Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { auth, db } from '../firebase/config'

export default class NuevoPost extends Component {
  constructor(props) {
    super(props)
    this.state = ({
      posts: [],
      email: '',
      textoDescriptivo: '',
      error: '',
      createdAt: ''
    })
  }

  submit(posts, textoDescriptivo, likes) {
    if (!posts || !textoDescriptivo) {
      this.setState({ error: "Todos los campos son obligatorios" });
      return;
    }

    db.collection("posts")
      .add({
        owner: auth.currentUser.email,
        textoDescriptivo: textoDescriptivo,
        createdAt: Date.now(),
        posts: posts,
        likes: 0,
      })
      .then(() => this.props.navigation.navigate("Home"))
      .catch((e) => console.log(e));
  }


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.texto}> Nuevo Post </Text>
        <TextInput
          style={styles.input}
          keyboardType='default'
          placeholder='Nombre del post... '
          onChangeText={text => this.setState({ posts: text, error: '' })}
          value={this.state.posts}
        />
        <br></br>
        <TextInput
          style={styles.input}
          keyboardType='default'
          placeholder='Texto descriptivo...'
          onChangeText={text => this.setState({ textoDescriptivo: text, error: '' })}
          value={this.state.textoDescriptivo}
        />
        {this.state.error ? (
          <Text style={{ color: "red" }}>{this.state.error}</Text>
        ) : null}
        <TouchableOpacity onPress={() => this.submit(this.state.posts, this.state.textoDescriptivo)}>
          <Text style={styles.crear} > Crear post </Text>
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
  titulo: {
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