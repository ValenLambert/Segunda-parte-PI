import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity,  ActivityIndicator } from 'react-native';
import { db, auth } from '../firebase/config';
import firebase from 'firebase';
import AntDesign from '@expo/vector-icons/AntDesign';
import PostProfile from '../components/PostProfile';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: [],
      userPosts: [],
    };
  }

  componentDidMount() {
    db.collection('users')
      .where('owner', '==', auth.currentUser.email)
      .onSnapshot((docs) => {
        let userData = [];
        docs.forEach((doc) => {
          userData.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        this.setState({ userInfo: userData });
      });

    // Cargar posteos del user 
    db.collection('posts')
      .where('owner', '==', auth.currentUser.email)
      .onSnapshot((docs) => {
        let posts = [];
        docs.forEach((doc) => {
          posts.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        this.setState({ userPosts: posts });
      });
  }

  // desloguearse 
  logout() {
    auth.signOut();
    this.props.navigation.navigate('Login');
  }

  render() {
    const { userInfo, userPosts } = this.state;

    return (
      <View style={styles.containerP}>
        <Text style={styles.texto}>Mi perfil:</Text>

        <View style={styles.infoContainer}>
          {/* Información del usuario */}
          <Text style={styles.texto2}>Nombre de usuario: </Text>
          <Text style={styles.text1}>
            {userInfo.length > 0 ? userInfo[0].data.username : <ActivityIndicator/>}
          </Text>

          <Text style={styles.texto2}>Email del usuario: </Text>
          <Text style={styles.text1}>
            {userInfo.length > 0 ? userInfo[0].data.owner :  <ActivityIndicator/>}
          </Text>

          <Text style={styles.texto2}>Cantidad de posts: {userPosts.length}</Text>
        </View>

        {/* un flatlist para q se vean todos los posetos */}
        <Text style={styles.texto2}>Posts: </Text>
        <FlatList
          data={this.state.userPosts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <PostProfile info={item} />}
        />

        {/* Botón de logout */}
        <TouchableOpacity style={styles.logout} onPress={() => this.logout()}>
          <Text style={styles.text1}>Log out</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerP: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5EDED',
  },
  infoContainer: {
    marginBottom: 20,
  },
  texto: {
    borderColor: '#7FA1C3',
    backgroundColor: '#E2DAD6',
    margin: 4,
    borderRadius: 5,
    fontSize: 22,
    padding: 9,
    color: '#000',
  },
  texto2: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  text1: {
    fontSize: 16,
    color: '#555',
  },
  postContainer: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#E2DAD6',
    borderRadius: 8,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  postContent: {
    fontSize: 16,
    marginBottom: 10,
  },
  postDate: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#888',
  },
  likeIcon: {
    marginTop: 10,
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
  logout: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#FF6F6F',
    borderRadius: 8,
    alignItems: 'center',
  },
});
