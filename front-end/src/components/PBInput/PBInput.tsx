import React, { useState } from "react";
import { View, Text } from "react-native";
import SubmitButton from "../Buttons/SubmitButton/SubmitButton";
import Spacer from "../Spacer/Spacer";
import UserInput from "../UserInput/UserInput";
import TextButton from "../Buttons/TextButton/TextButton";

interface PBInputProps {
  values: (string | null)[];
  setValues: ((value: string) => void)[];
  onSubmit: () => void;
}

export default function PBInput({ values, setValues, onSubmit }: PBInputProps) {
  const [editMode, setEditMode] = useState(false);

  function handleSubmit() {
    onSubmit();
    setEditMode(false);
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
          Personal bests
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
      <Spacer orientation="vertical" size={1} />
      <UserInput
        title="Bench press"
        placeholder={values[0] ? values[0] : "Set personal best..."}
        value={editMode ? (values[0] ? values[0] : "") : ""}
        setValue={setValues[0]}
        disabled={!editMode}
      />
      <Spacer orientation="vertical" size={2} />
      <UserInput
        title="Deadlift"
        placeholder={values[1] ? values[1] : "Set personal best..."}
        value={editMode ? (values[1] ? values[1] : "") : ""}
        setValue={setValues[1]}
        disabled={!editMode}
      />
      <Spacer orientation="vertical" size={2} />
      <UserInput
        title="Squats"
        placeholder={values[2] ? values[2] : "Set personal best..."}
        value={editMode ? (values[2] ? values[2] : "") : ""}
        setValue={setValues[2]}
        disabled={!editMode}
      />
      {editMode && (
        <>
          <Spacer orientation="vertical" size={4} />
          <SubmitButton
            label="Confirm gains!"
            onClick={handleSubmit}
            style={{ alignItems: "center" }}
          />
        </>
      )}
    </View>
  );
}
