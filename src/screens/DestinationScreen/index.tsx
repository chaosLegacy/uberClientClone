import React, { useEffect, useState } from 'react';
import { View, SafeAreaView } from 'react-native';
import styles from './styles';
import {
  GooglePlacesAutocomplete,
  GooglePlaceData,
} from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_API_KEY } from '@env';

const DestinationScreen = () => {
  const [startPoint, setStartPoint] = useState<GooglePlaceData>();
  const [endPoint, setEndPoint] = useState<GooglePlaceData>();

  useEffect(() => {
    if (startPoint && endPoint) {
      console.log('start point: ' + startPoint);
      console.log('end point: ' + endPoint);
      console.warn('hola');
    }
  }, [startPoint, endPoint]);
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <GooglePlacesAutocomplete
          placeholder="From"
          onPress={(data, details = null) => {
            setStartPoint(data);
            console.log(data, details);
          }}
          fetchDetails
          styles={{
            textInput: styles.textInput,
          }}
          query={{
            key: GOOGLE_MAPS_API_KEY,
            language: 'en',
          }}
        />

        <GooglePlacesAutocomplete
          placeholder="Where to?"
          onPress={(data, details = null) => {
            setEndPoint(data);
            console.log(data, details);
          }}
          fetchDetails
          styles={{
            textInput: styles.textInput,
          }}
          query={{
            key: GOOGLE_MAPS_API_KEY,
            language: 'en',
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default DestinationScreen;
