import { StyleSheet, View, Text, TouchableOpacity } from "react-native"
import { useState } from "react"

import { Abacus, type column } from "@/models/Abacus"

function BeadUI({ heavenly, value, onClick }: {
    heavenly: boolean,
    value: number,
    onClick: () => void
}) {
    let style: object[] = [styles.bead]
    if (value == 1)
        style.push(styles.turnedon)
    if (heavenly)
        style.push(styles.heavenly)
    return (
        <TouchableOpacity onPress={() => {
            onClick()
        }}>
            <View style={style}></View>
        </TouchableOpacity>
    )
}

function ColumnUI({ state, base, outer, inner, beadOnClick }: {
    state: column,
    base: number,
    beadOnClick: (outer: number, inner: number, bead: number) => void,
    outer: number,
    inner: number
}) {
    return (
        <View style={styles.column}>
            <View style={styles.spoke} />
            <View style={styles.heaven}>
                <BeadUI heavenly={true} value={state[0]} onClick={() =>
                    beadOnClick(outer, inner, 0)
                } />
            </View>
            <View style={styles.earth}>
                {
                    Array.from({ length: 4 }, (_, index) => index + 1).map((bead, i) =>
                        <BeadUI heavenly={false} value={state[i + 1]} key={i} onClick={() =>
                            beadOnClick(outer, inner, i + 1)
                        } />
                    )
                }
                <Text style={styles.indicator}>{base}</Text>
            </View>
        </View>
    )
}

export function AbacusUI({ leftColumns, rightColumns }: {
    leftColumns: number,
    rightColumns: number
}) {
    let [abacus, setAbacus] = useState(new Abacus(
        [
            [
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0]
            ],
            [
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0]
            ]
        ]
    ))

    function beadOnClick(outer: number, inner: number, bead: number) {
        let reconstruction = abacus.clone()
        if (reconstruction.columns[outer][inner][bead] == 0)
            reconstruction.columns[outer][inner][bead] = 1
        else if (reconstruction.columns[outer][inner][bead] == 1)
            reconstruction.columns[outer][inner][bead] = 0
        setAbacus(reconstruction)
    }

    let nondecimals = abacus.columns[0].map((column, i) =>
        <ColumnUI state={column} base={i} key={i} outer={0} inner={i} beadOnClick={beadOnClick} />
    )
    let decimals = abacus.columns[1].map((column, i) =>
        <ColumnUI state={column} base={-(i + 1)} key={i} outer={1} inner={i} beadOnClick={beadOnClick} />
    )

    return (
        <View style={styles.overall}>
            <View style={styles.bar} />
            <View style={styles.left}>
                {nondecimals}
            </View>
            <View style={styles.right}>
                {decimals}
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    overall: {
        margin: 'auto',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 20,
        borderColor: "black",
        // maxHeight: 500
    },
    bar: {
        position: 'absolute',
        width: '100%',
        height: 20,
        backgroundColor: 'black',
        top: '27%'
    },
    indicator: {
        position: 'absolute',
        color: 'white',
        bottom: '119.5%',
        fontWeight: 'bold'
    },
    left: {
        flexDirection: 'row-reverse'
    },
    right: {
        flexDirection: 'row'
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
        backgroundColor: "darkred",
        width: 90,
        height: 60,
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 30
    },
    heavenly: {
        marginBottom: 120
    },
    turnedon: {
        backgroundColor: 'blue',
        bottom: 40
    }
});
