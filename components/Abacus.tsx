import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from "react-native"
import { useState } from "react"

import { Abacus, type column, correctOn, correctOff } from "@/models/Abacus"
import React from "react"

function Answer({ n }: {
    n: number
}) {
    return (<Text style={styles.sum}>{n}</Text>)
}

function BeadUI({ heavenly, value, onClick }: {
    heavenly: boolean,
    value: number,
    onClick: () => void
}) {
    let style: object[] = [styles.bead]
    if (value == 1)
        if (heavenly)
            style.push(styles.heavenlyTurnedOn)
        else
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

function AbacusUI({ abacus, beadOnClick }: {
    abacus: Abacus,
    beadOnClick: (outer: number, inner: number, bead: number) => void
}) {
    let nondecimals = abacus.columns[0].map((column, i) =>
        <ColumnUI state={column} base={i+1} key={i} outer={0} inner={i} beadOnClick={beadOnClick} />
    )
    let decimals = abacus.columns[1].map((column, i) =>
        <ColumnUI state={column} base={-i} key={i} outer={1} inner={i} beadOnClick={beadOnClick} />
    )

    return (
        <View style={styles.abacus}>
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

function Clear() {
    return (
        <View style={styles.clear} />
    )
}

export function AbacusContainer() {
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

    function updateAbacus(outer: number, inner: number, bead: number) {
        let reconstruction = abacus.clone()
        if (reconstruction.columns[outer][inner][bead] == 0) {
            reconstruction.columns[outer][inner][bead] = 1
            reconstruction = correctOn(reconstruction)
        } else if (reconstruction.columns[outer][inner][bead] == 1) {
            reconstruction.columns[outer][inner][bead] = 0
            reconstruction = correctOff(reconstruction)
        }

        setAbacus(reconstruction)
    }

    return (
        <View style={styles.container}>
            <Answer n={abacus.evaluate()} />
            <TouchableOpacity onPress={() => {
                setAbacus(new Abacus([
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
                ]))
            }}>
                <Clear />
            </TouchableOpacity>
            <AbacusUI abacus={abacus} beadOnClick={updateAbacus} />
        </View >
    )
}

const screenWidth = Dimensions.get('window').width;
const vw = screenWidth / 100;

const styles = StyleSheet.create({
    container: {
        margin: 'auto',
        marginBottom: 170,
    },
    sum: {
        textAlign: 'center',
        fontSize: 48,
        color: 'black'
    },
    clear: {
        backgroundColor: '#696b6a',
        borderRadius: 10,
        width: 40,
        height: 40,
        left: '10%',
        marginBottom: 5
    },
    abacus: {
        flexDirection: 'row',
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        borderWidth: 20,
        borderColor: "#696b6a",
        borderRadius: 15,
        flex: 1,
    },
    bar: {
        position: 'absolute',
        width: '100%',
        height: '5%',
        backgroundColor: '#696b6a',
        top: 6.5 * vw
    },
    spoke: {
        position: 'absolute',
        width: 0.5 * vw,
        height: '100%',
        backgroundColor: '#696b6a',
    },
    indicator: {
        position: 'absolute',
        color: 'lightgray',
        bottom: 15.45 * vw,
        fontWeight: 'bold',
        fontSize: vw
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
        marginLeft: 0.5 * vw,
        marginRight: 0.5 * vw
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
    bead: {
        backgroundColor: "#484848",
        width: 5 * vw,
        height: 3 * vw,
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 30
    },
    heavenly: {
        marginBottom: 8.2 * vw
    },
    turnedon: {
        backgroundColor: '#7eb2e6',
        bottom: 3.6 * vw
    },
    heavenlyTurnedOn: {
        backgroundColor: '#7eb2e6',
        top: 3.5 * vw
    }
});
