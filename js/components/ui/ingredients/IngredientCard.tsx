import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { Menu, TextInput, useTheme } from 'react-native-paper';
import { Ingredient, IngredientSet } from '../../../reducers/Recipes';
import IngredientList from './IngredientList';

interface IngredientCardProps {
    card: IngredientSet,
    onUpdate: (ingredienSet: IngredientSet) => void;
}

export default function IngredientCard(props : IngredientCardProps) {
    const {card, onUpdate} = props;
    const styles = createStyleSheet();
    return (
    <KeyboardAvoidingView style={
        {flex: 1}
        }>
        <View style={styles.cardView}>
            <TextInput
                style={styles.titleTextInput}
                value={card.name}
                mode={"flat"}
                dense
                onChangeText={(newText) => onUpdate({...card, name: newText})}
             />
            <IngredientList ingredients={card.ingredients} onUpdate={(ingredients) => onUpdate({...card, ingredients: ingredients})} />

        </View>
        </KeyboardAvoidingView>
    )
}

function createStyleSheet() {
    const paperTheme = useTheme();
    return StyleSheet.create({
        cardView: {
            marginTop: 16,
            padding: 8,
            paddingBottom: 0,
            borderRadius : 3,
            borderWidth : 1,
            backgroundColor: paperTheme.colors.background,
            borderColor : paperTheme.colors.placeholder,
            elevation: 1,
            
        },
        titleTextInput : {
            marginTop: 0,
            paddingTop: 0,
            fontWeight: "900",
            backgroundColor: paperTheme.colors.background,
        }
    });
}
