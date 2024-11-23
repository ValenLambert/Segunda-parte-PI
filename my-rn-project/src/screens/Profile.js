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
      likes: false
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
        let likes = {};  
        docs.forEach((doc) => {
          arrPosts.push({
            id: doc.id,
            data: doc.data(),
          });
          const { likedBy } = doc.data();
          likes = likedBy && likedBy.includes(auth.currentUser.email);
        });

        this.setState({
          userPosts: arrPosts,
          likes: likes,
        });
      });
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

  Like(idDocumento) {
    console.log(idDocumento)
    db.collection("posts").doc(idDocumento)
        .update({
            likes:firebase.firestore.FieldValue.increment(1),
            likedBy: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
        .then (()=> {
            this.setState ({
                like : true
            })
        })

}

sacarLike(idDocumento){
  console.log("MIRARARAR VALI",this.state.likes)

    db.collection("posts").doc(idDocumento)
    .update({
        likes:   firebase.firestore.FieldValue.increment(-1),
        likedBy:  firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
    .then (()=> {
        this.setState ({
            like : false
        })
    })

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
                        <Text> Likes: {item.data.likes}</Text>
                        {this.state.likes ?
                          (<TouchableOpacity styles={styles.btn} onPress={() => this.sacarLike(item.id)} >
                               <AntDesign name="like1" size={24} color="black"/>                       
                               </TouchableOpacity>)
                          : (
                            <TouchableOpacity onPress={() => this.Like(item.id)} >
                            <AntDesign name="like2" size={24} color="black" />
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
