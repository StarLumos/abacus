import { StyleProp, ViewStyle, View, StyleSheet } from "react-native";

interface UnitProps {
    style?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
}

export const Unit: React.FC<UnitProps> = ({ style, children }) => {
    const base = StyleSheet.create({
        container: {
            flex: 1
        },
    });

    return (
        <View style={[base.container, style]}>
            {children}
        </View>
    );
};
