import React, { createContext, useContext, ReactNode, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Pressable
} from "react-native";

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Octicons from '@expo/vector-icons/Octicons';
import Entypo from '@expo/vector-icons/Entypo';
import { ExerciseDropdown } from '@/components/ExerciseDropdown'
import { Exercise, Simple } from "@/models/exercises/Exercise";
import { TextInput } from "react-native-gesture-handler";

export const SettingsContext = createContext({
    infinity: true,
    toggle_infinity: () => { },
    audio: true,
    toggle_audio: () => { },
    exercise: new Simple(10) as Exercise
})

export function SettingsProvider({ children }: { children: ReactNode }) {
    const [infinity, set_infinity] = useState(true);
    const [audio, set_audio] = useState(true);
    const [exercise, set_exercise] = useState(
        new Simple(10) as Exercise
    )

    return (
        <SettingsContext.Provider value={{
            infinity: infinity,
            toggle_infinity: () => set_infinity(!infinity),
            audio: audio,
            toggle_audio: () => set_audio(!audio),
            exercise: exercise
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
        </View >
    )
}

function Dock() {
    return (
        <View style={styles.dock} >
            <View style={styles.exercises}>
               <ExerciseDropdown />
            </View>
            <Settings />
        </View >
    )
}

class Series {
    public exercises: Exercise[]
    constructor (
        public files: number,
        public questions: number
    ) { 
        for (let i = 0; i < files; i++) {
            this.exercises.push(new Simple(questions))
        }
    }
}

function ExerciseSection () {
    const [answer, setAnswer] = useState(0)
    const settings = useContext(SettingsContext)
    const exercise = settings.exercise

    const ds = exercise.operations.map((operation, index) => 
        <Text key={index} style={styles.textcolor}>
            {operation.value} {operation.kind == 'add' ? '+' : '-'}
        </Text>
    )
    return ( // @ts-ignore
        <View style={{
            borderWidth: '5px',
            borderColor: 'grey',
            width: '50%',
            margin: 'auto',
        }}>
            EXERCISE:
            {
                ds
            }
            input box next:
            <TextInput 
                style={{
                    height: 40,
                    borderColor: 'gray',
                    borderWidth: 1
                }}
                onChangeText={text => setAnswer(text => isNaN(text) ? 0 : text)}
                value={`${answer}`}
            />
        </View>
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
                <ExerciseSection />
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
