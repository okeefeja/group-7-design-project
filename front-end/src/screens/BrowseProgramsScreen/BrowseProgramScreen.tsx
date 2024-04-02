import React, { useEffect, useState } from "react";
import {
  fetchAllWorkoutPrograms,
  fetchBodyParts,
  fetchFilteredWorkoutPrograms,
} from "../../services/API";
import {
  BodyPartList,
  WorkoutProgram,
  WorkoutProgramList,
} from "../../types/API";
import CardList from "../../components/CardList/CardList";
import { ScBaseContainer } from "../../components/BaseContainer/BaseContainer.styled";
import {
  navigateToAddWorkoutProgram,
  navigateToWorkoutProgram,
} from "../../services/navigationUtils";
import Descriptor from "../../components/Descriptor/Descriptor";
import Spacer from "../../components/Spacer/Spacer";
import FilterList from "../../components/FilterList/FilterList";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import { Text, View } from "react-native";
import TextButton from "../../components/Buttons/TextButton/TextButton";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

interface BrowseProgramScreenProps {
  navigation: any;
}

export default function BrowseProgramScreen({
  navigation,
}: BrowseProgramScreenProps) {
  const [workoutPrograms, setWorkoutPrograms] =
    useState<WorkoutProgramList | null>(null);
  const [bodyParts, setBodyParts] = useState<BodyPartList | null>(null);
  const [error, setError] = useState(false);
  const [filterOptions, setFilterOptions] = useState<number[]>([]);

  async function getWorkoutProgram(): Promise<void> {
    const fetchedWorkoutPrograms: WorkoutProgramList | null =
      await fetchAllWorkoutPrograms();

    if (fetchedWorkoutPrograms) {
      setWorkoutPrograms(fetchedWorkoutPrograms);
    } else {
      setError(true);
    }
  }

  async function getFilteredWorkoutProgram(
    filterIds: Array<number>
  ): Promise<void> {
    const fetchedWorkoutPrograms: WorkoutProgramList | null =
      await fetchFilteredWorkoutPrograms(filterIds);

    if (fetchedWorkoutPrograms) {
      setWorkoutPrograms(fetchedWorkoutPrograms);
    } else {
      setError(true);
    }
  }
  async function getBodyParts(): Promise<void> {
    const fetchedBodyParts: BodyPartList | null = await fetchBodyParts();

    if (fetchedBodyParts) {
      setBodyParts(fetchedBodyParts);
    } else {
      setError(true);
    }
  }

  function onPressHandler(id: number) {
    navigateToWorkoutProgram(navigation, id);
  }

  function handleFilterSelect(filter: number) {
    let updatedFilterOptions: number[];

    if (filterOptions.includes(filter)) {
      updatedFilterOptions = filterOptions.filter(
        (filterOption) => filterOption !== filter
      );
    } else {
      updatedFilterOptions = [...filterOptions, filter];
    }

    setFilterOptions(updatedFilterOptions);

    if (updatedFilterOptions.length === 0) {
      getWorkoutProgram();
    } else {
      getFilteredWorkoutProgram(updatedFilterOptions);
    }
  }

  function handleAddProgram() {
    navigateToAddWorkoutProgram(navigation);
  }

  useEffect(() => {
    getWorkoutProgram();
    getBodyParts();
  }, []);

  return (
    <ScBaseContainer>
      <Descriptor
        title="Workout Programs"
        description="Browse here for your new favorite workout program!"
        showHeartIcon={false}
        isLiked={false}
        toggleLike={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
      <Spacer size={3} orientation="vertical" />
      <FilterList filters={bodyParts} onFilterSelect={handleFilterSelect} />
      <Spacer size={2} orientation="vertical" />
      {workoutPrograms ? (
        <>
          <Text style={{ color: "white", fontSize: 26, fontWeight: "600" }}>
            Featured workout programs
          </Text>
          <TextButton
            label="+ Add your own workout program"
            onClick={handleAddProgram}
          />
          <Spacer size={2} orientation="vertical" />

          <CardList data={workoutPrograms} action={onPressHandler} />
        </>
      ) : (
        <LoadingSpinner text="Loading workout programs..." />
      )}
    </ScBaseContainer>
  );
}
