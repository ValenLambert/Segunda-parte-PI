import React, { Component } from 'react'
import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { TouchableOpacity } from 'react-native';
import { db } from '../firebase/config';
import firebase from 'firebase';
import { auth } from '../firebase/config';

export class PostProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            likeado: false,
        }
    }
    
    borrarPost(id) {
        db.collection('posts')
            .doc(id)
            .delete()
            .then(() => console.log('Post eliminado correctamente'))
            .catch((error) => console.error('Error al eliminar el post:', error));
    }

    actualizarLike(idDocumento) {
        db.collection("posts").doc(idDocumento)
            .update({
                likes: firebase.firestore.FieldValue.increment(1),
                likedBy: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
            })
            .then(() => {
                this.setState({
                    likeado: true
                })
            })

    }

    sacarLike(idDocumento) {
        db.collection("posts").doc(idDocumento)
            .update({
                likes: firebase.firestore.FieldValue.increment(-1),
                likedBy: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
            })
            .then(() => {
                this.setState({
                    likeado: false
                })
            })

    }



    render() {
        return (
            <View style={styles.postContainer} >
                <Text style={styles.postTitle}>{this.props.info.data.posts}:</Text>
                <Text style={styles.postContent}>{this.props.info.data.textoDescriptivo}</Text>
                <Text style={styles.postDate}>Publicado el: {this.props.info.data.createdAt}</Text>
                <View style={styles.likes}>
                    <Text> Likes: {this.props.info.data.likes}</Text>
                    {
                        this.props.info.data.likedBy && this.props.info.data.likedBy.includes(auth.currentUser.email) ? 
                        <TouchableOpacity style={styles.btn} onPress={() => this.sacarLike(this.props.info.id)}>
                            <AntDesign name="like1" size={24} color="black" />
                        </TouchableOpacity> :
                            <TouchableOpacity style={styles.btn} onPress={() => this.actualizarLike(this.props.info.id)}>
                                <AntDesign name="like2" size={24} color="black" />
                            </TouchableOpacity>

                    }
                    <TouchableOpacity
                        style={styles.borrar}
                        onPress={() => this.borrarPost(this.props.info.id)}
                    >
                        <AntDesign name="delete" size={18} color="black" />
                    </TouchableOpacity>


                </View>
            </View>
        )
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
    likes: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 15,
    }
});
export default PostProfile