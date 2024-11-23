import { Text, View, TextInput, FlatList } from 'react-native';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { db } from '../firebase/config'; // Suponiendo que esta es tu configuración de Firebase

export default class Busqueda extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuarios: [], 
      busqueda: '',  
      sinResultado: false,  
    };
  }

  controlarCambios = (text) => {
    this.setState(
      { busqueda: text },
      () => this.filtrarUsuarios(text) 
    );
  };

  // Método para buscar usuarios en Firestore
  filtrarUsuarios = (nombreUsuario) => {
    if (nombreUsuario === '') {
       
      this.setState({
        usuarios: [],
        sinResultado: false,
      });
      return;
    }

    // ahora si hago el llamado a. la a base de datos de firbease
    // uso estos comparadores logicos porqu eosn los que me permiten ver si el nombre incluye lo q el susuario va poniendo 
    db.collection('users')
      .where('username', '>=', nombreUsuario)
      .where('username', '<=', nombreUsuario + '\uf8ff')  
      .onSnapshot(
        (docs) => {
          let usuarios = [];
          docs.forEach((doc) => {
            usuarios.push({
              id: doc.id,  
              data: doc.data(),  
            });
          });

          console.log('Usuarios encontrados:', usuarios);  

          if (usuarios.length > 0) {
            this.setState({
              usuarios: usuarios,
              sinResultado: false,
            });
          } else {
            this.setState({
              usuarios: [],
              sinResultado: true,
            });
          }
        },
        (error) => {
          console.error('Error al obtener datos de Firebase:', error);
        }
      );
  };

  render() {
    return (
      <View style={styles.containerB}>
        <Text style={styles.texto}>Búsqueda</Text>

        {/*form de bsiqueda  */}
        <TextInput
          style={styles.input}
          keyboardType="default"
          placeholder="Buscar username..."
          onChangeText={this.controlarCambios}
          value={this.state.busqueda}
        />

        {/* para q muestre el mensqje de que no hay usuairo encontrado */}
        {this.state.sinResultado ? (
          <Text style={styles.mensaje}>El username no existe</Text>
        ) : (
          /* q muestre a lso ususaiors encontrados  */
          <FlatList
            data={this.state.usuarios}
            keyExtractor={(item) => item.id.toString()} 
            renderItem={({ item }) => (
              <View style={styles.userCard}>
                <Text style={styles.userName}>{item.data.username}</Text>
              </View>
            )}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerB: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5EDED',
    flex: 1,
    padding: 25,
  },
  texto: {
    borderColor: '#7FA1C3',
    backgroundColor: '#E2DAD6',
    margin: 40,
    borderRadius: 5,
    fontSize: 22,
    padding: 8,
    color: '#000',
  },
  input: {
    height: 40,
    borderColor: '#6482AD',
    borderWidth: 2,
    borderRadius: 5,
    width: '100%',
    paddingLeft: 10,
    marginBottom: 20,
  },
  userCard: {
    backgroundColor: '#E2DAD6',
    padding: 10,
    marginVertical: 8,
    width: '100%',
    borderRadius: 5,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  mensaje: {
    fontSize: 18,
    color: 'red',
    marginTop: 10,
  },
});
