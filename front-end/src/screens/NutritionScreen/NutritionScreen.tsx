import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { ScBaseContainer } from "../../components/BaseContainer/BaseContainer.styled";
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

// OVERALL TODO
//      * Add nutrient tracking to big labels
//      * Add dropdown functionality to show more nutrients on IngredientCardFull
//      * Add ClearAll functionality to nutrition tracker
//      * Fix text styling and formatting on IngredientCardFull
//      * Add Spacers between IngredientCardFull

export default function NutritionScreen() {
  const [ingredients, setIngredients] = useState<IngredientListType | null>(
    null
  );
  const [selectedIngredients, setSelectedIngredients] = useState<any[] | null>(
    null
  );
  const [error, setError] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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
    const fetchedIngredient: any = await fetchIngredientByID(id);

    // TODO: Fix so that user can remove selected ingredient
    if (fetchedIngredient) {
      if (selectedIngredients) {
        setSelectedIngredients([...selectedIngredients, fetchedIngredient]);
      } else {
        setSelectedIngredients([fetchedIngredient]);
      }
    } else {
      setError(true);
    }
  }

  useEffect(() => {
    if (selectedIngredients) {
    }
  }, [selectedIngredients]);
  return (
    <ScBaseContainer>
      <View style={{ height: "100%" }}>
        <NutritionTracker calories={2247} nutritionData={DEVDATA} />
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
            <TextButton label="Clear" onClick={alert} />
            <Spacer orientation="horizontal" size={3} />
          </View>
        </ViewRow>
        {selectedIngredients ? (
          <>
            <Text style={{ color: "gray", fontSize: 14 }}>
              Click on ingredients to show full nutrients!
            </Text>
            <Spacer orientation="vertical" size={1} />
            {selectedIngredients.map((ingredient) => {
              return <IngredientCardFull name={ingredient.name} />;
            })}
          </>
        ) : (
          <Text style={{ color: "gray", fontSize: 16 }}>
            Nothing added yet!
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
                    onPress={() => getIngredientByID(ingredient.id)}
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
    </ScBaseContainer>
  );
}
