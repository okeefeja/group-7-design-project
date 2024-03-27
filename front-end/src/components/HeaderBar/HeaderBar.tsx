import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { ScHeaderContainer, styles } from "./HeaderBar.styled";
import TextButton from "../Buttons/TextButton/TextButton";
import Spacer from "../Spacer/Spacer";
import { getAuth } from "firebase/auth";
import { User } from "../../types/API";
import { fetchUserById } from "../../services/API";
import Ionicons from "react-native-vector-icons/Ionicons";

interface CustomHeaderProps {
  username: string;
  navigation: any;
  showBackButton?: boolean;
  showHeaderInfo?: boolean;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  username,
  navigation,
  showBackButton = false,
  showHeaderInfo = true
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState(false);

  const auth = getAuth();

  const handleSignOut = () => {
    auth.signOut();
    navigation.navigate("LoginScreen");
  };

  async function getUser(): Promise<void> {
    try {
      if (auth.currentUser?.uid) {
        const userId = auth.currentUser?.uid;
        const fetchedUser: User | null = await fetchUserById(userId);
        if (fetchedUser) {
          setUser(fetchedUser);
        }
      } else {
        setError(true);
      }
    } catch {
      setError(true);
      console.log("auth/user not found!");
    }
  }

  useEffect(() => {
    setTimeout(() => {
      getUser();
    }, 1500);
  }, []);
  return (
    <ScHeaderContainer>


      <View
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >

      {showBackButton && (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#ff8610" /> 
        </TouchableOpacity>
      )}
        {user && showHeaderInfo ? (
          <>
            <View
              style={{
                height: 35,
                width: 35,
                backgroundColor: "white",
                borderRadius: 999,
              }}
            />
            <Spacer orientation="horizontal" size={2} />
            <Text style={{ color: "white", fontSize: 22, fontWeight: "600" }}>
              {user.username}
            </Text>
          </>
        ) : showHeaderInfo && (
          <Text style={{ color: "white", fontSize: 22, fontWeight: "600" }}>
            Loading...
          </Text>
        )}
      </View>
      {showHeaderInfo &&
      <TextButton label="Sign out" onClick={handleSignOut} />}
    </ScHeaderContainer>
  );
};

export default CustomHeader;
