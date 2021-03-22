import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { Menu, TextInput, useTheme } from 'react-native-paper';
import IncredientList from './IncredientList';


export default function IncredientCard() {
    const styles = createStyleSheet();
    return (
    <KeyboardAvoidingView style={
        {flex: 1}
        }>
        <View style={styles.cardView}>
            <TextInput
                style={styles.titleTextInput}
                mode={"flat"}
                placeholder={"Main Ingredients"}
             />
            <IncredientList />
            <Menu.Item title="Ingredient"
                icon="plus" />
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
            borderRadius : 10,
            borderWidth : 1,
            borderColor : paperTheme.colors.placeholder,
        },
        titleTextInput : {
            marginTop: 0,
            paddingTop: 0,
        }
    });
}
