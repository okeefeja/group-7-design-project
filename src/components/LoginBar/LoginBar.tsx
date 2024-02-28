import React, { useEffect, useState } from "react";
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { ExerciseList } from "../../types/API";
import { ScCardContainer, ScTitleText, ScTextInput } from "./LoginBar.styled";

interface LoginBarProps {
  title: string;
  isPassword?: boolean;
  onChangeText: (text: string) => void;
  value: string;
}

const LoginBar: React.FC<LoginBarProps> = ({ title, isPassword = false, onChangeText, value }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TextInput
        style={styles.input}
        placeholder={title}
        secureTextEntry={isPassword}
        onChangeText={onChangeText}
        value={value}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginVertical: 8,
    backgroundColor: '#ff6c01',
    borderRadius: 12,
  },
  title: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    height: 40,
    width: 300,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
});

export default LoginBar;