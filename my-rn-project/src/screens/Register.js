import { Text, View, TouchableOpacity, TextInput } from 'react-native'
import React, { Component } from 'react'
import RegisterForm from '../components/RegisterForm';
import { StyleSheet } from 'react-native';

export default class Register extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log("mount")
    }

    componentDidUpdate() {
        console.log("update")
    }

    componentWillUnmount() {
        console.log("unmount")
    }

    register() {
        this.props.navigation.navigate("Login")
    }

    render() {
        return (
            <View style={styles.container}>
                <RegisterForm navigation={this.props.navigation} />
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <Text style={styles.text1}>Si ya tienes cuenta:</Text>
                <TouchableOpacity onPress={() => this.register()}>
                    <Text style={styles.register} >Login</Text>
                </TouchableOpacity>

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
    register: {
        borderColor: "#7FA1C3",
        backgroundColor: "#608BC1",
        margin: 5,
        fontSize: 16,
        borderRadius: 5,
        padding: 5

    },
    text1: {
        fontSize: 16,
        textDecorationLine: "underline"

    },

}) 