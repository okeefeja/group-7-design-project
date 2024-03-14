import React, { useEffect, useState } from "react";
import { ScBaseContainer } from "../../components/BaseContainer/BaseContainer.styled";
import BigLogo from "../../components/BigLogo/BigLogo";
import LoginBar from "../../components/LoginBar/LoginBar";
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { signInWithEmailAndPassword, onAuthStateChanged, getAuth } from 'firebase/auth';
import { signInWithEmail } from "../../../firebaseModel";
import { navigateToBrowseWorkoutPrograms } from "../../services/navigationUtils";

interface LoginScreenProps {
  navigation: any;
}

const LoginScreen = ({ navigation }:LoginScreenProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    signInWithEmail(username, password);
  };

  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigateToBrowseWorkoutPrograms(navigation);    
      }
    })
  });

  return (
  <View style={styles.root}>
    <View style={styles.container}>
        <Text style={styles.appTitle}>Fitness App</Text>
        <BigLogo></BigLogo>
        <LoginBar
          title="Username"
          onChangeText={setUsername}
          value={username}
        />
        <LoginBar
          title="Password"
          isPassword={true}
          onChangeText={setPassword}
          value={password}
        />
        {/* <Button title="Login" onPress={handleLogin} /> */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000', // Background color for the entire screen
  },
  container: {
    padding: 20,
    marginTop: 50, // Adjust the margin as needed
  },
  appTitle: {
    fontSize: 50, // Increased font size
    fontWeight: 'bold', // Bold text
    color: '#ff6c01', // Orange color to match the login button
    textAlign: 'center', // Center the text
    marginBottom: 200, // Add some space below the title
  },
  loginButton: {
    height: 70, // Adjust the size of the circle here
    width: 150, // Make sure width and height are equal to get a circle
    backgroundColor: '#ff6c01', // Orange color
    justifyContent: 'center', // Centers the text vertically
    alignItems: 'center', // Centers the text horizontally
    borderRadius: 35, // Half of the height/width to get a perfect circle
    alignSelf: 'center', // Center the button in the container
    marginTop: 20, // Add some margin at the top
  },
  loginButtonText: {
    color: '#000', // White text color
    fontSize: 20, // Adjust text size as needed
    fontWeight: "bold",
  },
});

export default LoginScreen;