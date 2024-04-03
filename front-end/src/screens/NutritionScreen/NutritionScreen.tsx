import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import {
  ScBaseContainer,
  ScBaseContainerScroll,
} from "../../components/BaseContainer/BaseContainer.styled";
import { fetchIngredientByID, fetchIngredients } from "../../services/API";
import { ViewCol, ViewRow } from "../../components/Global/ViewFlex";
import Spacer from "../../components/Spacer/Spacer";
import NutritionTracker from "../../components/NutritionTracker/NutritionTracker";
import TextButton from "../../components/Buttons/TextButton/TextButton";
import UserInput from "../../components/UserInput/UserInput";
import SubmitButton from "../../components/Buttons/SubmitButton/SubmitButton";
import IngredientSearchCard from "../../components/IngredientSearchCard/IngredientSearchCard";
import { TouchableOpacity } from "react-native-gesture-handler";
import IngredientCardFull from "../../components/IngredientCardFull/IngredientCardFull";
import { FoodItem, Nutrient } from "../../types/API";

const DEVDATA = [
  { label: "Protein", total: 91 },
  { label: "Carbs", total: 102 },
  { label: "Fat", total: 62 },
];

type IngredientListType = {
  id: number;
  image: string;
  name: string;
}[];

interface NutritionTotals {
  calories: number;
  macros: Macro[];
}

type Macro = {
  label: string;
  total: number;
};

// OVERALL TODO
//      * Add dropdown functionality to show more nutrients on IngredientCardFull
//      * Add ClearAll functionality to nutrition tracker
//      * Fix text styling and formatting on IngredientCardFull
//      * Add Spacers between IngredientCardFull

export default function NutritionScreen() {
  const [ingredients, setIngredients] = useState<IngredientListType | null>(
    null
  );
  const [selectedIngredients, setSelectedIngredients] = useState<
    FoodItem[] | null
  >(null);
  const [nutritionTotals, setNutritionTotals] = useState({
    calories: 0,
    macros: [
      {
        label: "Protein",
        total: 0,
      },
      {
        label: "Carbs",
        total: 0,
      },
      {
        label: "Fat",
        total: 0,
      },
    ],
  });
  const [error, setError] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [ingredientWeights, setIngredientWeights] = useState<{
    [key: number]: number;
  }>({}); // Store weights for each ingredient

  async function getIngredients(): Promise<void> {
    const fetchedIngredients: IngredientListType | null =
      await fetchIngredients(searchQuery);

    // TODO: Fix so that the search query is removed after addition
    if (fetchedIngredients) {
      setIngredients(fetchedIngredients);
    } else {
      setError(true);
    }
  }

  async function getIngredientByID(id: number): Promise<void> {
    const fetchedIngredient: FoodItem | null = await fetchIngredientByID(id);

    if (fetchedIngredient) {
      // Update selected ingredients
      setSelectedIngredients((prevSelectedIngredients: FoodItem[] | null) =>
        prevSelectedIngredients
          ? [...prevSelectedIngredients, fetchedIngredient]
          : [fetchedIngredient]
      );

      // Calculate new totals
      const newTotals = calculateNewTotals(fetchedIngredient);

      // Update nutrition totals
      setNutritionTotals(newTotals);
    } else {
      setError(true);
    }
  }

  // Function to calculate new totals based on the added ingredient
  const calculateNewTotals = (ingredient: FoodItem): NutritionTotals => {
    let newCalories = nutritionTotals.calories;
    const newMacros = [...nutritionTotals.macros];

    // Update calories
    const calories = ingredient.nutrition.nutrients.find(
      (nutrient) => nutrient.name === "Calories"
    );
    if (calories) {
      newCalories += calories.amount;
    }

    // Update macros
    newMacros.forEach((macro) => {
      const nutrient = ingredient.nutrition.nutrients.find(
        (nutrient) => nutrient.name === macro.label
      );
      if (nutrient) {
        macro.total += nutrient.amount;
      }
    });

    return {
      calories: newCalories,
      macros: newMacros,
    };
  };

  const handleIngredientAdd = async (id: number) => {
    await getIngredientByID(id);
    setSearchQuery("");
    setIngredients(null);
  };

  const handleWeightChange = (id: number, weight: number) => {
    setIngredientWeights({ ...ingredientWeights, [id]: weight });
  };

  const handleUpdateTotals = () => {
    let newCalories = 0;
    let newMacros: Macro[] = [];

    selectedIngredients?.forEach((ingredient) => {
      const weight = ingredientWeights[ingredient.id] ?? 100;
      const factor = weight / 100;

      ingredient.nutrition.nutrients.forEach((nutrient) => {
        // Check if the nutrient is one of the macros we want to include
        if (
          ["Calories", "Protein", "Carbohydrates", "Fat"].includes(
            nutrient.name
          )
        ) {
          if (nutrient.name === "Calories") {
            newCalories += Number((nutrient.amount * factor).toFixed(1));
          } else {
            const existingMacro = newMacros.find(
              (macro) => macro.label === nutrient.name
            );
            if (existingMacro) {
              existingMacro.total += Number(
                (nutrient.amount * factor).toFixed(1)
              );
            } else {
              newMacros.push({
                label: nutrient.name,
                total: Number((nutrient.amount * factor).toFixed(1)),
              });
            }
          }
        }
      });
    });

    setNutritionTotals({
      calories: Number(newCalories.toFixed(1)),
      macros: newMacros.map((macro) => ({
        label: macro.label,
        total: Number(macro.total.toFixed(1)),
      })),
    });
  };

  const handleClear = () => {
    setSelectedIngredients(null);
    setNutritionTotals({
      calories: 0,
      macros: [
        {
          label: "Protein",
          total: 0,
        },
        {
          label: "Carbs",
          total: 0,
        },
        {
          label: "Fat",
          total: 0,
        },
      ],
    });
    setIngredientWeights({});
  };

  return (
    <ScBaseContainerScroll>
      <View style={{ minHeight: 800 }}>
        <NutritionTracker nutritionData={nutritionTotals} />
        <Spacer orientation="vertical" size={4} />
        <ViewRow
          style={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <Text style={{ color: "white", fontSize: 26, fontWeight: "600" }}>
            Nutrition tracker
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <TextButton label="Clear" onClick={handleClear} />
            <Spacer orientation="horizontal" size={3} />
          </View>
        </ViewRow>
        {selectedIngredients ? (
          <>
            <Text style={{ color: "gray", fontSize: 14 }}>
              Click on ingredients to show macros!
            </Text>
            <Spacer orientation="vertical" size={1} />
            {selectedIngredients.map((ingredient, i) => {
              return (
                <>
                  <IngredientCardFull
                    key={i}
                    name={ingredient.name}
                    defaultWeight={ingredientWeights[ingredient.id] ?? 100}
                    onWeightChange={(weight) =>
                      handleWeightChange(ingredient.id, weight)
                    }
                  />
                  <Spacer orientation="vertical" size={2} />
                </>
              );
            })}
            <Spacer orientation="vertical" size={3} />
            <SubmitButton
              label="Update amounts"
              onClick={handleUpdateTotals}
              style={{ alignItems: "center" }}
            />
          </>
        ) : (
          <Text style={{ color: "gray", fontSize: 16 }}>
            Use the search bar to start tracking!
          </Text>
        )}
        <Spacer orientation="vertical" size={4} />
        <ViewRow style={{ alignItems: "flex-end" }}>
          <View style={{ flexGrow: 1 }}>
            <UserInput
              title="Search ingredients"
              placeholder="Search for ingredient..."
              value={searchQuery}
              setValue={setSearchQuery}
            />
          </View>
          <Spacer orientation="horizontal" size={2} />
          <ViewCol>
            <SubmitButton label="Search" onClick={getIngredients} />
          </ViewCol>
        </ViewRow>
        {ingredients && (
          <>
            <Spacer orientation="vertical" size={3} />
            <Text style={{ color: "white", fontSize: 26, fontWeight: "600" }}>
              Results
            </Text>
            <Text style={{ color: "gray", fontSize: 14 }}>
              Click on an ingredient to add!
            </Text>
            <Spacer orientation="vertical" size={1} />
            <ScrollView style={{ display: "flex" }}>
              {ingredients.map((ingredient) => {
                return (
                  <TouchableOpacity
                    onPress={() => handleIngredientAdd(ingredient.id)}
                  >
                    <IngredientSearchCard name={ingredient.name} />
                    <Spacer orientation="vertical" size={2} />
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </>
        )}
      </View>
    </ScBaseContainerScroll>
  );
}
