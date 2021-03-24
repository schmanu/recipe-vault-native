import React from 'react';
import { View } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { Menu, TextInput } from 'react-native-paper';
import { Ingredient } from '../../../reducers/Recipes';

interface IngredientListProps {
    ingredients: Array<Ingredient>
}

export default function IngredientList(props : IngredientListProps) {
    const {ingredients} = props;
    return (
    <View>
        <Menu.Item title="Ingredient"
            icon="plus" />
    </View>
    );
}