import React, { useEffect, useState } from "react";
import { ScBaseContainerScroll } from "../../components/BaseContainer/BaseContainer.styled";
import Descriptor from "../../components/Descriptor/Descriptor";
import { fetchAllExercises } from "../../services/API";
import { ExerciseList, Exercises } from "../../types/API";
import Collapser from "../../components/Collapser/Collapser";
import { Text } from "react-native";
import ExerciseListSmall from "../../components/ExerciseListSmall/ExerciseListSmall";
import Spacer from "../../components/Spacer/Spacer";

export default function ExerciseInformationScreen() {
  const [exercises, setExercises] = useState<ExerciseList | null>(null);
  const [selectedExercises, setSelectedExercises] = useState<number[]>([]);
  const [error, setError] = useState(false);

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
      />
      <Spacer orientation="vertical" size={4} />
      {exercises && (
        <ExerciseListSmall
          exercises={exercises}
          selectedExercises={selectedExercises}
          handleClick={handleSelect}
          type="info"
        />
      )}
    </ScBaseContainerScroll>
  );
}
