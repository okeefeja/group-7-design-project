import { DummyList } from "../types/API";

const baseURL = "http://127.0.0.1:5000";

async function fetchFromBackend(): Promise<DummyList | null> {
  try {
    const response = await fetch(`${baseURL}/dev`);
    if (response.ok) {
      const data: DummyList = await response.json();
      return data;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

export { fetchFromBackend };
