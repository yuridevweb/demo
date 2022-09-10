import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './firebase';
import {
  LoginScreen,
  HomeScreen,
  RegistrationScreen,
  GameScreen,
  RulesScreen,
  LeaderboardScreen,
  ResultsScreen
} from './src/screens';
import { UserContext } from './src/context/User';

const Stack = createNativeStackNavigator();

export default function App() {
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState(null);
  console.log('user:', user);

  React.useEffect(() => {
    const fetchUser = async (user) => {
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);
      const userData = userSnap.data();
      setUser(userData);
      setLoading(false);
    };

    onAuthStateChanged(auth, (user) => {
      if (user) {
        try {
          fetchUser(user);
        } catch (err) {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    });
  }, []);

  if (loading) {
    return <></>;
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <NavigationContainer theme={DarkTheme}>
        <Stack.Navigator>
          {user ? (
            <>
              <Stack.Screen name='Home' component={HomeScreen} />

              <Stack.Screen
                name='Maximal Murdle'
                component={HomeScreen}
                options={{
                  title: 'Maximal(Murdle)'
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
                    fontWeight: 'bold'
                  }
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
                    fontWeight: 'bold'
                  }
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
                    fontWeight: 'bold'
                  }
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
}
