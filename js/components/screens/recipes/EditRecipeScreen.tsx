import { useRoute } from '@react-navigation/core';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { KeyboardAvoidingView, View } from 'react-native';
import { TextInput, useTheme } from 'react-native-paper';
import { Action } from '../../../actions/types';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import IncredientCard from '../../ui/ingedients/IncredientCard';
import DropDownInput from './DropDownInput';
import { RootStackParamList } from './RecipeListScreen';

function addSection(newSection : string) : Action  {
  return {
    type : "Section/Added",
    payload : newSection
  }
}

type NewRecipeRouteProp = RouteProp<
  RootStackParamList,
  "New Recipe"
>;

export default function EditRecipeScreen() {
  const recipes  = useAppSelector(state => state.recipes);
  const dispatch = useAppDispatch();
  const route = useRoute<NewRecipeRouteProp>();
  const sections = recipes.sections.map(section => section.title);
  const openRecipe = recipes.sections
    .map(section => section.data)
    .flat()
    .find(recipe => recipe.id === route.params.recipeId);
  if (!openRecipe) {
    return <View/>;
  }
  const [sectionTitle, setSectionTitle] = React.useState('');
  const [name, setName] = React.useState(openRecipe?.name);

  const {
    colors: { background, accent },
  } = useTheme();

  return (
    <KeyboardAvoidingView style={
      {flex: 1}
    }>
        <ScrollView
          style={[styles.container, {
            backgroundColor: background
          }]}>
          <DropDownInput
            label="Section"
            options={sections}
            canAddEntries
            onAddEntry={(newEntry) => dispatch(addSection(newEntry))}
            onSelectEntry={setSectionTitle}
             />

          <TextInput
            label="Recipe Name"
            mode="outlined"
            value={name}
            onChangeText={name => setName(name)} />
          <IncredientCard />
          <IncredientCard />
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
});