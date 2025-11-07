import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Image, TouchableOpacity } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import axios from 'axios';

export default function Scanner() {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [scannedData, setScannedData] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission]);

  if (!permission) {
    return <View><Text>Requesting camera permission...</Text></View>;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text>Camera access is required to scan QR codes.</Text>
        <Button title="Grant permission" onPress={requestPermission} />
      </View>
    );
  }

  const handleBarcodeScanned = async ({ data }) => {
    if (scannedData) return; // prevent multiple triggers
    setScannedData(data);

    try {
      const response = await axios.post(
        // 'https://ugnaypalay.philrice.gov.ph:441/csd/37th/api/get-participant-data',
        'https://ugnaypalay.philrice.gov.ph:441/csd/37th/api/check-participant',
        { qrcode: data },
        {
          headers: {
            'x-api-key': 'yDNpoaxodzxNGJPaynIaEb72sGF2GfCX1KmVS',
            'accept': 'application/json',
            'content-type': 'application/json',
          },
        }
      );

      console.log('✅ Server response ================= >>:', response.data.success);

      setUser(response.data);

      // Optionally allow rescanning after a short delay:
      setTimeout(() => setScannedData(null), 3000);
    } catch (error) {

      if (error.response) {
        console.log('❌ Error status:', error.response.status);
        console.log('❌ Error data:', error.response.data);
        setUser(error.response.data);
      } else {
        console.log('❌ Network or config error:', error.message);
        setUser(error.response.data);
      }

      // also reset scan lock on failure
      setTimeout(() => setScannedData(null), 3000);
    }
  };


  return (
    <View style={styles.container}>
      {!user ? (
        <CameraView
          style={styles.camera}
          facing={facing}
          barcodeScannerSettings={{
            barcodeTypes: ['qr'],
          }}
          onBarcodeScanned={handleBarcodeScanned}
        />
      ) : user && (
          user.success === false ? ( 
            <View style={styles.resultContainer}>
              <Text style={styles.dataText}>{user.message}⚠️</Text>
              <View style={styles.buttonContainer}>
                <Image
                  source={require('../assets/scannerIcon.png')}
                  style={styles.scannerIcon}
                  resizeMode="contain"
                />
                <TouchableOpacity style={styles.button} onPress={() => setUser(null)}>
                  <Text style={styles.buttonText}>Scan Again</Text>
                </TouchableOpacity>
              </View>
              <Image
                source={require('../assets/qrbg.png')}
                style={styles.qrbg}
                resizeMode="contain"
              />
            </View>
          ) : (
            <View style={styles.resultContainer}>
              <Text style={styles.resultText}>Scanned Value:</Text>
              <Text style={styles.dataText}>🎉{user.data.firstName + " " + user.data.lastName}🎉</Text>
              <View style={styles.buttonContainer}>
                <Image
                  source={require('../assets/scannerIcon.png')}
                  style={styles.scannerIcon}
                  resizeMode="contain"
                />
                <TouchableOpacity style={styles.button} onPress={() => setUser(null)}>
                  <Text style={styles.buttonText}>Scan Again</Text>
                </TouchableOpacity>
              </View>
              <Image
                source={require('../assets/qrbg.png')}
                style={styles.qrbg}
                resizeMode="contain"
              />
            </View>
          )
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    backgroundColor: '#000' },
  camera: { 
    flex: 1 
  },
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#A30A24',
  },
  resultText: { 
    fontSize: 20, 
    marginBottom: 10, 
    color: "#ffffff",
    position: 'relative', 
    zIndex: 9 
  },
  dataText: { 
    fontSize: 24, 
    color: '#333', 
    marginBottom: 20, 
    color: "#ffffff", 
    textAlign: 'center', 
    fontWeight: 'bold' ,
    position: 'relative', 
    zIndex: 9 
  },
  button: {
    color: "#ffffff"
  },
  buttonContainer: {
      flexDirection: 'row',      // icon + button side by side
      alignItems: 'center',      // vertically center
      justifyContent: 'center',  // horizontally center
      backgroundColor: '#B10B27',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 8,
      alignSelf: 'center', 
      position: 'relative', 
    zIndex: 9       // only take space it needs
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  scannerIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  qrbg:{
    height: 1000,
    width: 500,
    position: "absolute",
    zIndex: 8
  },
});
