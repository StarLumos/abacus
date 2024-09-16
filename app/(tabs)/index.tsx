import {
    View
} from "react-native";

import React from "react";
import { AbacusContainer } from "@/components/Abacus"

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
