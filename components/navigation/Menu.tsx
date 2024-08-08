import { View, Text, StyleSheet } from "react-native";

function Menu() {
    return (
        <View style={harry.navBar}>
            <Text style={harry.item}>Home</Text>
            <Text style={harry.item}>Playground</Text>
            <Text style={harry.item}>Practice problems</Text>
            <Text style={harry.item}>About</Text>
        </View>
    );
}

const harry = StyleSheet.create({
    navBar: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "#333",
        paddingVertical: 10,
    },
    item: {
        color: "white",
        fontSize: 16,
    },
});

export { Menu };
