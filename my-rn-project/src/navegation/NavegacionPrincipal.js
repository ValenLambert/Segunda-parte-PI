import React, { Component } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register from '../screens/Register';
import Login from '../screens/Login';
import NavegacionAnidada from './NavegacionAnidada';


const Stack = createNativeStackNavigator();

export default class NavegacionPrincipal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggeado: false,
    };
  }

  render() {
    return (
      <Stack.Navigator>          
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Loggeado" component={NavegacionAnidada} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
      </Stack.Navigator>
    );
  }
}
