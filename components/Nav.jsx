import { StyleSheet, Text, View, Button, Pressable } from 'react-native';

export default function Nav({onPress}) {
    return (
        <View style={styles.container}>
            <Pressable style={styles.pressableStyle} onPress={onPress}>
                <Text style={{ fontSize: 12, color: '#ffffff', fontWeight: 'normal', paddingTop: 5}}>Home</Text>
            </Pressable>
            <Pressable style={styles.pressableStyle}>
                <Text style={{ fontSize: 12, color: '#ffffff', fontWeight: 'normal', paddingTop: 5}}>Time In</Text>
            </Pressable>
            <Pressable style={styles.pressableStyle}>
                <Text style={{ fontSize: 12, color: '#ffffff', fontWeight: 'normal', paddingTop: 5}}>Time Out</Text>
            </Pressable>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#399544',
        flexDirection: 'row',
        paddingBottom: 20,
        paddingTop: 20,
        paddingHorizontal: 40,
        justifyContent: "space-between",
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0, // ensures it stretches fully
        zIndex: 1000 // ensures it stays on top
    },
    buttonText: {
        fontSize: 11
    },
    pressableStyle: {
        textAlign: "center",  // Works for Text components
        alignItems: "center",
    }
});