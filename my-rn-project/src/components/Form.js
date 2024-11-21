import { Text, TextInput, View } from 'react-native'
import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { auth, db } from '../firebase/config';

export default class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            loggedeIn: false
        }
    }



    enviarLog = () => {
        const { email, password } = this.state;
        auth.signInWithEmailAndPassword(email, password)
            .then((response) => {
               this.props.navigation.navigate("Loggeado")
            })
            .catch((e) => {
                this.setState({ error: "Credenciales inválidas" });
            });
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>¡Logearse!</Text>
                <TextInput 
                    style={styles.form}
                    keyboardType='email-address'
                    placeholder='Email:'
                    onChangeText={text => this.setState({ email: text })}
                    value={this.state.email}
                />
                <TextInput 
                    style={styles.form}
                    keyboardType='default'
                    placeholder='Password:'
                    secureTextEntry={true}
                    onChangeText={text => this.setState({ password: text })}
                    value={this.state.password}
                />
                <TouchableOpacity onPress={() => this.enviarLog()} style={styles.button}>
                    <Text>Log in</Text>
                </TouchableOpacity>
                {this.state.error && <Text style={styles.errorText}>{this.state.error}</Text>}
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        padding: 25,
        alignItems: "center",
        backgroundColor: "#F5EDED",
        alignContent: "space-between",
        justifyContent: "center",
    },
    title: {
        fontSize: 26,
        fontWeight: "bold"
    },
    form: {
        borderWidth: 0.5,
        borderColor: "#7FA1C3",
        margin: 10,
        fontSize: 16,


    },
    button: {
        padding: 5,
        margin: 10,
        textAlign: 'center',
        backgroundColor: "#6482AD",
        fontSize: 26,
        borderRadius: 5,


    },
    errorText: {
        color: '#FF6F6F'
    }
}) 