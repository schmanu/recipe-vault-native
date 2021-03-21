import React from 'react';
import { DrawerActions, useNavigation, useRoute } from "@react-navigation/core";
import { Appbar } from 'react-native-paper';

export default function NavigationHeader() {
    const navigation = useNavigation();
    const route = useRoute();
    return (
        <Appbar.Header>
            <Appbar.Action icon="menu" onPress={() => navigation.dispatch(DrawerActions.toggleDrawer)} />
            <Appbar.Content title={route.name} />
        </Appbar.Header>
    )
}