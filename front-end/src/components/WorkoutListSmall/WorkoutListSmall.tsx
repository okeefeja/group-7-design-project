import React from "react";
import { View, Text } from "react-native";
import Spacer from "../Spacer/Spacer";
import WorkoutProgramCard from "../WorkoutProgramCard/WorkoutProgramCard";
import { WorkoutProgramList } from "../../types/API";
import { navigateToWorkoutProgram } from "../../services/navigationUtils";

interface WorkoutListSmallProps {
  title: string;
  workoutPrograms: WorkoutProgramList;
  onPress: (id: number) => void;
  emptyText: string;
}

export default function WorkoutListSmall({
  title,
  workoutPrograms,
  onPress,
  emptyText,
}: WorkoutListSmallProps) {
  return (
    <View>
      <Text style={{ color: "white", fontSize: 26, fontWeight: "600" }}>
        {title}
      </Text>

      {workoutPrograms.length === 0 && (
        <Text style={{ fontSize: 16, color: "gray" }}>{emptyText}</Text>
      )}

      <Spacer orientation="vertical" size={2} />
      <View style={{ display: "flex", gap: 8 }}>
        {workoutPrograms.map((wp, i) => {
          return (
            <WorkoutProgramCard
              title={wp.name}
              owner={wp.owner.username}
              description={wp.description}
              bodyParts={wp.body_parts}
              action={() => onPress(wp.id)}
              size="small"
              key={i}
            />
          );
        })}
      </View>
    </View>
  );
}
