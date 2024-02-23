import React from "react";
import { ExerciseList, WorkoutProgramList } from "../../types/API";
import { ScCardListContainer, ScCardListScrollView } from "./CardList.styled";

interface CardListProps {
  CardComponent: React.FC<{
    title: string;
    description: string;
    action: () => void;
  }>;

  // Add other types of card lists later
  data: WorkoutProgramList | ExerciseList | null;
  action: (id: number) => void;
}

export default function CardList({
  CardComponent,
  data,
  action,
}: CardListProps) {
  return (
    <ScCardListScrollView>
      <ScCardListContainer>
        {data &&
          data.map(
            (cardData: { id: number; name: string; description: string }) => {
              return (
                <CardComponent
                  title={cardData.name}
                  description={cardData.description}
                  action={() => action(cardData.id)}
                />
              );
            }
          )}
      </ScCardListContainer>
    </ScCardListScrollView>
  );
}
