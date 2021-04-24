import React, { useState } from 'react';
import { View } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { Menu, TextInput } from 'react-native-paper';
import { Ingredient, Unit } from '../../../reducers/Recipes';
import IngredientLine from './IngredientLine';

interface IngredientListProps {
    ingredients: Array<Ingredient>
    onUpdate: (ingredients: Array<Ingredient>) => void,
}

export default function IngredientList(props: IngredientListProps) {
    const { ingredients, onUpdate } = props;

    const [focusedIngredient, setFocusedIngredient] = useState<Ingredient | null>(null); 
    return (
        <View>
            {ingredients.map((ingredient, idx) =>
                <IngredientLine 
                    onUpdate={(updatedIngredient) => {onUpdate(ingredients.map((value, innerIdx) => {
                            if (idx === innerIdx) {
                                return updatedIngredient;
                            } else {
                                return value;
                            }
                        }
                        ));
                        setFocusedIngredient(updatedIngredient);
                    }}
                    onRemove={(removedIngredient) => onUpdate(ingredients.filter((ingredient, innerIdx) => idx != innerIdx))}
                    onFocus={(newFocus) => {setFocusedIngredient(newFocus);}}
                    ingredient={ingredient}
                    focusedIngredient={focusedIngredient} />)}
            <Menu.Item title="Ingredient"
                icon="plus" onPress={() => onUpdate([...ingredients, { name: "" }])} />
        </View>
    );
}