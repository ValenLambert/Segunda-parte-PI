import React, { Component } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { auth } from '../firebase/config'; 
import Register from '../screens/Register';
import Login from '../screens/Login';
import NavegacionAnidada from './NavegacionAnidada';


const Stack = createNativeStackNavigator();

export default class NavegacionPrincipal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggeado: false,
      loading: true,
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({ loggeado: true, loading: false });
      } else {
        this.setState({ loggeado: false, loading: false });
      }
    });
  }

  render() {
    const { loggeado, loading } = this.state;

    if (loading) {
      return null; 
    }

    return (
      <Stack.Navigator>
        {loggeado ? (
          <Stack.Screen name="Loggeado" component={NavegacionAnidada} options={{ headerShown: false }} />
        ) : (
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        )}
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
      </Stack.Navigator>
    );
  }
}
