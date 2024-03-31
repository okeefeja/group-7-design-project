import React, { useEffect, useState } from "react";
import { ScBaseContainerScroll } from "../../components/BaseContainer/BaseContainer.styled";
import Descriptor from "../../components/Descriptor/Descriptor";
import { fetchAllExercises } from "../../services/API";
import { ExerciseList, Exercises } from "../../types/API";
import Collapser from "../../components/Collapser/Collapser";
import { Text, View, ActivityIndicator } from "react-native";
import ExerciseListSmall from "../../components/ExerciseListSmall/ExerciseListSmall";
import Spacer from "../../components/Spacer/Spacer";

export default function ExerciseInformationScreen() {
  const [exercises, setExercises] = useState<ExerciseList | null>(null);
  const [selectedExercises, setSelectedExercises] = useState<number[]>([]);
  const [error, setError] = useState(false);
  const devTest = false;

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

  useEffect(() => {
    getExercises();
  }, []);

  return (
    <ScBaseContainerScroll>
      <Descriptor
        title="Exercise information"
        description="Learn more about all of our featured exercises!"
        isLiked={false}
        toggleLike={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
      <Spacer orientation="vertical" size={4} />
      {devTest ? (
        exercises && (
          <ExerciseListSmall
            exercises={exercises}
            selectedExercises={selectedExercises}
            handleClick={handleSelect}
            type="info"
          />
        )
      ) : (
        <View style={{ display: "flex", alignItems: "center" }}>
          <ActivityIndicator size={"large"} color="white" />
          <Spacer orientation="vertical" size={1} />
          <Text style={{ color: "white", fontSize: 16 }}>
            Loading exercises...
          </Text>
        </View>
      )}
    </ScBaseContainerScroll>
  );
}
