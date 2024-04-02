import {
  BodyPartList,
  ExerciseList,
  NewUser,
  User,
  WorkoutProgram,
  WorkoutProgramForPOST,
  WorkoutProgramList,
} from "../types/API";

const baseURL = "http://10.6.94.135:5000";

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

async function fetchFilteredWorkoutPrograms(
  filters: Array<number>
): Promise<WorkoutProgramList | null> {
  try {
    const response = await fetch(
      `${baseURL}/workout_programs/filtered/${filters}`
    );
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

async function fetchFoodCategories(minProtein = 20, numberOfResults = 20) {
  const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${'6b6598b92df34af89d85e63091012fcd'}&sort=popularity&minProtein=${minProtein}&number=${numberOfResults}`;

  try {
      const response = await fetch(url, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          },
      });

      if (!response.ok) {
          throw new Error(`Network response was not ok, status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      return data.results; 
  } catch (error) {
      console.error('Error fetching food categories:', error);
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

async function fetchUserById(userId: string): Promise<User | null> {
  try {
    const response = await fetch(`${baseURL}/users/${userId}`);
    if (response.ok) {
      const data: User = await response.json();
      return data;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function addUser(user: NewUser) {
  try {
    const response = await fetch(`${baseURL}/users/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return response.ok;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function updateUserPersonalBests(
  userId: string,
  personalBests: {
    bench_press: string | null;
    squats: string | null;
    deadlift: string | null;
  }
): Promise<boolean> {
  try {
    const response = await fetch(
      `${baseURL}/users/update_personal_bests/${userId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(personalBests),
      }
    );
    return response.ok;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function updateUsername(
  userId: string,
  username: string
): Promise<boolean> {
  try {
    const response = await fetch(`${baseURL}/users/update_username/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username }),
    });
    return response.ok;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export {
  fetchAllWorkoutPrograms,
  fetchFilteredWorkoutPrograms,
  fetchWorkoutProgramById,
  fetchBodyParts,
  fetchAllExercises,
  fetchFoodCategories,
  addWorkoutProgram,
  fetchUserById,
  addUser,
  updateUserPersonalBests,
  updateUsername,
};
