import { createContext, useContext, ReactNode } from "react";

import {
    Image,
    StyleSheet,
    Platform,
    Text,
    TextInput,
    View,
    Pressable
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
import Octicons from '@expo/vector-icons/Octicons';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

// Create the context
export const SettingsContext = createContext({
    infinity: true,
    toggle_infinity: () => { },
    audio: true,
    toggle_audio: () => { },
    virtual: true,
    toggle_virtual: () => { },
})

// Create a provider component
export function SettingsProvider({ children }: { children: ReactNode }) {
    const [infinity, set_infinity] = useState(true);
    const [audio, set_audio] = useState(true);
    const [virtual, set_virtual] = useState(true);

    return (
        <SettingsContext.Provider value={{
            infinity: infinity,
            toggle_infinity: () => set_infinity(!infinity),
            audio: audio,
            toggle_audio: () => set_audio(!audio),
            virtual: virtual,
            toggle_virtual: () => set_virtual(!virtual)
        }}>
            {children}
        </SettingsContext.Provider>
    );
}

function Settings() {
    const settings = useContext(SettingsContext)
    return (
        <View style={styles.settings}>
            <Pressable style={styles.setting} onPress={settings.toggle_infinity}>
                <View style={{
                    ...styles.settingblock,
                    ...(settings.infinity ? styles.toggled : styles.untoggled)
                }}>
                    <MaterialCommunityIcons
                        name="infinity"
                        size={24}
                        color={settings.infinity ? "black" : "grey"} />
                </View>
                <View style={{
                    ...styles.settingblock,
                    ...(settings.infinity ? styles.untoggled : styles.toggled)
                }}>
                    <Octicons
                        name="dash"
                        size={24}
                        color={settings.infinity ? "grey" : "black"} />
                </View>
            </Pressable>
            <Pressable style={styles.setting} onPress={settings.toggle_audio}>
                <View style={{
                    ...styles.settingblock,
                    ...(settings.audio ? styles.toggled : styles.untoggled)
                }}>
                    <Entypo
                        name="sound"
                        size={19}
                        color={settings.audio ? "black" : "grey"} />
                </View>
                <View style={{
                    ...styles.settingblock,
                    ...(settings.audio ? styles.untoggled : styles.toggled)
                }}>
                    <Entypo
                        name="sound-mute"
                        size={19}
                        color={settings.audio ? "grey" : "black"} />
                </View>
            </Pressable>
            <Pressable style={styles.setting} onPress={settings.toggle_virtual}>
                <View style={{
                    ...styles.settingblock,
                    ...(settings.virtual ? styles.toggled : styles.untoggled)
                }}>
                    <MaterialIcons
                        name="computer"
                        size={24}
                        color={settings.virtual ? "black" : "grey"} />
                </View>
                <View style={{
                    ...styles.settingblock,
                    ...(settings.virtual ? styles.untoggled : styles.toggled)
                }} >
                    <FontAwesome6
                        name="hands"
                        size={18}
                        color={settings.virtual ? "grey" : "black"} />
                </View>
            </Pressable >
        </View >
    )
}

function Dock() {
    let modes = {
        infinity: true
    }

    return (
        <View style={styles.dock} >
            <View style={styles.exercises}>
                <Text style={styles.textcolor}>Timed</Text>
                <Text style={styles.textcolor}>Timed</Text>
            </View>
            <Settings />
        </View >
    )
}

export default function HomeScreen() {
    return (
        <View style={{
            backgroundColor: '#1f1f1f',
            height: '100%',
        }}>
            <SettingsProvider>
                <Dock />
                <AbacusContainer />
            </SettingsProvider>
        </View >
    )
}

const styles = StyleSheet.create({
    untoggled: {
        backgroundColor: '#1c1c1c',
    },
    toggled: {
        backgroundColor: '#7eb2e6',
    },
    dock: {
        top: 0,
        position: 'absolute',
        left: '25%',
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
    setting: {
        backgroundColor: 'blue',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    settingblock: {
        backgroundColor: '#484848',
        width: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textcolor: {
        color: 'white'
    }
});
