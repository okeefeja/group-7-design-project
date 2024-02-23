import React, { useEffect, useState } from "react";
import CardList from "../../components/CardList/CardList";
import Card from "../../components/Card/Card";
import { WorkoutProgram } from "../../types/API";
import { fetchWorkoutProgramById } from "../../services/API";
import { ScBaseContainer } from "../../components/BaseContainer/BaseContainer.styled";

interface WorkoutProgramScreenProps {
  route: any;
}

export default function WorkoutProgramScreen({
  route,
}: WorkoutProgramScreenProps) {
  const workoutProgramId = route.params.workoutId;
  const [workoutProgram, setWorkoutProgram] = useState<WorkoutProgram | null>(
    null
  );
  const [error, setError] = useState(false);

  async function getWorkoutProgram(): Promise<void> {
    const fetchedWorkoutProgram: WorkoutProgram | null =
      await fetchWorkoutProgramById(workoutProgramId);

    if (fetchedWorkoutProgram) {
      setWorkoutProgram(fetchedWorkoutProgram);
    } else {
      setError(true);
    }
  }

  useEffect(() => {
    getWorkoutProgram();
    console.log("WPS:", workoutProgramId);
  }, []);
  return (
    workoutProgram && (
      <ScBaseContainer>
        <CardList
          CardComponent={Card}
          data={workoutProgram.exercises}
          action={() => {}}
        />
      </ScBaseContainer>
    )
  );
}
