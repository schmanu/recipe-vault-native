import { StyleSheet, Text, View } from "react-native";
import React from 'react';
import { createStackNavigator, StackHeaderProps } from "@react-navigation/stack";
import NavigationHeader from "../../navigation/NavigationHeader";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { CommonActions, useNavigation } from "@react-navigation/native";
import uuid from "react-native-uuid";
import { FAB, List } from "react-native-paper";

export type RootStackParamList = {
  Trips: undefined;
}

export default function TripListScreen () {

const RecipeStack = createStackNavigator<RootStackParamList>();

  return (
  <RecipeStack.Navigator screenOptions={{
    header : (props : StackHeaderProps) => <NavigationHeader {...props} />,
    headerShown: true,
}}>
    <RecipeStack.Screen
      name="Trips"
      component={TripList} />
  </RecipeStack.Navigator>
  )
}


function TripList() {
const recipes  = useAppSelector(state => state.recipes);
const sections = Array.from(new Set(recipes.recipes.map(recipe => recipe.section)));
const styles = createStyleSheet();
const navigation = useNavigation();
const appDispatch = useAppDispatch();
const addTrip = () => {
  const tripId = uuid.v1();
  appDispatch({
    type : "Trip/Added",
    payload : {tripId : tripId},
  });
  navigation.dispatch(CommonActions.navigate(
    "Edit Trips", 
    { tripId : tripId }));
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
      onPress={addTrip}
    />
  </View>
  );
}

TripListScreen.navigationOptions = {
title : "Trips",
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
    elevation: 2,
  }
});
}