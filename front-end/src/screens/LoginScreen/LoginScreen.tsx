import React, { useEffect, useState } from "react";
import {
  ScBaseContainer,
  ScBaseContainerScroll,
} from "../../components/BaseContainer/BaseContainer.styled";
import BigLogo from "../../components/BigLogo/BigLogo";
import LoginBar from "../../components/LoginBar/LoginBar";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { loginWithEmail, signUpUser } from "../../../firebaseModel";
import { navigateToBrowseWorkoutPrograms } from "../../services/navigationUtils";
import SubmitButton from "../../components/Buttons/SubmitButton/SubmitButton";
import TextButton from "../../components/Buttons/TextButton/TextButton";
import Spacer from "../../components/Spacer/Spacer";
import UserInput from "../../components/UserInput/UserInput";

interface LoginScreenProps {
  navigation: any;
}

const LoginScreen = ({ navigation }: LoginScreenProps) => {
  // Keeps track of login / sign up mode
  const [login, setLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | null>(null);
  const auth = getAuth();

  const handleLogin = () => {
    loginWithEmail(email, password, setError);
  };

  const handleSignUp = () => {
    // TODO: Implement insertion of new user to database
    signUpUser(email, password, setError);
  };

  const handleModeSwitch = () => {
    setLogin(!login);
    setEmail("");
    setPassword("");
    setUsername("");
    setError(null);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigateToBrowseWorkoutPrograms(navigation);
      }
    });
  }, []);
  return (
    <ScBaseContainerScroll>
      <Text style={styles.appTitle}>Fitness App</Text>
      <Text
        style={{
          color: "white",
          fontSize: 36,
          fontWeight: "700",
          textAlign: "center",
        }}
      >
        {login ? "Login" : "Sign up"}
      </Text>
      <Spacer orientation="vertical" size={3} />

      <UserInput
        title="Email"
        placeholder="Email"
        value={email}
        setValue={setEmail}
      />
      {error?.includes("invalid-email") && (
        <>
          <Spacer orientation="vertical" size={2} />
          <Text style={{ color: "#EC2647" }}>Please enter a valid email!</Text>
        </>
      )}
      <Spacer orientation="vertical" size={3} />
      <UserInput
        title="Password"
        placeholder="Password"
        value={password}
        setValue={setPassword}
        password={true}
      />
      {error?.includes("missing-password") && (
        <>
          <Spacer orientation="vertical" size={2} />
          <Text style={{ color: "#EC2647" }}>Please enter a password!</Text>
        </>
      )}
      {error?.includes("invalid-credential") && (
        <>
          <Spacer orientation="vertical" size={2} />
          <Text style={{ color: "#EC2647" }}>
            Wrong email or password! Please try again!
          </Text>
        </>
      )}
      {!login && (
        <>
          <Spacer orientation="vertical" size={3} />
          <UserInput
            title="Username"
            placeholder="Username"
            value={username}
            setValue={setUsername}
          />
        </>
      )}

      <Spacer orientation="vertical" size={5} />
      <SubmitButton
        label={login ? "Login" : "Sign up"}
        onClick={login ? handleLogin : handleSignUp}
        style={{ alignItems: "center" }}
      />
      <Spacer orientation="vertical" size={3} />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginBottom: 300,
        }}
      >
        <Text style={{ color: "gray", fontSize: 16 }}>
          {login ? "Don't have an account?" : "Already have an account?"}{" "}
        </Text>
        <TextButton
          label={login ? "Sign up" : "Login"}
          onClick={handleModeSwitch}
          bold={true}
        />
      </View>
    </ScBaseContainerScroll>
  );
};

const styles = StyleSheet.create({
  appTitle: {
    fontSize: 50, // Increased font size
    fontWeight: "bold", // Bold text
    color: "#ff8610", // Orange color to match the login button
    textAlign: "center", // Center the text
    marginBottom: 100, // Add some space below the title
  },
});

export default LoginScreen;
