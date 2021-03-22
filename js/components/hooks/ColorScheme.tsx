import React from 'react';
import { useColorScheme } from 'react-native';
import { CombinedDarkTheme, CombinedDefaultTheme } from '../../theme/CombinedTheme';

export function useCombinedTheme()  {
    const colorScheme = useColorScheme();
    return colorScheme === "light" ? CombinedDefaultTheme : CombinedDarkTheme;
}