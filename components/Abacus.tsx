import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from "react-native"
import { useState } from "react"

import { Abacus, type column, correctOn, correctOff } from "@/models/Abacus"

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
        if (reconstruction.columns[outer][inner][bead] == 0) {
            reconstruction.columns[outer][inner][bead] = 1
            reconstruction = correctOn(reconstruction)
        } else if (reconstruction.columns[outer][inner][bead] == 1) {
            reconstruction.columns[outer][inner][bead] = 0
            reconstruction = correctOff(reconstruction)
        }

        setAbacus(reconstruction)
    }

    let nondecimals = abacus.columns[0].map((column, i) =>
        <ColumnUI state={column} base={i} key={i} outer={0} inner={i} beadOnClick={beadOnClick} />
    )
    let decimals = abacus.columns[1].map((column, i) =>
        <ColumnUI state={column} base={-(i + 1)} key={i} outer={1} inner={i} beadOnClick={beadOnClick} />
    )

    let sum = abacus.evaluate()

    return (
        <View style={styles.overall}>
            <Answer n={sum} />
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


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const vw = screenWidth / 100; // Calculate 1% of the screen width
// const vh = screenHeight / 100; // Calculate 1% of the screen height

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
    sum: {
        position: 'absolute',
        top: '-27%',
        left: '50%',
        // top: -275,
        // left: -100,
        fontSize: 48
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
    spoke: {
        position: 'absolute',
        width: 5,
        height: '100%',
        backgroundColor: 'black',
    },
    bead: {
        backgroundColor: "darkred",
        width: 6 * vw,
        height: 4 * vw,
        // width
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 30
    },
    heavenly: {
        marginBottom: 120
    },
    turnedon: {
        backgroundColor: 'blue',
        bottom: 47
    },
    heavenlyTurnedOn: {
        backgroundColor: 'blue',
        top: 53
    }
});
