import React, { Component } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
const Tab = createBottomTabNavigator();
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import NuevoPost from '../screens/NuevoPost';
import Busqueda from '../screens/Busqueda';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default class NavegacionAnidada extends Component {
  render() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={Home}
          options={
            {
              tabBarIcon: () => <AntDesign name="home" size={24} color="black" />,
              headerShown: false
            }
          }
        />

        <Tab.Screen
          name="Perfil"
          component={Profile}
          options={{
            tabBarIcon: () => <MaterialCommunityIcons name="face-woman-profile" size={24} color="black" />,
            headerShown: false
          }}
        />

        <Tab.Screen
          name="Nuevo Post"
          component={NuevoPost}
          options={
            {
              tabBarIcon: () => <Entypo name="new-message" size={24} color="black" />,
              headerShown: false
            }
          }
        />


        <Tab.Screen
          name="Buscar"
          component={Busqueda}
          options={
            {
              tabBarIcon: () => <FontAwesome5 name="search" size={24} color="black" />,
              headerShown: false
            }
          }
        />
      </Tab.Navigator>
    )
  }
}