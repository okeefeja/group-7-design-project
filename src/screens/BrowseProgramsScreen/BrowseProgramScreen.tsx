import React, { useEffect, useState } from "react";
import { fetchAllWorkoutPrograms } from "../../services/API";
import { WorkoutProgram, WorkoutProgramList } from "../../types/API";
import CardList from "../../components/CardList/CardList";
import WorkoutCard from "../../components/WorkoutProgramCard/WorkoutProgramCard";
import { ScBaseContainer } from "../../components/BaseContainer/BaseContainer.styled";
import { navigateToWorkoutProgram } from "../../services/navigationUtils";
import Descriptor from "../../components/WorkoutDescriptor/Descriptor";
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
  const [error, setError] = useState(false);

  async function getWorkoutProgram(): Promise<void> {
    const fetchedWorkoutPrograms: WorkoutProgramList | null =
      await fetchAllWorkoutPrograms();

    if (fetchedWorkoutPrograms) {
      setWorkoutPrograms(fetchedWorkoutPrograms);
    } else {
      setError(true);
    }
  }

  function onPressHandler(id: number) {
    navigateToWorkoutProgram(navigation, id);
  }

  function handleFilterSelect(filter: string): void {
    console.log("Button Pressed");
  }

  useEffect(() => {
    getWorkoutProgram();
  }, []);

  const filterOptions = ['Back', 'Shoulders', 'Legs', 'Chest', 'Arms', 'Cardio'];
  
  return (
    <ScBaseContainer>
      <Descriptor
        title="Workout Programs"
        description="Browse here for your new favorite workout program!"
      />
         <FilterList filters={filterOptions} onFilterSelect={handleFilterSelect} />
      <Spacer size={4} orientation="vertical" />
      <CardList data={workoutPrograms} action={onPressHandler} />
    </ScBaseContainer>
  );
}