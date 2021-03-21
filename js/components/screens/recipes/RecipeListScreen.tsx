import { StyleSheet, Text, View } from "react-native";
import React from 'react';
import { useGrayScaleColorScheme } from "../../hooks/ColorScheme";
import { useAppSelector } from "../../hooks/redux";
import { FAB, List } from 'react-native-paper';
import { CommonActions, useNavigation } from "@react-navigation/core";
import { createStackNavigator } from '@react-navigation/stack';
import AddRecipeScreen from "./AddRecipeScreen";

export default function RecipeListScreen () {

  const RecipeStack = createStackNavigator();

    return (
    <RecipeStack.Navigator screenOptions={{
      headerShown : false,
    }}>
      <RecipeStack.Screen
        name="RecipeList"
        component={RecipeList} />
      <RecipeStack.Screen
        name="AddRecipe"
        component={AddRecipeScreen} />
    </RecipeStack.Navigator>
    )
}


function RecipeList() {
  const recipes  = useAppSelector(state => state.recipes);
  const styles = createStyleSheet();
  const navigation = useNavigation();
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
        onPress={() => navigation.dispatch(CommonActions.navigate({
          name : "AddRecipe"
        }))}
      />
    </View>
    );
}

RecipeListScreen.navigationOptions = {
  title : "Recipes",
};

function createStyleSheet() {
  const colorScheme = useGrayScaleColorScheme();
  return StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 0,
      marginHorizontal: 0,
      backgroundColor: colorScheme.grayscale900,
    },
    fab: {
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 0, 
    }
  });
}