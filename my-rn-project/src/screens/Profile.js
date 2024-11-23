import { Text, View, StyleSheet, FlatList } from 'react-native';
import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { db, auth } from '../firebase/config';
import firebase from 'firebase';
import AntDesign from '@expo/vector-icons/AntDesign';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: [],
      userPosts: [],
      like: false
    };
  }

  componentDidMount() {
    // Cargar información del usuario
    db.collection('users')
      .where('owner', '==', auth.currentUser.email)
      .onSnapshot((docs) => {
        let arrDocs = [];
        docs.forEach((doc) => {
          arrDocs.push({
            id: doc.id,
            data: doc.data()
          });
        });
        this.setState({
          userInfo: arrDocs
        });
      });

    // Cargar posts del usuario
    db.collection('posts')
      .where('owner', '==', auth.currentUser.email)
      .onSnapshot((docs) => {
        let arrPosts = [];
        docs.forEach((doc) => {
          arrPosts.push({
            id: doc.id,
            data: doc.data()
          });
        });
        this.setState({
          userPosts: arrPosts
        });
      });
  }
  // metodo para dar like al posts
  like(postId) {
    db.collection('post')
      .doc(postId)
      .update({
        likes: firebase.firestore.FieldValue.arrayUnion(firebase.auth().currentUser.email)
      })
      .then(() => {
        this.setState({ like: true })
      })
      .catch((error) => console.log("Error al dar like: ", error));
  }

  // metodo para sacar like
  dislike(postId) {
    db.collection('posts')
      .doc(postId)
      .update({
        likes: firebase.firestore.FieldValue.arrayRemove(firebase.auth().currentUser.email)
      })
      .then(() => {
        this.setState({ like: false })
      })
      .catch((error) => console.log(error))
  }

  // Método para borrar un post
  borrarPost(id) {
    db.collection('posts')
      .doc(id)
      .delete()
      .then(() => {
        console.log('Post eliminado correctamente');
      })
      .catch((error) => {
        console.error('Error al eliminar el post: ', error);
      });
  }

  // Método para desloguear
  logout() {
    auth.signOut();
    this.props.navigation.navigate('Login');
  }

  actualizarLike() {
    db.collection('posts')
      .doc(idDocumento)
      .update({
        likes: firebase.firestore.FieldValue.increment(1),
        arrlikeados: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email) // Agrega el email del usuario al array `arrlikeados`
      })
      .then(() => {
        this.setState({
          likeado: true
        });
      })
      .catch((error) => console.log(error))
  }
  // Método para remover al usuario del array "arrlikeados" y cambiar `likeado` a false

  sacarLike() {
    db.collection('posts')
      .doc(idDocumento)
      .update({
        arrlikeados: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email) // remueve el email del usuario al array `arrlikeados`
      })
      .then(() => {
        this.setState({
          likes: -1
        });
      })
      .catch((error) => console.error(error))
  }

  render() {
    return (
      <View style={styles.containerP}>
        <Text style={styles.texto}>Mi perfil: </Text>

        <View style={styles.infoContainer}>
          {/* Información del usuario */}
          <View style={styles.row}>
            <Text style={styles.texto2}>Nombre de usuario:</Text>
            <Text style={styles.text1}>
              {this.state.userInfo.length > 0
                ? this.state.userInfo[0].data.username
                : 'Cargando...'}
            </Text>
          </View>
                <br></br>
          <View style={styles.row}>
            <Text style={styles.texto2}>Email del usuario:</Text>
            <Text style={styles.text1}>
              {this.state.userInfo.length > 0
                ? this.state.userInfo[0].data.owner
                : 'Cargando...'}
            </Text>
          </View>
          <br></br>

          <View style={styles.row}>
            <Text style={styles.texto2}>Cantidad de posts:</Text>
            <Text style={styles.text1}>{this.state.userPosts.length}</Text>
          </View>
          <br></br>
          {/* Posts del usuario */}
          <View>
            {this.state.userPosts.length > 0 ? (
              <View>
                <Text style={styles.texto2}>Posts:</Text>
                <View style={styles.Flatlist}>
                  <FlatList
                    data={this.state.userPosts}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                      <View style={styles.postContainer}>
                        <Text style={styles.postTitle}>
                          {item.data.posts || 'Sin título'}
                        </Text>
                        <Text style={styles.postContent}>
                          {item.data.textoDescriptivo || 'Sin contenido'}
                        </Text>
                        <Text style={styles.postDate}>
                          Publicado el: {item.data.createdAt || 'Desconocido'}
                        </Text>
                        {this.state.like ?
                          (<TouchableOpacity styles={styles.btn} onPress={() => this.sacarLike(item.id)} >
                            <AntDesign name="dislike2" style={styles.likeIcon} color="black" />                          </TouchableOpacity>)
                          : (
                            <TouchableOpacity onPress={() => this.like(item.id)} >
                            <AntDesign name="like2" style={styles.likeIcon} color="black" />
                            </TouchableOpacity>
                          )
                        }

                        <TouchableOpacity
                          style={styles.borrar}
                          onPress={() => this.borrarPost(item.id)}
                        >
                          <AntDesign name="delete" size={18} color="black" />
                        </TouchableOpacity>
                      </View>
                    )}
                  />
                </View>
              </View>
            ) : (
              <Text>Aún no has publicado nada</Text>
            )}
          </View>
        </View>
        <br></br><br></br>

        {/* Botón de logout */}
        <View>
          <TouchableOpacity style={styles.logout} onPress={() => this.logout()}>
            <Text style={styles.text1}>Log out</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerP: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5EDED',
    flex: 1,
    padding: 25,
    alignContent: 'space-between'
  },
  postContainer: {
    backgroundColor: '#E2DAD6',
    padding: 8,
    marginVertical: 10,
    borderRadius: 8,
    shadowColor: '#000',
    borderRadius: 5,
    borderColor: '#6482AD',
    borderWidth: 2,
  },
  texto: {
    borderColor: '#7FA1C3',
    backgroundColor: '#E2DAD6',
    margin: 40,
    borderRadius: 5,
    fontSize: 22,
    padding: 8,
    color: '#000'
  },
  texto2: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333'
  },
  text1: {
    fontSize: 16,
    color: '#555'
  },
  logout: {
    backgroundColor: '#FF6F6F',
    margin: 5,
    borderRadius: 14,
    fontSize: 24,
    padding: 9,
    fontWeight: 'bold',
    paddingVertical: 6,
    paddingHorizontal: 14,
    alignSelf: 'center',
    marginTop: 12
  },
  borrar: {
    backgroundColor: '#888',
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 14,
    alignSelf: 'center',
    marginTop: 12,
    borderColor: '#FF6F6F'
  },
  borrarTexto: {
    fontSize: 12,
    textAlign: 'center' // Centra el texto dentro del botón
  },
  infoContainer: {
    width: '100%',
    paddingHorizontal: 20,

  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5
  },
  postContent: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10
  },
  postDate: {
    fontSize: 12,
    color: '#888',
    fontStyle: 'italic',
    textAlign: 'left'
  },
  Flatlist: {
    maxHeight: 300, // Altura máxima de la lista
    marginTop: 16,
    width: '100%',
    padding: 8,
    margin: 8,
    elevation: 2,


  },
likeIcon: {
        fontSize: 16,
        padding: 5,
    }
});
