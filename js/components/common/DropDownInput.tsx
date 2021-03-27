import { } from '@react-navigation/core';
import React, { useState } from 'react';
import { LayoutChangeEvent, Pressable, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { Button, Dialog, Divider, Menu, Portal, TextInput, useTheme } from 'react-native-paper';

interface DropDownInputProperties {
  options: string[],
  onSelectEntry?: (selectedEntry: string) => void,
  onAddEntry?: (newEntry: string) => void,
  canAddEntries?: boolean,
  value?: string,
  label?: string,
  mode?: "flat" | "outlined",
  dense?: boolean,
  placeholder?: string,
}

export default function DropDownInput(props: DropDownInputProperties) {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const openDropDown = () => {
    if (!isDropDownOpen) {
      setIsDropDownOpen(true);
    };
  }

  const closeDropDown = () => {
    setIsDropDownOpen(false);
  }

  const [newOptionValue, setNewOptionValue] = useState("");
  const onOptionSaved = () => {
    if (props.onAddEntry) {
      props.onAddEntry(newOptionValue);
    }
    hideAddDialog();
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
  const hackedTheme = { ...theme, colors: { ...theme.colors, placeholder: theme.colors.primary } };

  return (
    <View style={styles.container}>
      <Menu
        visible={isDropDownOpen}
        onDismiss={closeDropDown}
        anchor={
          <Pressable onPress={openDropDown} onLayout={onLayout}>
            <TextInput
              theme={isDropDownOpen ? hackedTheme : theme}
              value={props.value}
              mode={props.mode ? props.mode : "outlined"}
              label={props.label}
              pointerEvents={"none"}
              editable={false}
              dense={props.dense}
              placeholder={props.placeholder}
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
              if (props.onSelectEntry) {
                props.onSelectEntry(option);
              }
              closeDropDown();
            }}
          />
        ))}
        {props.canAddEntries &&
          <>
            <Divider />
            <Menu.Item
              title={"New Section"}
              icon={"plus"}
              onPress={showAddDialog}
            >
            </Menu.Item>
          </>
        }
      </Menu>
      {props.canAddEntries &&
        <Portal>
          <Dialog
            visible={isAddDialogVisible}
            onDismiss={hideAddDialog}>
            <Dialog.Title style={{
              paddingTop: 0,
              paddingBottom: 0,
              marginTop: 8,
              marginBottom: 8,

            }}> Enter new {props.label} </Dialog.Title>
            <Divider />
            <Dialog.Content style={{
              paddingTop: 8,
              paddingBottom: 8,
            }}>
              <TextInput
                mode={"flat"}
                style={{
                  fontSize: 14,
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
      }
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
