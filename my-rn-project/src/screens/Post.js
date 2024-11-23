import React, { Component } from 'react'
import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { TouchableOpacity } from 'react-native';
import { db } from '../firebase/config';
import firebase from 'firebase';
import { auth } from '../firebase/config';

export class Post extends Component {
    constructor(props) {
        super(props)
        this.state = {
            likeado: false,
        }
    }
    componentDidMount() {
        const { likedBy } = this.props.info.data;

        if (likedBy && likedBy.includes(auth.currentUser.email)) {
            this.setState({ likeado: true });
        }
    }

    actualizarLike(idDocumento) {
        db.collection("posts").doc(idDocumento)
            .update({
                likes:firebase.firestore.FieldValue.increment(1),
                likedBy: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
            })
            .then (()=> {
                this.setState ({
                    likeado : true
                })
            })

    }

    sacarLike(idDocumento){
        db.collection("posts").doc(idDocumento)
        .update({
            likes:   firebase.firestore.FieldValue.increment(-1),
            likedBy:  firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
            })
        .then (()=> {
            this.setState ({
                likeado : false
            })
        })
 
    }


    render() {
        return (
            <View style={styles.container} >
                <Text style={styles.postTitle}>{this.props.info.data.posts}:</Text>
                <Text style={styles.description}>{this.props.info.data.textoDescriptivo}</Text>
                <Text style={styles.owner}>Creado por: {this.props.info.data.owner}</Text>
                <View style={styles.likes}>
                <Text> Likes: {this.props.info.data.likes}</Text>
                {
                    this.state.likeado ?
                        <TouchableOpacity style={styles.btn} onPress={() => this.sacarLike(this.props.info.id)}>
                            <AntDesign name="like1" size={24} color="black" />
                        </TouchableOpacity> :
                        <TouchableOpacity style={styles.btn} onPress={() => this.actualizarLike(this.props.info.id)}>
                            <AntDesign name="like2" size={24} color="black" />
                        </TouchableOpacity>

                }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#E2DAD6",
        padding: 16,
        margin: 8,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOpacity: 0.1

    },

    postTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
        color: "#555",
        marginBottom: 8,
    },
    owner: {
        fontSize: 12,
        color: "#888",
        fontStyle: "italic",
        textAlign: "right",
    },
    likes:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between", 
        marginTop: 15,
    }
})

export default Post