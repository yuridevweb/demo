import React, { useEffect, useState, useContext } from "react";
import styles from "./styles";
import {
  KeyboardAvoidingView,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AuthContext } from "../../context/AuthContext";
// import {
//   signInWithEmailAndPassword,
//   browserLocalPersistence,
//   setPersistence,
// } from 'firebase/auth';
// import { getDocs, collection, doc, getDoc } from 'firebase/firestore';
// import { auth, db } from '../../../firebase';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let { login } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={{ flex: 1, width: "100%" }}>
        {/* <View style={styles.headerView}>
          <Text style={styles.headerText}>
            Maximal(<Text style={{ color: '#bb0a1e' }}>Murdle</Text>) 🔪
            <Text style={{ fontSize: 10 }}>🩸</Text>
          </Text>
        </View> */}
        <Image
          style={styles.logo}
          source={require("../../../assets/murdle-logo.png")}
        />
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setEmail(text)}
          value={email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => login(email, password)}
        >
          <Text style={styles.buttonTitle}>Log in</Text>
        </TouchableOpacity>
        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            Don't have an account?{" "}
            {/*           <Text onPress={handleRegister} style={styles.footerLink}>
              Sign up
            </Text> */}
          </Text>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen;
