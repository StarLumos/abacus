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
import { Menu } from "@/components/navigation/Menu";
import React, { useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AbacusContainer } from "@/components/Abacus";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

function Mode({ finite }: {
    finite: boolean
}) {
    return (
        <View>
            <MaterialCommunityIcons name="infinity" size={24} color="black" />
        </View>
    )
}

function Dock() {
    return (
        <View style={styles.dock} >
            <View style={styles.exercises}>
                <Text style={styles.textcolor}>Timed</Text>
                <Text style={styles.textcolor}>Timed</Text>
            </View>
            <View style={styles.settings}>
                <Text style={styles.textcolor}>Infinite toggle</Text>
                <Text style={styles.textcolor}>Show Answer</Text>
            </View>
        </View >
    )
}

export default function HomeScreen() {
    return (
        <View>
            <Dock />
            <Mode finite={true} />
            <AbacusContainer />
        </View>
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
    untoggled: {
        backgroundColor: 'white',
    },
    toggled: {
        backgroundColor: 'yellow',
    },
    dock: {
        backgroundColor: '#2e2e2e',
        margin: 'auto',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '50%',
        height: 30,
        borderRadius: 10
    },
    exercises: {
        color: "yellow",
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: "50%",
        height: '75%'
    },
    settings: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '50%',
        height: '75%'
    },
    textcolor: {
        color: 'white'
    }
});
