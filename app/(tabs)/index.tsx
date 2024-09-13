import {
    Image,
    StyleSheet,
    Platform,
    Text,
    TextInput,
    View,
    TouchableOpacity,
} from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React, { useState } from "react";
import { Menu } from "@/components/navigation/Menu";
import { AbacusContainer } from "@/components/Abacus"
import { NavigationContainer } from '@react-navigation/native';

export default function HomeScreen() {
    return (
        <View style={{
            backgroundColor: '#1f1f1f',
            height: '100%'
        }}>
            < AbacusContainer />
        </View >
    )
}

const styles = StyleSheet.create({});
