import {  } from '@react-navigation/core';
import React, { useState } from 'react';
import { LayoutChangeEvent, Pressable, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { Button, Dialog, Divider, Menu, Portal, TextInput, useTheme } from 'react-native-paper';

interface DropDownInputProperties {
  options: string[],
  onSelectEntry?: (selectedEntry: string) => void,
  onAddEntry?: (newEntry: string) => void,
  canAddEntries?: boolean,
  defaultOption?: string,
  label: string,
}

export default function DropDownInput(props : DropDownInputProperties) {
  let defaultOption = "";
  if (props.options.length > 0) {
    defaultOption = props.defaultOption ? props.defaultOption : props.options[0];
  }
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const openDropDown = () => {
    if (!isDropDownOpen) {
      setIsDropDownOpen(true);
    };
  }

  const closeDropDown = () => {
    setIsDropDownOpen(false);
  }

  const [selectedValue, setSelectedValue] = useState(defaultOption);
  const [newOptionValue, setNewOptionValue] = useState("");
  const onOptionSaved = () => {
    if (props.onAddEntry) {
      props.onAddEntry(newOptionValue);
    }
    hideAddDialog();
    setSelectedValue(newOptionValue);
    setNewOptionValue("");
  }

  const [isAddDialogVisible, setIsAddDialogVisible] = useState(false);
  const showAddDialog = () => {
    closeDropDown();
    setIsAddDialogVisible(true);
  }
  const hideAddDialog = () => setIsAddDialogVisible(false);

  const [inputLayout, setInputLayout] = useState({
    height: 0,
    width: 0,
    x: 0,
    y: 0,
  });
  const onLayout = (event: LayoutChangeEvent) => {
    setInputLayout(event.nativeEvent.layout);
  };

  const theme = useTheme();
  const hackedTheme = {...theme, colors : {...theme.colors, placeholder : theme.colors.primary}};

  return (
    <View style={styles.container}>
      <Menu
        visible={isDropDownOpen}
        onDismiss={closeDropDown}
        anchor={
          <Pressable onPress={openDropDown} onLayout={onLayout}>
            <TextInput
              theme={isDropDownOpen ? hackedTheme : theme}
              value={selectedValue}
              mode={'outlined'}
              label={props.label}
              pointerEvents={"none"}
              editable={false}
              right={<TextInput.Icon name="arrow-down-drop-circle-outline" />}
            />
          </Pressable>
        }
        style={{
          maxWidth: inputLayout?.width,
          width: inputLayout?.width,
          marginTop: inputLayout?.height,
        }}
        >
        {props.options.map((option =>
          <Menu.Item
            key={option}
            title={option}
            style={styles.menuItem}
            onPress={() => {
              setSelectedValue(option);
              closeDropDown();
            }}
          />
        ))}
        <Divider />
        <Menu.Item
          title={"New Section"}
          icon={"plus"}
          onPress={showAddDialog}
        >
        </Menu.Item>
      </Menu>
      <Portal>
        <Dialog
          visible={isAddDialogVisible}
          onDismiss={hideAddDialog}>
          <Dialog.Title style={{
            paddingTop : 0,
            paddingBottom : 0,
            marginTop : 8,
            marginBottom : 8,

          }}> Enter new {props.label} </Dialog.Title>
          <Divider />
          <Dialog.Content style={{
            paddingTop : 8,
            paddingBottom : 8,
          }}>
            <TextInput
              mode={"flat"}
              style= {{
                fontSize : 14,
                height: 48,
              }}
              value={newOptionValue}
              onChangeText={setNewOptionValue}
            />
          </Dialog.Content>
          <Divider />
          <Dialog.Actions>
          <Button onPress={hideAddDialog}> Cancel</Button>
            <Button onPress={onOptionSaved}> OK</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  menuItem: {
    
    //alignSelf: "center",
  }
});