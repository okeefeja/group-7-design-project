import { Text, View } from "react-native";
import styled from "styled-components/native";

export default function App() {
  return (
    <SCcontainer>
      <Text>Frontend framework initialized!</Text>
    </SCcontainer>
  );
}

const SCcontainer = styled.View`
  margin: 50px 12px;
`;
