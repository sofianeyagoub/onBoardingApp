import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

//screens
import { OnBoarding } from './app/screens/'

const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions = {{
          headerShown: false
        }}
        
      >
        <Stack.Screen 
          name = "OnBoarding"
          component = {OnBoarding}

        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default () => {
  return <App />;
}