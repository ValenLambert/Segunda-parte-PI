import { Text, TextInput, View } from 'react-native'
import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { auth, db } from '../firebase/config';


export default class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            username: "",
            error1: 0,
            error2: 0,
            error3: 0
        }
    }
    

    enviarLog = () => {
        const { email, password, username } = this.state;
        if (password.length <= 6) {
            this.setState({ error1: 1 })
        } else {
            console.log("Contraseña:", password)
            this.setState({ error1: 0 })

        }
        if (email.includes("@")) {
            console.log("Mail:", email)
            this.setState({ error2: 0 })
        } else {
            this.setState({ error2: 1 })
        }

        if (username.length <= 4) {
            this.setState({ error3: 1 })
        } else {
            console.log("User:", username)
            this.setState({ error3: 0 })
        }

        if (username.length >= 4 && email.includes("@") && password.length >= 6) {
            auth.createUserWithEmailAndPassword(email, password)
                .then((user) => {
                    if (user) {
                        db.collection("users").add({
                            owner: email,
                            createdAt: Date.now(),
                            username: username,
                        })
                            .then(
                                () => this.props.navigation.navigate("Login")
                            )
                    }
                    console.log("usuario cresdoo", user)
                })
                .catch(err => console.log("error firebae", err))
        } else {
            console.log("error firebae")
        }

    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>¡Registrate!</Text>
                <TextInput
                    style={styles.form}
                    keyboardType='default'
                    placeholder='Email:'
                    onChangeText={text => this.setState({ email: text, error2: 0 })}
                    value={this.state.email}
                />
                <TextInput
                    style={styles.form}
                    keyboardType='default'
                    placeholder='User Name:'
                    onChangeText={text => this.setState({ username: text, error3: 0 })}
                    value={this.state.username}
                />

                <TextInput
                    style={styles.form}
                    keyboardType='default'
                    placeholder='Password:'
                    secureTextEntry={true}
                    onChangeText={text => this.setState({ password: text, error1: 0 })}
                    value={this.state.password}
                />

               
                <TouchableOpacity onPress={() => this.enviarLog()} style={styles.button}>
                    <Text>Registrate</Text>
                </TouchableOpacity>

                {this.state.error1 === 1 && (
                    <Text style={styles.errorText}>
                        La contraseña debe ser mas larga
                    </Text>
                )}
                {this.state.error2 === 1 && (
                    <Text style={styles.errorText}>
                        El mail debe ser en el formato correcto
                    </Text>
                )}
                {this.state.error3 === 1 && (
                    <Text style={styles.errorText}>
                        El user name debe ser mas largo
                    </Text>
                )}

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
        borderRadius: 5

    }
}) 