import React from "react";
import { WorkoutProgramList } from "../../types/API";
import { View } from "react-native";
import { ScCardListContainer, ScCardListScrollView } from "./CardList.styled";

interface CardListProps {
  CardComponent: React.FC<{ title: string; description: string }>;

  // Add other types of card lists later
  data: WorkoutProgramList | null;
}

export default function CardList({ CardComponent, data }: CardListProps) {
  return (
    <ScCardListScrollView>
      <ScCardListContainer>
        {data &&
          data.map((cardData: { name: string; description: string }) => {
            return (
              <CardComponent
                title={cardData.name}
                description={cardData.description}
              />
            );
          })}
      </ScCardListContainer>
    </ScCardListScrollView>
  );
}
