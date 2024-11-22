import { Text, View, StyleSheet, FlatList } from 'react-native'
import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { db, auth } from '../firebase/config'

export default class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = ({
      userInfo: [],
      userPosts: []
    })
  }

  componentDidMount() {
    db.collection('users')
      .where('owner', '==', auth.currentUser.email).onSnapshot(docs => {
        let arrDocs = []
        docs.forEach(doc => {
          arrDocs.push({
            id: doc.id,
            data: doc.data()
          })
        })
        this.setState({
          userInfo: arrDocs
        })
      })
    db.collection('posts')
      .where('owner', "==", auth.currentUser.email).onSnapshot(docs => {
        let arrPosts = []
        docs.forEach(doc => {
          arrPosts.push({
            id: doc.id,
            data: doc.data()
          })
        })
        this.setState({
          userPosts: arrPosts
        })
      })
  }


  // metodo para desloguear 
  logout() {
    auth.signOut()
    this.props.navigation.navigate("Login")
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.texto}>Mi perfil:</Text>

        <View style={styles.infoContainer}>
          {/* Nombre de usuario */}
          <View style={styles.row}>
            <Text style={styles.texto2}>Nombre de usuario:  </Text>
            <Text style={styles.text1}>
              {this.state.userInfo.length > 0 ? this.state.userInfo[0].data.username : "Cargando..."}
            </Text>
          </View>

          {/* Email del usuario */}
          <View style={styles.row}>
            <Text style={styles.texto2}>Email del usuario:   </Text>
            <Text style={styles.text1}>
              {this.state.userInfo.length > 0 ? this.state.userInfo[0].data.owner : "Cargando..."}
            </Text>
          </View>

          {/* Cantidad de posts */}
          <View style={styles.row}>
            <Text style={styles.texto2}>Cantidad de posts:  </Text>
            <Text style={styles.text1}> {this.state.userPosts.length} </Text>
          </View>

          {/* Posts */}
          <View style={styles.row}>
            <Text style={styles.texto2}>Posts:  </Text>
            <View style={styles.Flatlist}>
              <FlatList
                data={this.state.userPosts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) =>
                  <View style={styles.postContainer}>
                    <Text style={styles.postTitle}> {item.data.posts || "Sin título"} </Text>
                    <Text style={styles.postContent}> {item.data.textoDescriptivo || "Sin contenido"} </Text>
                    <Text style={styles.postDate}> Publicado el: {item.data.createdAt || "Desconocido"} </Text>
                    <TouchableOpacity style={styles.borrar}>
                      <Text style={styles.borrar}> Borrar Post </Text>
                    </TouchableOpacity>
                  </View>
                }
              />
            </View>
          </View>
        </View>
        <br></br> <br></br> <br></br> <br></br> <br></br>
        <View> <TouchableOpacity style={styles.logout} onPress={() => this.logout()}>
          <Text style={styles.text1}>Log out</Text>
        </TouchableOpacity> </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#F5EDED",
    flex: 1,
    minHeight: 0
    // justifyContent: "center",
  },
  postContainer: {
    backgroundColor: "#E2DAD6",
    padding: 8,
    marginVertical: 10,
    borderRadius: 8,
    shadowColor: "#000"
  },
  texto: {
    borderColor: "#7FA1C3",
    backgroundColor: "#E2DAD6",
    margin: 40,
    borderRadius: 5,
    fontSize: 22,
    padding: 8,
    color: "#000"
  },
  texto2: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  text1: {
    fontSize: 16,
    color: "#555",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    width: '100%',
    flex: 1
  },
  logout: {
    backgroundColor: "#FF6F6F",
    margin: 5,
    borderRadius: 14,
    fontSize: 24,
    padding: 9,
    borderColor: 'grey'
  },
  borrar: {
    backgroundColor: "#FF6F6F",
    margin: 2,
    borderRadius: 12,
    fontSize: 14,
    padding: 4,
    alignItems: "left",
    width: '20',
  },

  infoContainer: {
    width: "100%",
    paddingHorizontal: 20,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  postContent: {
    fontSize: 16,
    color: "#555",
    marginBottom: 10,
  },
  postDate: {
    fontSize: 12,
    color: "#888",
    fontStyle: "italic",
    textAlign: "right",
  },
  Flatlist: {
    flexDirection: "column",
    alignItems: "right",
    marginBottom: 10,
    marginTop: 12,
    width: '100%',
    flex: 1,
    maxHeight: 300, // Limita la altura de los posts
    overflow: "hidden",
  }
})