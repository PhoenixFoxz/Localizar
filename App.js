import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LocationScreen from './src/screens/LocationScreen';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <SafeAreaView style={estilos.containerSafe}>
      <StatusBar />
      <NavigationContainer>
        <Stack.Navigator initialRouteName='LocationScreen'>
          <Stack.Screen name='LocationScreen' component={LocationScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  containerSafe: {
    flex: 1
  },
});