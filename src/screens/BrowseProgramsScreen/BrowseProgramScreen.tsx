import React, { useEffect, useState } from "react";
import { fetchAllWorkoutPrograms } from "../../services/API";
import { WorkoutProgram, WorkoutProgramList } from "../../types/API";
import CardList from "../../components/CardList/CardList";
import WorkoutCard from "../../components/WorkoutProgramCard/WorkoutProgramCard";
import { ScBaseContainer } from "../../components/BaseContainer/BaseContainer.styled";
import { navigateToWorkoutProgram } from "../../services/navigationUtils";

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

  useEffect(() => {
    getWorkoutProgram();
  }, []);
  return (
    <ScBaseContainer>
      <CardList data={workoutPrograms} action={onPressHandler} />
    </ScBaseContainer>
  );
}
