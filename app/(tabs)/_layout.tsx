import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                headerShown: false,
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Playground',
                    tabBarIcon: ({ color, focused }) => (
                        <MaterialCommunityIcons name="abacus" size={24} color="black" />
                    ),
                }}
            />
            <Tabs.Screen
                name="exercises"
                options={{
                    title: 'Exercises',
                    tabBarIcon: ({ color, focused }) => (
                        <AntDesign name="staro" size={24} color="black" />
                    ),
                }}
            />
            <Tabs.Screen
                name="third"
                options={{
                    title: "Pterodactyl",
                    tabBarIcon: ({ color, focused }) => (
                        <AntDesign name="meh" size={24} color="black" />
                    ),
                }}
            />
        </Tabs>
    );
}
