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
    "New Recipe": {recipeId : string};
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
        name="New Recipe"
        component={EditRecipeScreen} />
    </RecipeStack.Navigator>
    )
}


function RecipeList() {
  const recipes  = useAppSelector(state => state.recipes);
  const styles = createStyleSheet();
  const navigation = useNavigation();
  const appDispatch = useAppDispatch();
  const addRecipe = () => {
    const recipeId = uuid.v1();
    appDispatch({
      type : "Recipe/Added",
      payload : recipeId,
    });
    navigation.dispatch(CommonActions.navigate(
      "New Recipe", 
      { recipeId : recipeId }));
  }

  return (
    <View style={styles.container}>
      {recipes.sections.map((section) =>
          <List.Section key={section.title}>
            <List.Subheader>{section.title}</List.Subheader>
            {section.data.map((recipe) => 
                    <List.Item key={recipe.name}
                      title={recipe.name}
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