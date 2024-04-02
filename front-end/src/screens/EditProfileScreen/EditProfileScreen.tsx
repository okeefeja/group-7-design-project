import React, { useEffect, useState } from "react";
import { ScBaseContainerScroll } from "../../components/BaseContainer/BaseContainer.styled";
import { Image, Text, TouchableOpacity, View, Platform } from "react-native";
import UserDescriptor from "../../components/UserDescriptor/UserDescriptor";
import {
  getAuth,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import {
  fetchUserById,
  updateProfilePic,
  updateUsername,
} from "../../services/API";
import { User } from "../../types/API";
import InputForm from "../../components/InputForm/InputForm";
import Spacer from "../../components/Spacer/Spacer";
import * as ImagePicker from "expo-image-picker";
import { uploadImage } from "../../../firebaseModel";

export default function EditProfileScreen() {
  const [user, setUser] = useState<User | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const auth = getAuth();

  const handleChangePassword = async () => {
    try {
      const user = auth.currentUser;

      if (!user) {
        throw new Error("No user signed in.");
      }

      if (newPassword !== confirmNewPassword) {
        throw new Error("New password and confirm new password do not match.");
      }

      const credential = EmailAuthProvider.credential(
        user.email || "", // Assuming user is signed in with email/password
        currentPassword
      );

      await reauthenticateWithCredential(auth.currentUser, credential);
      await updatePassword(auth.currentUser, newPassword);

      setPasswordError(null); // Reset error state
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (error: any) {
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      setPasswordError(error.message);
    }
  };

  async function handleUsernameUpdate() {
    if (user && username) {
      await updateUsername(user.id, username);
      getUser();
    }
  }

  async function getUser(): Promise<void> {
    try {
      if (auth.currentUser?.uid) {
        const userId = auth.currentUser?.uid;
        const fetchedUser: User | null = await fetchUserById(userId);
        if (fetchedUser) {
          setUser(fetchedUser);
          setUsername(fetchedUser.username);
        }
      } else {
        setError("something went wrong!");
      }
    } catch (error: any) {
      setError(error.message);
    }
  }

  const pickImage = async () => {
    let result: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      try {
        // Convert image URI to Blob
        const response = await fetch(result.assets[0].uri);
        if (!response.ok) {
          throw new Error(
            `Failed to fetch image: ${response.status} ${response.statusText}`
          );
        }
        const blob = await response.blob();

        // Call the uploadImage function with user ID and image Blob
        if (user) {
          uploadImage(user.id, blob, onUploadSuccess, onUploadError);
        }
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    }
  };

  const onUploadSuccess = async (downloadURL: string) => {
    console.log("Image uploaded successfully!");
    if (user) {
      await updateProfilePic(user.id, downloadURL);
      getUser();
    }
  };

  const onUploadError = (error: any) => {
    console.error("Error uploading image:", error);
    // You can handle errors here if the image upload fails
  };

  useEffect(() => {
    getUser();
  }, [error, passwordError]);
  return (
    <ScBaseContainerScroll>
      {user && (
        <>
          <UserDescriptor
            username={user.username}
            email={user.email}
            profilePic={user.profile_pic}
            onPress={pickImage}
            editable={true}
          />
          <Spacer orientation="vertical" size={4} />

          <InputForm
            title="Account information"
            formData={[
              {
                name: "Username",
                placeholder: "Enter username...",
                password: false,
                value: username,
                setValue: setUsername,
              },
            ]}
            onSubmit={handleUsernameUpdate}
            error={false}
            successMessage="Username change completed!"
          />
          <Spacer orientation="vertical" size={3} />
          <InputForm
            title="Change password"
            formData={[
              {
                name: "Current password",
                placeholder: "•••••••••",
                password: true,
                value: currentPassword,
                setValue: setCurrentPassword,
              },
              {
                name: "New password",
                placeholder: "Enter new password...",
                password: true,
                value: newPassword,
                setValue: setNewPassword,
              },
              {
                name: "Confirm new password",
                placeholder: "Confirm new password...",
                password: true,
                value: confirmNewPassword,
                setValue: setConfirmNewPassword,
              },
            ]}
            onSubmit={handleChangePassword}
            error={passwordError}
            successMessage="Password succesfully changed!"
          />
          <Spacer orientation="vertical" size={5} />
        </>
      )}
    </ScBaseContainerScroll>
  );
}
