import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { Badge, IconButton, Menu, TextInput, useTheme } from 'react-native-paper';
import { Ingredient, IngredientSet } from '../../../reducers/Recipes';
import IngredientList from './IngredientList';

interface IngredientCardProps {
    card: IngredientSet,
    stepNo: number,
    onUpdate: (ingredienSet: IngredientSet) => void;
    onRemove: (id: string) => void;
}

export default function IngredientCard(props : IngredientCardProps) {
    const {card, onUpdate, onRemove, stepNo} = props;
    const styles = createStyleSheet();
    return (
    <KeyboardAvoidingView style={
        {flex: 1}
        }>
        <View style={styles.cardView}>
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center"}}>
                <Badge size={24} style={{ alignSelf: "center"}} visible>{stepNo}</Badge>
                <TextInput
                    label="Step"
                    style={styles.titleTextInput}
                    value={card.name}
                    mode={"outlined"}
                    dense
                    onChangeText={(newText) => onUpdate({...card, name: newText})}
                />
                <IconButton style={{flex: 0, alignSelf: "center"}} size={19} icon="delete" onPress={() => onRemove(card.id)} />
            </View>
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
            flex: 1,
            marginLeft: 8,
            paddingTop: 0,
            fontWeight: "900",
            backgroundColor: paperTheme.colors.background,
        }
    });
}
