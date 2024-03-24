import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ExerciseList } from "../../types/API";
import { ScListContainer } from "./ExerciseListSmall.styled";
import Spacer from "../Spacer/Spacer";
import filterExercisesByBodyPart from "./ExerciseListSmall.utils";
import SelectExerciseCard from "../SelectExerciseCard/SelectExerciseCard";
import Collapser from "../Collapser/Collapser";
import ExerciseInformationCard from "../ExerciseInformationCard/ExerciseInformationCard";

interface ExerciseListSmallProps {
  exercises: ExerciseList;
  selectedExercises: number[];
  handleClick: (id: number) => void;
  type?: "select" | "info";
}
export default function ExerciseListSmall({
  exercises,
  selectedExercises,
  type = "select",
  handleClick,
}: ExerciseListSmallProps) {
  const [armsSelected, setArmsSelected] = useState(true);
  const [backSelected, setBackSelected] = useState(true);
  const [chestSelected, setChestSelected] = useState(true);
  const [legsSelected, setLegsSelected] = useState(true);
  const [shouldersSelected, setShouldersSelected] = useState(true);

  // ARMS, BACK, CHEST, LEGS, SHOULDERS
  const filteredExercises = filterExercisesByBodyPart(exercises);
  return (
    <View>
      <Collapser
        title="Arms"
        selected={armsSelected}
        handleClick={() => setArmsSelected(!armsSelected)}
      />
      <Spacer orientation="vertical" size={2} />
      {armsSelected ? (
        <>
          <ScListContainer>
            {filteredExercises.Arms.map((exercise) => {
              const isSelected = selectedExercises.includes(exercise.id);
              if (type === "select") {
                return (
                  <SelectExerciseCard
                    exercise={exercise}
                    isSelected={isSelected}
                    handleClick={handleClick}
                    key={exercise.id}
                  />
                );
              } else if (type === "info") {
                return (
                  <ExerciseInformationCard
                    exercise={exercise}
                    isSelected={isSelected}
                    handleClick={handleClick}
                    key={exercise.id}
                  />
                );
              }
            })}
          </ScListContainer>
          <Spacer orientation="vertical" size={3} />
        </>
      ) : null}

      <Collapser
        title="Back"
        selected={backSelected}
        handleClick={() => setBackSelected(!backSelected)}
      />
      <Spacer orientation="vertical" size={2} />
      {backSelected ? (
        <>
          <ScListContainer>
            {filteredExercises.Back.map((exercise) => {
              const isSelected = selectedExercises.includes(exercise.id);
              if (type === "select") {
                return (
                  <SelectExerciseCard
                    exercise={exercise}
                    isSelected={isSelected}
                    handleClick={handleClick}
                    key={exercise.id}
                  />
                );
              } else if (type === "info") {
                return (
                  <ExerciseInformationCard
                    exercise={exercise}
                    isSelected={isSelected}
                    handleClick={handleClick}
                    key={exercise.id}
                  />
                );
              }
            })}
          </ScListContainer>
          <Spacer orientation="vertical" size={3} />
        </>
      ) : null}

      <Collapser
        title="Chest"
        selected={chestSelected}
        handleClick={() => setChestSelected(!chestSelected)}
      />
      <Spacer orientation="vertical" size={2} />
      {chestSelected ? (
        <>
          <ScListContainer>
            {filteredExercises.Chest.map((exercise) => {
              const isSelected = selectedExercises.includes(exercise.id);
              if (type === "select") {
                return (
                  <SelectExerciseCard
                    exercise={exercise}
                    isSelected={isSelected}
                    handleClick={handleClick}
                    key={exercise.id}
                  />
                );
              } else if (type === "info") {
                return (
                  <ExerciseInformationCard
                    exercise={exercise}
                    isSelected={isSelected}
                    handleClick={handleClick}
                    key={exercise.id}
                  />
                );
              }
            })}
          </ScListContainer>
          <Spacer orientation="vertical" size={3} />
        </>
      ) : null}

      <Collapser
        title="Legs"
        selected={legsSelected}
        handleClick={() => setLegsSelected(!legsSelected)}
      />
      <Spacer orientation="vertical" size={2} />
      {legsSelected ? (
        <>
          <ScListContainer>
            {filteredExercises.Legs.map((exercise) => {
              const isSelected = selectedExercises.includes(exercise.id);
              if (type === "select") {
                return (
                  <SelectExerciseCard
                    exercise={exercise}
                    isSelected={isSelected}
                    handleClick={handleClick}
                    key={exercise.id}
                  />
                );
              } else if (type === "info") {
                return (
                  <ExerciseInformationCard
                    exercise={exercise}
                    isSelected={isSelected}
                    handleClick={handleClick}
                    key={exercise.id}
                  />
                );
              }
            })}
          </ScListContainer>
          <Spacer orientation="vertical" size={3} />
        </>
      ) : null}

      <Collapser
        title="Shoulders"
        selected={shouldersSelected}
        handleClick={() => setShouldersSelected(!shouldersSelected)}
      />
      <Spacer orientation="vertical" size={2} />
      {shouldersSelected ? (
        <>
          <ScListContainer>
            {filteredExercises.Shoulders.map((exercise) => {
              const isSelected = selectedExercises.includes(exercise.id);
              if (type === "select") {
                return (
                  <SelectExerciseCard
                    exercise={exercise}
                    isSelected={isSelected}
                    handleClick={handleClick}
                    key={exercise.id}
                  />
                );
              } else if (type === "info") {
                return (
                  <ExerciseInformationCard
                    exercise={exercise}
                    isSelected={isSelected}
                    handleClick={handleClick}
                    key={exercise.id}
                  />
                );
              }
            })}
          </ScListContainer>
          <Spacer orientation="vertical" size={3} />
        </>
      ) : null}
    </View>
  );
}
