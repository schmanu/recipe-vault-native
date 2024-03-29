import { useRoute } from '@react-navigation/core';
import { RouteProp } from '@react-navigation/native';
import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { KeyboardAvoidingView, View } from 'react-native';
import { Divider, FAB, Menu, TextInput, useTheme } from 'react-native-paper';
import { Recipe } from '../../../reducers/Recipes';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import DropDownInput from '../../common/DropDownInput';
import { RootStackParamList } from './RecipeListScreen';
import Section from '../../common/Section';
import uuid from 'react-native-uuid';
import IngredientCard from '../../ui/ingredients/IngredientCard';

type NewRecipeRouteProp = RouteProp<RootStackParamList, "Edit Recipe">;

export default function EditRecipeScreen() {
  const recipes = useAppSelector(state => state.recipes);
  const dispatch = useAppDispatch();
  const route = useRoute<NewRecipeRouteProp>();
  const sections = Array.from(new Set(recipes.recipes.map(recipe => recipe.section)));
  console.log("Sections found: " + sections);
  const openRecipe = recipes.recipes
    .find(recipe => recipe.id === route.params.recipeId);
  if (!openRecipe) {
    console.log("No Recipe Found for id: " + route.params.recipeId)
    return <View />;
  }
  const updateRecipe = (recipeUpdate: Partial<Recipe>) => {
    dispatch({
      type: "Recipe/Update",
      payload: { recipeUpdate: recipeUpdate, recipeId: openRecipe.id },
    });
  }

  const {
    colors: { background },
  } = useTheme();

  return (
    <KeyboardAvoidingView style={
      { flex: 1 }
    }>
      <ScrollView
        keyboardShouldPersistTaps={"always"}
        style={[styles.container, {
          backgroundColor: background
        }]}>
        <DropDownInput
          label="Section"
          options={sections}
          canAddEntries
          onAddEntry={(newEntry) => updateRecipe({ section: newEntry })}
          onSelectEntry={(newEntry) => updateRecipe({ section: newEntry })}
          value={openRecipe.section}
        />

        <TextInput
          label="Recipe Name"
          mode="outlined"
          value={openRecipe.name}
          onChangeText={(newName) => updateRecipe({ name: newName })} />
        <Section label={"Ingredients"} />

        {openRecipe.ingredientCards.map((card, idx) => <IngredientCard stepNo={idx + 1} card={card} onUpdate={(newIngredientSet) =>
          updateRecipe({
            ingredientCards: openRecipe.ingredientCards.map((card => {
              if (card.id === newIngredientSet.id) {
                return newIngredientSet;
              } else {
                return card;
              }
            }))
          })}
          onRemove={(removedId) => {
            updateRecipe({
              ingredientCards: openRecipe.ingredientCards.filter((card) => card.id !== removedId)
            })
          }} />)}

        <View
          style={styles.footer}>
          <FAB
            style={styles.fab}
            icon="plus"
            onPress={() => updateRecipe({ ingredientCards: [...openRecipe.ingredientCards, { id: uuid.v1(), ingredients: [] }] })}
          />
        </View>
      </ScrollView>


    </KeyboardAvoidingView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  helpersWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wrapper: {
    flex: 1,
  },
  helper: {
    flexShrink: 1,
  },
  counterHelper: {
    textAlign: 'right',
  },
  inputContainerStyle: {
    margin: 8,
  },
  fontSize: {
    fontSize: 32,
  },
  textArea: {
    height: 80,
  },
  footer: {
    flex: 1, flexDirection: "row", minHeight: 100
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    elevation: 2,
  }
});