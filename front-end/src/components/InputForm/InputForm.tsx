import React, { useState } from "react";
import { View, Text } from "react-native";
import SubmitButton from "../Buttons/SubmitButton/SubmitButton";
import Spacer from "../Spacer/Spacer";
import UserInput from "../UserInput/UserInput";
import TextButton from "../Buttons/TextButton/TextButton";

interface InputFormProps {
  title: string;
  formData: {
    name: string;
    placeholder: string;
    value: string | null;
    setValue: (value: string) => void;
    password: boolean;
  }[];
  onSubmit: () => void;
  error: any;
  successMessage: string;
}

export default function InputForm({
  title,
  formData,
  onSubmit,
  error,
  successMessage,
}: InputFormProps) {
  const [editMode, setEditMode] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit() {
    await onSubmit();
    if (!error) {
      setSuccess(true);
      setEditMode(false);
      setTimeout(() => {
        setSuccess(false);
      }, 3500);
    }
  }
  return (
    <View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "baseline",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ color: "white", fontSize: 26, fontWeight: "600" }}>
          {title}
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <TextButton label="Edit" onClick={() => setEditMode(!editMode)} />
          <Spacer orientation="horizontal" size={3} />
        </View>
      </View>
      <Spacer orientation="vertical" size={2} />
      {formData.map((inputData) => {
        return (
          <>
            <UserInput
              title={inputData.name}
              placeholder={
                inputData.value ? inputData.value : inputData.placeholder
              }
              value={editMode ? (inputData.value ? inputData.value : "") : ""}
              setValue={inputData.setValue}
              disabled={!editMode}
              password={inputData.password}
              key={inputData.name}
            />
            <Spacer orientation="vertical" size={3} />
          </>
        );
      })}
      {error && <Text style={{ color: "red" }}>{error}</Text>}
      {success && (
        <View
          style={{
            backgroundColor: "#49CB00",
            padding: 18,
            borderRadius: 12,
          }}
        >
          <Text
            style={{
              color: "#2E8100",
              fontSize: 16,
              fontWeight: "700",
              textAlign: "center",
            }}
          >
            {successMessage}
          </Text>
        </View>
      )}
      {editMode && (
        <>
          <Spacer orientation="vertical" size={3} />
          <SubmitButton
            label="Confirm"
            onClick={handleSubmit}
            style={{ alignItems: "center" }}
          />
        </>
      )}
    </View>
  );
}
