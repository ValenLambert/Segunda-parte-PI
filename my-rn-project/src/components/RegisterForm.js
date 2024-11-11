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

                <TextInput
                    style={styles.form}
                    keyboardType='default'
                    placeholder='Foto de perfil:'
                />
                <Text style={styles.extra}>*Puedes subirla luego*</Text>
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
        alignItems: "center",
        backgroundColor: "#DFF2EB"
    },
    title: {
        fontSize: 16,
        fontWeight: "bold"
    },
    form: {
        borderWidth: 0.5,
        borderColor: "#7AB2D3",
        margin: 10
    },
    button: {
        padding: 4,
        margin: 10,
        textAlign: 'center',
        backgroundColor: "#B9E5E8"
    },
    extra: {
        fontSize: 10,
        textAlign: 'center',
        fontStyle: "italic",
    }
}) 