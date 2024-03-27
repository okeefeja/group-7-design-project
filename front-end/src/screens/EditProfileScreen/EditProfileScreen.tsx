import React, { useEffect, useState } from "react";
import { ScBaseContainerScroll } from "../../components/BaseContainer/BaseContainer.styled";
import { Text } from "react-native";
import UserDescriptor from "../../components/UserDescriptor/UserDescriptor";
import {
  getAuth,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { fetchUserById, updateUsername } from "../../services/API";
import { User } from "../../types/API";
import InputForm from "../../components/InputForm/InputForm";
import Spacer from "../../components/Spacer/Spacer";

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

  useEffect(() => {
    getUser();
  }, [error, passwordError]);
  return (
    <ScBaseContainerScroll>
      {user && (
        <>
          <UserDescriptor username={user.username} email={user.email} />
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
          <Spacer orientation="vertical" size={5} />
          <Spacer orientation="vertical" size={5} />
          <Spacer orientation="vertical" size={5} />
          <Spacer orientation="vertical" size={5} />
          <Spacer orientation="vertical" size={5} />
        </>
      )}
    </ScBaseContainerScroll>
  );
}
