import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';

export interface SectionProps {
    label: string,
}

export default function Section(props: SectionProps) {
    const { label } = props;
    const styles = createStyleSheet();

    return (
        <View style={styles.container}> 
            <View>
                <View style={styles.divider}>
                    <Text style={styles.label}>{label}</Text>
                </View>
            </View>
        </View>

    );

}

function createStyleSheet() {
    const theme = useTheme();
    return StyleSheet.create({
        container: {
            flex: 1,
            height: 20,
            marginTop: 16,
            marginBottom: 0,
            paddingBottom: 0,
            minHeight: 16,
            overflow: "visible",
        },
        divider: {
            backgroundColor: theme.colors.placeholder,
            height: StyleSheet.hairlineWidth,
            overflow: "visible",
            alignItems: "center",
        },
        label: {
            position: "relative",
            bottom: 10,
            height: 20,
            paddingLeft: 4,
            paddingRight: 4,
            margin: 0,
            padding: 0,
            color: theme.colors.placeholder,
            textAlignVertical: "top",
            backgroundColor: theme.colors.background,
        }
    });
}