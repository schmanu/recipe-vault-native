import {createDrawerNavigator} from '@react-navigation/drawer'
import { NavigationContainer, NavigationProp, RouteProp } from '@react-navigation/native';
import RecipeListScreen from '../screens/recipes/RecipeListScreen';
import TripListScreen from '../screens/trips/TripListScreen';
import React from 'react';
import NavigationHeader from './NavigationHeader';
import { Appbar } from 'react-native-paper';

const Drawer = createDrawerNavigator();

export default function Navigation() {
    return (
        
    <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home" edgeWidth={150} screenOptions={{
            header : () => <NavigationHeader />,
            headerShown: true,
        }}>
            <Drawer.Screen name="Recipes" component={RecipeListScreen} />
            <Drawer.Screen name="Shopping Trips" component={TripListScreen} />
        </Drawer.Navigator>
    </NavigationContainer>
    );
}