import React, { useRef, useState } from 'react';
import { NativeSyntheticEvent, StyleSheet, TargetedEvent, TextInput as NativeTextInput, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';
import { IconButton, TextInput } from 'react-native-paper';
import { Ingredient, Unit } from '../../../reducers/Recipes';
import DropDownInput from '../../common/DropDownInput';
import { useCombinedTheme } from '../../hooks/ColorScheme';

export interface IngredientLineProps {
    ingredient: Ingredient,
    onUpdate: (updatedIngredient: Ingredient) => void,
    onRemove: () => void,
}

export default function IncredientLine(props: IngredientLineProps) {
    const {ingredient, onUpdate, onRemove} = props;
    const ingredientRef = useRef<NativeTextInput>(null);
    const theme = useCombinedTheme();
    const styles = createStyles();
    const [hasFocus, setHasFocus] = useState(true)

    return (
        <TouchableWithoutFeedback onBlur={() => setHasFocus(false)} onFocus={() => setHasFocus(true)}>
            <View style={styles.container} >
                <TextInput
                    theme={theme}
                    style={styles.textInputAmount}
                    keyboardType="number-pad"
                    dense
                    value={ingredient.quantitiy?.toString()}
                    onChangeText={(newAmount) => onUpdate({...ingredient, quantitiy: getAmount(newAmount)})} />
                <View style={styles.containerUnit}>
                <DropDownInput 
                    options={Object.values(Unit).map(value => value.toString())} 
                    canAddEntries={false} 
                    mode={"flat"}
                    placeholder={""} 
                    dense 
                    value={ingredient.unit?.toString()}
                    onSelectEntry={(newUnit: string) => onUpdate({...ingredient, unit: isUnit(newUnit) ? Unit[newUnit] : undefined})}
                    />
                </View>
                <TextInput 
                    ref={ingredientRef}
                    style={styles.textInputIngredient} 
                    placeholder="Ingredient" 
                    mode={"flat"} 
                    value={ingredient.name} 
                    dense
                    autoCapitalize={"none"}
                    onChangeText={(newName) => onUpdate({...ingredient, name: newName})} 
                    />
                <View style={{flex: 1}}>
                    <IconButton style={hasFocus ? {flex: 1, alignSelf: "center"} : {flex: 1, alignSelf: "center", display: "none"}} size={19} icon="close" onPress={() => {console.log("onRemove"); onRemove()}} />
                </View>
            </View>
        </TouchableWithoutFeedback>
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
function createStyles() {
    const theme = useCombinedTheme();
    return StyleSheet.create({
        container: {
            flex: 2,
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: theme.colors.background,
        },
        textInputAmount: {
            flex: 2,
            marginRight: 4,
            backgroundColor: theme.colors.background,
        }, 
        textInputIngredient: {
            flex: 8,
            marginLeft: 4,
            backgroundColor: theme.colors.background,
        },
        containerUnit: {
            flex: 2,
        }
    });
}


