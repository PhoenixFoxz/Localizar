import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

export default function LocationScreen() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    getLocationAsync();
  }, []);

  const getLocationAsync = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        throw new Error("Permissão de localização não concedida");
      }

      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    } catch (error) {
      console.error("Erro ao obter localização:", error);
      setErrorMsg("Erro ao obter localização");
    }
  };

  const handleUpdateLocation = () => {
    getLocationAsync();
  };

  return (
    <View style={styles.container}>
      <Button title="Atualizar Localização" onPress={handleUpdateLocation} />
      {location && (
        <MapView
          style={styles.map}
          initialRegion={{
            ...location.coords,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={location.coords}
            title="Minha Localização"
            description="Você está aqui"
          />
        </MapView>
      )}
      {errorMsg && <Text style={styles.errorMsg}>{errorMsg}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
  },
  map: {
    width: "100%",
    height: "100%",
    marginTop: 20,
  },
  errorMsg: {
    color: "red",
    marginTop: 20,
  },
});
