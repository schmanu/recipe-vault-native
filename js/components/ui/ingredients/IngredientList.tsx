import React from 'react';
import { View } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { Menu, TextInput } from 'react-native-paper';
import { Ingredient, Unit } from '../../../reducers/Recipes';
import IngredientLine from './IngredientLine';

interface IngredientListProps {
    ingredients: Array<Ingredient>
    onUpdate: (ingredients: Array<Ingredient>) => void,
}

export default function IngredientList(props : IngredientListProps) {
    const {ingredients, onUpdate} = props;
    return (
    <View>
        {ingredients.map((ingredient, idx) => <IngredientLine onUpdate={(updatedIngredient) => onUpdate(ingredients.map((value, innerIdx) => {
            if (idx === innerIdx) {
                return updatedIngredient;
            } else {
                return value;
            }
        }))} ingredient={ingredient} />)}
        <Menu.Item title="Ingredient"
            icon="plus" onPress={() => onUpdate([...ingredients, {name: "New Ingredient"}])} />
    </View>
    );
}