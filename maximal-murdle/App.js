import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
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
} from "./src/screens";
import { UserContext } from "./src/context/User";
import { AuthProvider } from "./src/context/AuthContext";

import AppNav from "./src/navigation/AppNav";

export default function App() {
  /* React.useEffect(() => {
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
  }, []); */

  return (
    <AuthProvider>
      <AppNav />
    </AuthProvider>
  );
}
