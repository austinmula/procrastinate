import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {NavigationContainer} from '@react-navigation/native'

import HomeScreen from './src/screens/home/home'
import SettingScreen from './src/screens/home/settings'
import AnalyticsScreen from './src/screens/home/analytics'
import NotesScreen from './src/screens/home/notes'
import TabBar from './src/components/common/TabBar'

const Tab = createBottomTabNavigator()

function HomeTabs () {
  return (
    <Tab.Navigator initialRouteName={'home'}>
      <Tab.Screen
        options={{headerShown: false}}
        name='home'
        component={HomeScreen}
      />
      <Tab.Screen
        options={{headerShown: false}}
        name='analytics'
        component={AnalyticsScreen}
      />
      <Tab.Screen
        options={{headerShown: false}}
        name='notes'
        component={NotesScreen}
      />
      <Tab.Screen
        options={{headerShown: false}}
        name='settings'
        component={SettingScreen}
      />
    </Tab.Navigator>
  )
}

const Stack = createStackNavigator()

function App () {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={'HomeTabs'}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name='HomeTabs' component={HomeTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
