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
                <RegisterForm navigation={this.props.navigation}/>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <Text>Sino:</Text>
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
        backgroundColor: "#DFF2EB",
        flex: 1,
        padding: 200
    },
    register: {
    
        backgroundColor: "lightblue"
    }
  }) 