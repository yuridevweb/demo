import 'react-native-gesture-handler';
import React, { useEffect, useState, useContext } from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
/* import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './firebase'; */
import {
  LoginScreen,
  HomeScreen,
  RegistrationScreen,
  GameScreen,
  RulesScreen,
  LeaderboardScreen,
  ResultsScreen,
} from '../screens';
import { UserContext } from '../context/User';
import { AuthProvider } from '../context/AuthContext';
import { AuthContext } from '../context/AuthContext';
const Stack = createNativeStackNavigator();

const AppNav = () => {
  const { isLoading, userToken } = useContext(AuthContext);
  /* const [loading, setLoading] = React.useState(false);
  const [user, setUser] = React.useState(null); */

  if (isLoading) {
    return <></>;
  }
  return (
    <UserContext.Provider value={{ userToken }}>
      <NavigationContainer theme={DarkTheme}>
        <Stack.Navigator>
          {userToken !== null ? (
            <>
              <Stack.Screen name='Home' component={HomeScreen} />

              <Stack.Screen
                name='Maximal Murdle'
                component={HomeScreen}
                options={{
                  title: 'Maximal(Murdle)',
                }}
              />

              <Stack.Screen
                name='Main Menu'
                component={GameScreen}
                options={{
                  title: 'Maximal(Murdle)',
                  headerTintColor: '#fff',
                  animation: 'slide_from_right', //optional
                  headerTitleStyle: {
                    fontWeight: 'bold',
                  },
                }}
              />

              <Stack.Screen
                name='Rules'
                component={RulesScreen}
                options={{
                  title: 'How to Play',
                  headerTintColor: '#fff',
                  animation: 'slide_from_right', //optional
                  headerTitleStyle: {
                    fontWeight: 'bold',
                  },
                }}
              />
              <Stack.Screen
                name='Leaderboard'
                component={LeaderboardScreen}
                options={{
                  title: 'Leaderboard',
                  headerTintColor: '#fff',
                  animation: 'slide_from_right', //optional
                  headerTitleStyle: {
                    fontWeight: 'bold',
                  },
                }}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name='Login'
                component={LoginScreen}
                screenOptions={{ headerTitleAlign: 'center' }}
              />
              <Stack.Screen
                name='Registration'
                component={RegistrationScreen}
                screenOptions={{ headerTitleAlign: 'center' }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
};

export default AppNav;
