import { Text, View, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { db, auth } from '../firebase/config'

export default class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = ({
      userInfo: []
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
  }
  // metodo para desloguear 
  logout() {
    auth.signOut()
    this.props.navigation.navigate("Login")
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.texto}>Profile</Text>

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
            <Text style={styles.text1}>
              {this.state.userInfo.length > 0 ? this.state.userInfo[0].data.posts : "Cargando..."}
            </Text>
          </View>

          {/* Posts */}
          <View style={styles.row}>
            <Text style={styles.texto2}>Posts:  </Text>
            <Text style={styles.text1}>
              {this.state.userInfo.length > 0 ? this.state.userInfo[0].data.posts : "Cargando..."}
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.logout} onPress={() => this.logout()}>
          <Text style={styles.text1}>Log out</Text>
        </TouchableOpacity>
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
    fontSize: 18,
    padding: 5,
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
  },
  logout: {
    backgroundColor: "#FF6F6F",
    margin: 5,
    borderRadius: 18,
    fontSize: 24,
    padding: 16,
  },
  
  infoContainer: {
    width: "100%", 
    paddingHorizontal: 20,
  },

})