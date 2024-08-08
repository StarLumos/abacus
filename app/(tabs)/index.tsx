import {
    Image,
    StyleSheet,
    Platform,
    Text,
    TextInput,
    View,
    TouchableOpacity,
} from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React, { useState } from "react";
import { Menu } from "@/components/navigation/Menu";
import { AbacusUI } from "@/components/Abacus"

export default function HomeScreen() {
    return (
        <AbacusUI leftColumns={9} rightColumns={3} />
    )
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: "absolute",
    },
});
