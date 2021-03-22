import {createDrawerNavigator} from '@react-navigation/drawer'
import { NavigationContainer, NavigationProp, RouteProp } from '@react-navigation/native';
import RecipeListScreen from '../screens/recipes/RecipeListScreen';
import TripListScreen from '../screens/trips/TripListScreen';
import React from 'react';
import NavigationHeader from './NavigationHeader';
import { Appbar } from 'react-native-paper';
import { useCombinedTheme } from '../hooks/ColorScheme';
import { DrawerHeaderProps } from '@react-navigation/drawer/lib/typescript/src/types';

const Drawer = createDrawerNavigator();

export default function Navigation() {
    const theme = useCombinedTheme();
    return (
    <NavigationContainer theme={theme}>
        <Drawer.Navigator initialRouteName="Recipes" edgeWidth={150} >
            <Drawer.Screen name="Recipes" component={RecipeListScreen} />
            <Drawer.Screen name="Shopping Trips" component={TripListScreen} />
        </Drawer.Navigator>
    </NavigationContainer>
    );
}