import React, { useEffect, useState } from 'react';
import styles from './styles';
import {
  KeyboardAvoidingView,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  signInWithEmailAndPassword,
  browserLocalPersistence,
  setPersistence,
} from 'firebase/auth';
import { getDocs, collection, doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../../firebase';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate('Home');
      }
    });

    return unsubscribe;
  }, []);

  const handleRegister = async () => {
    navigation.navigate('Registration');
  };

  const handleLogin = async () => {
    try {
      // Set persistance
      // await setPersistence(auth, browserLocalPersistence);

      // login user
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Returns user credentials
      const uid = userCredentials.user.uid;
      console.log('Logged in with:', uid);

      // Retrieve a single user from db
      const userRef = doc(db, 'users', uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        alert('User does not exist anymore');
        return;
      }

      const user = userSnap.data();

      //  Unnecessary db call for testing purposes

      const usersData = await getDocs(collection(db, 'users'));
      usersData.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().scores}`);
      });

      // Link to HomeScreen if user exists on db
      navigation.navigate('Home', { user });
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={{ flex: 1, width: '100%' }}>
        {/* <View style={styles.headerView}>
          <Text style={styles.headerText}>
            Maximal(<Text style={{ color: '#bb0a1e' }}>Murdle</Text>) 🔪
            <Text style={{ fontSize: 10 }}>🩸</Text>
          </Text>
        </View> */}
        <Image
          style={styles.logo}
          source={require('../../../assets/murdle-logo.png')}
        />
        <TextInput
          style={styles.input}
          placeholder='E-mail'
          placeholderTextColor='#aaaaaa'
          onChangeText={(text) => setEmail(text)}
          value={email}
          underlineColorAndroid='transparent'
          autoCapitalize='none'
        />
        <TextInput
          style={styles.input}
          placeholderTextColor='#aaaaaa'
          secureTextEntry
          placeholder='Password'
          onChangeText={(text) => setPassword(text)}
          value={password}
          underlineColorAndroid='transparent'
          autoCapitalize='none'
        />
        <TouchableOpacity style={styles.button} onPress={() => handleLogin()}>
          <Text style={styles.buttonTitle}>Log in</Text>
        </TouchableOpacity>
        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            Don't have an account?{' '}
            <Text onPress={handleRegister} style={styles.footerLink}>
              Sign up
            </Text>
          </Text>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen;
