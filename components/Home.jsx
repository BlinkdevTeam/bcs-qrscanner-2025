import React, { useRef, useEffect } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
} from 'react-native';

export default function Home({ navigation }) {
  const scale = useRef(new Animated.Value(1)).current; // start at normal size

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.1, // zoom in
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1, // zoom out
          duration: 400,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();

    // optional cleanup
    return () => pulse.stop();
  }, [scale]);

  const handlePress = () => {
    navigation.navigate('Scanner');
  };

  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>TAP TO SCAN</Text>
        <Text style={styles.subtitle}>time-in will be</Text>
        <Text style={styles.subtitle}>recorded automatically</Text>
      </View>

      {/* 👇 Animated image (not regular Image) */}
      <Animated.Image
        source={require('../assets/border.png')}
        style={[
          styles.border,
          {
            transform: [{ scale }],
          },
        ]}
        resizeMode="contain"
      />

      <Image
        source={require('../assets/tapToscan.png')}
        style={styles.image}
        resizeMode="contain"
      />

      <Image
        source={require('../assets/qrbg.png')}
        style={styles.qrbg}
        resizeMode="contain"
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#A30A24',
  },
  image: {
    width: 500,
    height: 500,
    position: "relative",
    zIndex: 9
  },

  qrbg:{
    height: 1000,
    width: 500,
    position: "absolute",
    zIndex: 8
  },

  border: {
    width: 280,
    height: 280,
    position: 'absolute',
    zIndex: 99,
    top: 300,
  },

  textContainer: {
    position: 'absolute',
    zIndex: 99,
    top: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '800',
    paddingBottom: 20,
  },
  subtitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '200',
  },
});
