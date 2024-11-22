import { Text, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { auth } from '../firebase/config'
import { ActivityIndicator, FlatList } from 'react-native-web';
import { db } from '../firebase/config';
import Post from './Post';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      posts: [],
    })
  }


  componentDidMount() {
    db.collection("posts").orderBy("createdAt", "desc").onSnapshot(
      docs => {
        let posts = [];
        docs.forEach(doc => {
          posts.push({
            id: doc.id,
            data: doc.data()
          })
          this.setState({
            posts: posts
          })
        });
      }
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Bienvenido/a: </Text>
        <Text>{auth.currentUser.email}</Text>
        {
          this.state.posts.lenght === 0
            ?
            <ActivityIndicator />
            :
            <View style={styles.flatlist}>
              <Text style={styles.titulo}>Comentarios recientes:</Text>
              <FlatList
                data={this.state.posts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <Post info={item} />}
              />
            </View>
        }
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
  title: {
    fontSize: 26,
    fontWeight: "bold"
  },
  logout: {
    backgroundColor: "#FF6F6F",
    margin: 5,
    borderRadius: 5,
    fontSize: 16,
    padding: 5
  },
  flatlist: {
    width: '100%',
    flex: 1,
  },
  titulo: {
    fontSize: 19,
    margin: 20,
  }
})