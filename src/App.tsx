import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";
import { WorkoutProgram, WorkoutProgramList } from "./types/API";
import { fetchFromBackend } from "./services/API";

export default function App() {
  // Declaring states, Reacts' way of keeping track of variables
  // that change over time or by user input

  // Here we declare the data state, since we are using typescript
  // we need to tell React what type "data" will be, since it fetches
  // from backend we tell react that it will either be a "DummyList"
  // (a type we have created, see ./types/API.ts) or null
  const [data, setData] = useState<WorkoutProgramList | null>();

  // If something goes wrong with the request, we want to be able to
  // set an error state to true, default false
  const [error, setError] = useState(false);

  // In typescript we also have to declare what types will be returned
  // from a function, in this case "Promise<Void>"
  async function getDummyData(): Promise<void> {
    const fetchedWorkoutPrograms: WorkoutProgramList | null =
      await fetchFromBackend();

    // If our request is succesfull, we set the state variable "data"
    // to the value "fetchedWorkoutPrograms" from our function
    if (fetchedWorkoutPrograms) {
      setData(fetchedWorkoutPrograms);
    } else {
      // Else we set the error state variable to true
      setError(true);
    }
  }

  useEffect(() => {
    getDummyData();
  }, []);

  return (
    <ScContainer>
      <ScTitle>Frontend framework initialized!</ScTitle>
      {data &&
        data.map((element: WorkoutProgram, i: number) => {
          return (
            <ScExerciseContainer key={i}>
              <ScExerciseTitle>{element.name}</ScExerciseTitle>
              <Text>{element.description}</Text>
            </ScExerciseContainer>
          );
        })}
      {error && <Text>An error occurred!</Text>}
    </ScContainer>
  );
}

// Temporary styling, see styled-components
// In the future this will be in separate files
const ScContainer = styled.View`
  margin: 50px 12px;
`;

const ScTitle = styled.Text`
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 12px;
`;

const ScExerciseContainer = styled.View`
  padding: 12px 0;
  width: 80vw;
`;

const ScExerciseTitle = styled.Text`
  font-weight: 18px;
  font-weight: 600;
`;
