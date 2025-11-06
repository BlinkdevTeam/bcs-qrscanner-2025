import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';


export default function Header({screen}) {
  const deviceWidth = Dimensions.get("window").width

  return  (
    <View style={styles.container}>
       {/* <Image source={logo} style={styles.imageStyle}/> */}
       <Text>This device width is {deviceWidth}</Text>
    </View>
  ) 
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    imageStyle: { 
        height: 80, 
        resizeMode: 'contain'
    }
});
