import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { KeyboardAvoidingView, View } from 'react-native';
import { TextInput, useTheme } from 'react-native-paper';


export default function AddRecipeScreen() {
  const [sectionTitle, setSectionTitle] = React.useState('');
  const [name, setName] = React.useState('');

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
          <TextInput
            label="Section"
            mode="outlined"
            value={sectionTitle}
            onChangeText={sectionTitle => setSectionTitle(sectionTitle)} />

          <TextInput
            label="Recipe Name"
            mode="outlined"
            value={name}
            onChangeText={name => setName(name)} />
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