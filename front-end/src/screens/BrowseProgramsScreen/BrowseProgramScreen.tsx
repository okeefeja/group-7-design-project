import React, { useEffect, useState } from "react";
import { fetchAllWorkoutPrograms, fetchBodyParts } from "../../services/API";
import {
  BodyPartList,
  WorkoutProgram,
  WorkoutProgramList,
} from "../../types/API";
import CardList from "../../components/CardList/CardList";
import WorkoutCard from "../../components/WorkoutProgramCard/WorkoutProgramCard";
import { ScBaseContainer } from "../../components/BaseContainer/BaseContainer.styled";
import { navigateToWorkoutProgram } from "../../services/navigationUtils";
import Descriptor from "../../components/Descriptor/Descriptor";
import Spacer from "../../components/Spacer/Spacer";
import FilterList from "../../components/FilterList/FilterList";

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
  const [filterOptions, setFilterOptions] = useState<string[]>([]);

  async function getWorkoutProgram(): Promise<void> {
    const fetchedWorkoutPrograms: WorkoutProgramList | null =
      await fetchAllWorkoutPrograms();

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

  function handleFilterSelect(filter: string) {
    let updatedFilterOptions: string[];

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
      setWorkoutPrograms(
        filterWorkoutProgramsByBodyParts(updatedFilterOptions)
      );
    }
  }

  useEffect(() => {
    getWorkoutProgram();
    getBodyParts();
  }, []);

  function filterWorkoutProgramsByBodyParts(filteringOptions: string[]) {
    if (workoutPrograms) {
      return [...workoutPrograms].filter((program) =>
        program.body_parts.every((bodyPart) =>
          filteringOptions.includes(bodyPart.name)
        )
      );
    } else {
      return workoutPrograms;
    }
  }

  return (
    <ScBaseContainer>
      <Descriptor
        title="Workout Programs"
        description="Browse here for your new favorite workout program!"
      />
      <FilterList filters={bodyParts} onFilterSelect={handleFilterSelect} />
      <Spacer size={4} orientation="vertical" />
      <CardList data={workoutPrograms} action={onPressHandler} />
    </ScBaseContainer>
  );
}
