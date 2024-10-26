import React, { createContext, useContext, ReactNode, useState, useRef } from "react";
import {
    StyleSheet,
    Text,
    View,
    Pressable,
    Dimensions
} from "react-native";
import { TextInput } from "react-native-gesture-handler";

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Octicons from '@expo/vector-icons/Octicons';
import Entypo from '@expo/vector-icons/Entypo';

import { Exercise } from "@/models/exercises/Exercise";
import { ExerciseDropdown } from '@/components/ExerciseDropdown'
import { Simple } from "@/models/exercises/Simple";
import { Friends } from "@/models/exercises/Friends";
import { Relatives } from "@/models/exercises/Relatives";
import { Mixed } from "@/models/exercises/Mixed";
import { TwoDigits } from "@/models/exercises/TwoDigits";
import { ThreeDigits } from "@/models/exercises/ThreeDigits";

export const SettingsContext = createContext({
    infinity: true,
    toggle_infinity: () => { },
    audio: true,
    toggle_audio: () => { },
    exercise: new Simple(5) as Exercise
})

export function SettingsProvider({ children }: { children: ReactNode }) {
    const [infinity, set_infinity] = useState(true);
    const [audio, set_audio] = useState(true);
    const [exercise, set_exercise] = useState(
        new Simple(5) as Exercise
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

function Dock(
    { setExercise }: { setExercise: (exercise: Exercise) => void }
) {
    return (
        <View style={styles.dock} >
            <View style={styles.exercises}>
               <ExerciseDropdown setExercise={setExercise}/>
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

function ExerciseSection (
    {
        exercise,
        nextExercise
    }: { exercise: Exercise, nextExercise: (current: Exercise) => void }
) {
    const [answer, setAnswer] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    const ds = exercise.operations.map((operation, index) => 
        <Text key={index} style={styles.text}>
            {operation.kind == 'add' ? '+' : '-'} {operation.value}
        </Text>
    )

    const handleSubmit = () => {
        if ((!answer || answer.trim() === "")) {
            alert("Please enter a valid answer.")
        }
        if (parseInt(answer) == exercise.total) {
            alert("Yay, you are correct :)")
            nextExercise(exercise)
        } else {
            alert("Try again")
        }
        console.log(`Submitted answer: ${answer}`)
        setAnswer("")
        setIsSubmitting(false)
    }

    const inputRef = useRef(null)

    return ( // @ts-ignore
        <View style={{
            width: '10%',
            margin: 'auto',
            marginTop: '200px'
        }}>
            {
                ds
            }
            <TextInput 
                ref={inputRef}
                onFocus={() => inputRef.current.focus()}        
                style={{
                    height: 40,
                    borderColor: 'gray',
                    borderWidth: 1,
                    fontSize: 2.5 * vw,
                    fontFamily: 'courier',
                    textAlign: 'center',
                    marginTop: vw
                }}
                onChangeText={text => { 
                    console.log(text)
                    setAnswer(text)}
                }
                onSubmitEditing={handleSubmit}
                value={`${answer}`}
            />
        </View>
    )
}

function ExerciseContainer() {
    const settings = useContext(SettingsContext)
    const [exercise, setExercise] = useState(settings.exercise)

    function nextExercise(current: Exercise) {
        if (current instanceof Simple)
            setExercise(new Simple(5))
        else if (current instanceof Friends)
            setExercise(new Friends(5))
        else if (current instanceof Relatives) 
            setExercise(new Relatives(5))
        else if (current instanceof Mixed)
            setExercise(new Mixed(5))
        else if (current instanceof TwoDigits)
            setExercise(new TwoDigits(5))
        else if (current instanceof ThreeDigits)
            setExercise(new ThreeDigits(5))
    }

    return (
        <View style={{
            justifyContent: 'center'
        }}>
            <Dock setExercise={setExercise}/>
            <ExerciseSection exercise={exercise} nextExercise={nextExercise}/>
        </View>
    )
}

export default function HomeScreen() {
    return (
        <View style={{
            backgroundColor: 'white',
            height: '100%'
        }}>
            <SettingsProvider>
                <ExerciseContainer />
            </SettingsProvider>

        </View >
    )
}

const screenWidth = Dimensions.get('window').width;
const vw = screenWidth / 100;

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
    text: {
        color: 'black',
        fontSize: 2.5 * vw,
        fontFamily: 'courier',
        textAlign: 'center'
    }
});
