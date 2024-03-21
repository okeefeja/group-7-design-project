import React, { useEffect, useState } from "react";
import {
  ScBaseContainer,
  ScBaseContainerScroll,
} from "../../components/BaseContainer/BaseContainer.styled";
import { View, Text } from "react-native";
import Descriptor from "../../components/Descriptor/Descriptor";
import UserInput from "../../components/UserInput/UserInput";
import Spacer from "../../components/Spacer/Spacer";
import { ExerciseList, User, WorkoutProgramForPOST } from "../../types/API";
import {
  addWorkoutProgram,
  fetchAllExercises,
  fetchUserById,
} from "../../services/API";
import ExerciseListSmall from "../../components/ExerciseListSmall/ExerciseListSmall";
import SubmitButton from "../../components/Buttons/SubmitButton/SubmitButton";
import CancelButton from "../../components/Buttons/CancelButton/CancelButton";
import TextButton from "../../components/Buttons/TextButton/TextButton";
import { getAuth } from "firebase/auth";
import { navigateToBrowseWorkoutPrograms } from "../../services/navigationUtils";

export default function AddWorkoutProgramScreen({ navigation }: any) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [exercises, setExercises] = useState<ExerciseList | null>(null);
  const [error, setError] = useState(false);
  const [selectedExercises, setSelectedExercises] = useState<number[]>([]);
  const [user, setUser] = useState<string>("");
  const workoutProgram: WorkoutProgramForPOST = {
    name: name,
    description: description,
    exercises: selectedExercises,
    owner: user,
  };

  async function getUser() {
    const auth = getAuth();
    if (auth.currentUser) {
      setUser(auth.currentUser.uid);
    }
  }

  async function getExercises() {
    const fetchedExercises: ExerciseList | null = await fetchAllExercises();
    if (fetchedExercises) {
      setExercises(fetchedExercises);
    } else {
      setError(true);
    }
  }

  function handleSelect(id: number) {
    if (selectedExercises.includes(id)) {
      setSelectedExercises(
        selectedExercises.filter((exerciseId) => exerciseId !== id)
      ); // Remove exercise id if already selected
    } else {
      setSelectedExercises([...selectedExercises, id]); // Add exercise id if not selected
    }
  }

  function removeSelection() {
    setSelectedExercises([]);
  }

  function handleSubmit() {
    addWorkoutProgram(workoutProgram);
    navigateToBrowseWorkoutPrograms(navigation);
  }

  useEffect(() => {
    getExercises();
    getUser();
  }, []);

  return (
    <ScBaseContainerScroll>
      <Descriptor title="Add workout program" />
      <Spacer orientation="vertical" size={4} />
      <UserInput
        title="Workout program name"
        placeholder="Name"
        value={name}
        setValue={setName}
      />
      <Spacer orientation="vertical" size={4} />
      <UserInput
        title="Description"
        placeholder="Description"
        value={description}
        setValue={setDescription}
        textArea={true}
      />
      <Spacer orientation="vertical" size={4} />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "baseline",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ color: "white", fontSize: 22, fontWeight: "600" }}>
          Add exercises{" "}
          <Text style={{ color: "#303030" }}>({selectedExercises.length})</Text>
        </Text>
        <Spacer orientation="horizontal" size={2} />
        <TextButton label="Remove selections" onClick={removeSelection} />
      </View>
      <Text style={{ color: "gray", fontSize: 14, fontWeight: "400" }}>
        Click on exercises to select!
      </Text>
      <Spacer orientation="vertical" size={3} />
      {exercises && (
        <ExerciseListSmall
          exercises={exercises}
          handleClick={handleSelect}
          selectedExercises={selectedExercises}
        />
      )}
      <Spacer orientation="vertical" size={3} />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <SubmitButton label="Add program" onClick={handleSubmit} />
        <Spacer orientation="horizontal" size={3} />
        <CancelButton />
      </View>
      <Spacer orientation="vertical" size={5} />
      <Spacer orientation="vertical" size={5} />
    </ScBaseContainerScroll>
  );
}
