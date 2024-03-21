import { ExerciseList, Exercises } from "../../types/API";

interface BodyPartExerciseMap {
  [key: string]: Exercises[];
}

function filterExercisesByBodyPart(
  exercises: ExerciseList
): BodyPartExerciseMap {
  const bodyPartExerciseMap: BodyPartExerciseMap = {};

  // Iterate through each exercise
  exercises.forEach((exercise) => {
    // Iterate through each body part of the exercise
    exercise.body_parts.forEach((bodyPart) => {
      const bodyPartName = bodyPart.name;

      // If the body part does not have an associated list yet, create one
      if (!bodyPartExerciseMap[bodyPartName]) {
        bodyPartExerciseMap[bodyPartName] = [];
      }

      // Add the exercise to the list associated with the body part
      bodyPartExerciseMap[bodyPartName].push(exercise);
    });
  });

  return bodyPartExerciseMap;
}

export default filterExercisesByBodyPart;
