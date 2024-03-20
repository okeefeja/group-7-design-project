import {
  BodyPartList,
  ExerciseList,
  WorkoutProgram,
  WorkoutProgramForPOST,
  WorkoutProgramList,
} from "../types/API";

const baseURL = "http://10.6.68.163:5000";

async function fetchAllWorkoutPrograms(): Promise<WorkoutProgramList | null> {
  try {
    const response = await fetch(`${baseURL}/workout_programs`);
    if (response.ok) {
      const data: WorkoutProgramList = await response.json();
      return data;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function fetchWorkoutProgramById(
  programId: number
): Promise<WorkoutProgram | null> {
  try {
    const response = await fetch(`${baseURL}/workout_programs/${programId}`);
    if (response.ok) {
      const data: WorkoutProgram = await response.json();
      return data;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function fetchBodyParts(): Promise<BodyPartList | null> {
  try {
    const response = await fetch(`${baseURL}/body_parts`);
    if (response.ok) {
      const data: BodyPartList = await response.json();
      return data;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function fetchAllExercises(): Promise<ExerciseList | null> {
  try {
    const response = await fetch(`${baseURL}/exercises`);
    if (response.ok) {
      const data: ExerciseList = await response.json();
      return data;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function addWorkoutProgram(workoutProgram: WorkoutProgramForPOST) {
  try {
    const response = await fetch(`${baseURL}/workout_programs/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(workoutProgram),
    });
    return response.ok;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export {
  fetchAllWorkoutPrograms,
  fetchWorkoutProgramById,
  fetchBodyParts,
  fetchAllExercises,
  addWorkoutProgram,
};