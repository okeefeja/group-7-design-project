import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";
import { DummyData, DummyList } from "./types/API";
import { fetchFromBackend } from "./services/API";

export default function App() {
  const [data, setData] = useState<DummyList | null>();
  const [error, setError] = useState(false);

  async function getDummyData(): Promise<void> {
    const fetchedDummyData: DummyList | null = await fetchFromBackend();
    if (fetchedDummyData) {
      setData(fetchedDummyData);
    } else {
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
        data.map((element: DummyData, i: number) => {
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

// Temporary styling
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
