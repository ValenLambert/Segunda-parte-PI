import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import NavegacionPrincipal from './src/navegation/NavegacionPrincipal';

export default function App() {
  return (
    <NavigationContainer>
      <NavegacionPrincipal/>
    </NavigationContainer>
  );
}

