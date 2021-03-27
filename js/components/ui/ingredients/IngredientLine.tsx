import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Ingredient, Unit } from '../../../reducers/Recipes';
import DropDownInput from '../../common/DropDownInput';

export interface IngredientLineProps {
    ingredient: Ingredient,
    onUpdate: (updatedIngredient: Ingredient) => void,
}

export default function IncredientLine(props: IngredientLineProps) {
    const {ingredient, onUpdate} = props;
    return (
        <View style={styles.container}>
           <TextInput 
            style={styles.textInputAmount} 
            keyboardType="number-pad" 
            placeholder="0" 
            dense 
            value={ingredient.quantitiy?.toString()}
            onChangeText={(newAmount) => onUpdate({...ingredient, quantitiy: getAmount(newAmount)})} />
           <DropDownInput 
            options={Object.values(Unit).map(value => value.toString())} 
            canAddEntries={false} 
            mode={"flat"} 
            placeholder={"ml"} 
            dense 
            value={ingredient.unit?.toString()}
            onSelectEntry={(newUnit: string) => onUpdate({...ingredient, unit: isUnit(newUnit) ? Unit[newUnit] : undefined})}
            />
           <TextInput 
            style={styles.textInputIngredient} 
            placeholder="Ingredient" 
            mode={"flat"} 
            value={ingredient.name} 
            dense
            onChangeText={(newName) => onUpdate({...ingredient, name: newName})} 
            />
        </View>
    );
}

function isUnit  (maybeUnit: string): maybeUnit is keyof typeof Unit {
    return Object.keys(Unit).indexOf(maybeUnit) !== -1;
}

function getAmount(maybeNumber: string): number | undefined {
    if (maybeNumber === "") {
        return undefined
    } else {
        const asNumber = Number(maybeNumber);
        if (Number.isNaN(asNumber)) {
            return undefined;
        } else {
            return asNumber;
        }
    }
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    textInputAmount: {
        flex: 1,
        marginRight: 4,
    }, 
    textInputIngredient: {
        flex: 4,
        marginLeft: 4,
    }
});

