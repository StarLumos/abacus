import { Pressable, View } from "react-native"

import React, { useContext } from "react"
import { AbacusContainer } from "@/components/Abacus"
import { ThemeContext, ThemeProvider } from '@/app/themes';

// function ThemeToggle() {
//     // make an element I can click on that toggles dark mode
//     return (
//         <Pressable onPress={() => useContext(ThemeContext).toggleTheme()}>
//             {/* Add your desired UI for the toggle button */}
//             PRESS ME
//         </Pressable>
//     );
// }

function Wrapped() {
    const colors = useContext(ThemeContext)

    return (
        <>
            {/* <ToggleTheme/> */}
            <View style={{
                backgroundColor: colors.background,
                height: '100%'
            }}>
                < AbacusContainer />
            </View>
        </>
    )
}

export default function HomeScreen() {
    return (
        <ThemeProvider>
            <Wrapped/>
        </ThemeProvider>
    )
}
