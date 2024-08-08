import { StyleSheet, View, Text, TouchableOpacity } from "react-native"
import { useState } from "react"

function BeadUI({ heavenly }: {
    heavenly: boolean,
}) {
    let [activated, setActivated] = useState(false)
    let style: object[] = [styles.bead]

    if (heavenly)
        style.push(styles.heavenly)
    return (
        <TouchableOpacity onPress={() => setActivated(!activated)}>
            <View style={style}></View>
        </TouchableOpacity>
    )

}

export function AbacusUI({ leftColumns, rightColumns }: {
    leftColumns: number,
    rightColumns: number
}) {
    let columns = Array.from({ length: leftColumns }, (_, index) => index + 1).map((col, i) =>
        <View style={styles.column} key={i}>
            <View style={styles.spoke} />
            <View style={styles.heaven}>
                <BeadUI heavenly={true} />
            </View>
            <View style={styles.earth}>{
                Array.from({ length: 4 }, (_, index) => index + 1).map((bead, j) =>
                    <BeadUI heavenly={false} key={j} />
                )
            }</View>
        </View>
    )

    function updateColumns() {
        for (let column of columns)
    }
    return (
        <View style={styles.overall}>
            <View style={styles.bar} />{
                columns
            }</View >
    );
}

const styles = StyleSheet.create({
    overall: {
        margin: 'auto',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 5,
        borderColor: "black",
    },
    bar: {
        position: 'absolute',
        width: '100%',
        height: 5,
        backgroundColor: 'black',
        top: '25%',
    },
    column: {
        flexDirection: 'column',
        alignItems: 'center',
        marginLeft: 5,
        marginRight: 5
    },
    heaven: {
        alignItems: 'center',
        flexDirection: 'column',
        borderColor: 'black',
    },
    earth: {
        alignItems: 'center',
        flexDirection: 'column',
    },
    spoke: {
        position: 'absolute',
        width: 5,
        height: '100%',
        backgroundColor: 'black',
    },
    bead: {
        backgroundColor: "silver",
        width: 45,
        height: 30,
        borderWidth: 1,
        borderColor: "grey"
    },
    heavenly: {
        marginBottom: 50,
    }
});
