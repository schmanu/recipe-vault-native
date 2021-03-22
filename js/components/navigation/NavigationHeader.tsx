import React from 'react';
import { DrawerActions, useNavigation, useRoute } from "@react-navigation/core";
import { Appbar } from 'react-native-paper';
import { StackHeaderProps } from '@react-navigation/stack';

export default function NavigationHeader(props : StackHeaderProps) {
    const {navigation, previous } = props;
    const route = useRoute();
    return (
        <Appbar.Header>
            {previous ? <Appbar.BackAction onPress={navigation.goBack} /> : <Appbar.Action icon="menu" onPress={() => navigation.dispatch(DrawerActions.toggleDrawer)} />}
            <Appbar.Content title={route.name} />
        </Appbar.Header>
    )
}