import {
  BodyPartList,
  ExerciseList,
  NewUser,
  User,
  WorkoutProgram,
  WorkoutProgramForPOST,
  WorkoutProgramList,
} from "../types/API";

export const baseURL = "http://192.168.0.66:5000";

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

async function fetchFavoriteWorkoutPrograms(
  userId: string
): Promise<WorkoutProgramList | null> {
  try {
    const response = await fetch(
      `${baseURL}/users/${userId}/favorite_workouts`
    );
    if (response.ok) {
      const data: WorkoutProgramList = await response.json();
      return data;
    } else {
      console.error(
        `Failed to fetch favorite workouts. Status: ${response.status}`
      );
      return null;
    }
  } catch (error) {
    console.error(`Error fetching favorite workouts: ${error}`);
    return null;
  }
}

async function fetchWorkoutProgramsbyUser(
  userId: string
): Promise<WorkoutProgramList | null> {
  try {
    const response = await fetch(`${baseURL}/users/${userId}/workout_programs`);
    if (response.ok) {
      const data: WorkoutProgramList = await response.json();
      return data;
    } else {
      console.error(`Failed to fetch workouts. Status: ${response.status}`);
      return null;
    }
  } catch (error) {
    console.error(`Error fetching workouts: ${error}`);
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

async function updateProfilePic(
  userId: string,
  profilePic: string
): Promise<boolean> {
  try {
    const response = await fetch(
      `${baseURL}/users/${userId}/update_profile_pic`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ profile_pic: profilePic }),
      }
    );
    return response.ok;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function fetchIngredients(query: string) {
  const url = `https://api.spoonacular.com/food/ingredients/search?apiKey=6b6598b92df34af89d85e63091012fcd&query=${query}&number=5&metaInformation=true`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Network response was not ok, status: ${response.status}`
      );
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching food categories:", error);
    return null;
  }
}

async function fetchIngredientByID(id: number) {
  const url = `https://api.spoonacular.com/food/ingredients/${id}/information?apiKey=6b6598b92df34af89d85e63091012fcd&amount=100&unit=g`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Network response was not ok, status: ${response.status}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching food categories:", error);
    return null;
  }
}

export {
  fetchAllWorkoutPrograms,
  fetchFilteredWorkoutPrograms,
  fetchWorkoutProgramById,
  fetchBodyParts,
  fetchAllExercises,
  addWorkoutProgram,
  fetchUserById,
  addUser,
  updateUserPersonalBests,
  updateUsername,
  fetchFavoriteWorkoutPrograms,
  fetchWorkoutProgramsbyUser,
  updateProfilePic,
  fetchIngredients,
  fetchIngredientByID,
};
