import { StyleSheet, View } from "react-native";
import React from 'react';
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { FAB, List } from 'react-native-paper';
import { CommonActions, useNavigation } from "@react-navigation/core";
import { createStackNavigator, StackHeaderProps } from '@react-navigation/stack';
import EditRecipeScreen from "./EditRecipeScreen";
import NavigationHeader from "../../navigation/NavigationHeader";
import uuid from "react-native-uuid";

export type RootStackParamList = {
    Recipes: undefined;
    "Edit Recipe": {recipeId : string};
}

export default function RecipeListScreen () {

  const RecipeStack = createStackNavigator<RootStackParamList>();

    return (
    <RecipeStack.Navigator screenOptions={{
      header : (props : StackHeaderProps) => <NavigationHeader {...props} />,
      headerShown: true,
  }}>
      <RecipeStack.Screen
        name="Recipes"
        component={RecipeList} />
      <RecipeStack.Screen
        name="Edit Recipe"
        component={EditRecipeScreen} />
    </RecipeStack.Navigator>
    )
}


function RecipeList() {
  const recipes  = useAppSelector(state => state.recipes);
  const sections = Array.from(new Set(recipes.recipes.map(recipe => recipe.section)));
  const styles = createStyleSheet();
  const navigation = useNavigation();
  const appDispatch = useAppDispatch();
  const addRecipe = () => {
    const recipeId = uuid.v1();
    appDispatch({
      type : "Recipe/Added",
      payload : {recipeId : recipeId},
    });
    navigation.dispatch(CommonActions.navigate(
      "Edit Recipe", 
      { recipeId : recipeId }));
  }

  return (
    <View style={styles.container}>
      {sections.map((section) =>
          <List.Section key={section}>
            <List.Subheader>{section}</List.Subheader>
            {recipes.recipes
              .filter(recipe => recipe.section === section)
              .map((recipe) => 
                    <List.Item key={recipe.id}
                      title={recipe.name}
                      onPress={() => navigation.dispatch(CommonActions.navigate("Edit Recipe", {recipeId: recipe.id}))}
                      left={() => <List.Icon icon="silverware-fork-knife" />}
                      />

              )}
          </List.Section>
      )}
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={addRecipe}
      />
    </View>
    );
}

RecipeListScreen.navigationOptions = {
  title : "Recipes",
};

function createStyleSheet() {
  return StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 0,
      marginHorizontal: 0,
    },
    fab: {
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 0, 
    }
  });
}