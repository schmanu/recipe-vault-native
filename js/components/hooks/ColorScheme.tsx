import React from 'react';
import { useColorScheme } from 'react-native';

export function useGrayScaleColorScheme()  {
    const colorScheme = useColorScheme();
    console.log("Color Scheme: " + colorScheme);
    if (colorScheme === "light") {
        return {
            grayscale100: "#626262",
            grayscale200: "#888888",
            grayscale300: "#a3a3a3",
            grayscale400: "#bababa",
            grayscale500: "#cdcdcd",
            grayscale600: "#dfdfdf",
            grayscale700: "#eeeeee",
            grayscale800: "#fdfdfd",
            grayscale900: "#ffffff",
        }
    } else {
        return {
            grayscale100: "#fdfdfd",
            grayscale200: "#eeeeee",
            grayscale300: "#dfdfdf",
            grayscale400: "#cdcdcd",
            grayscale500: "#bababa",
            grayscale600: "#a3a3a3",
            grayscale700: "#888888",
            grayscale800: "#626262",
            grayscale900: "#000000",
        }
    }
}