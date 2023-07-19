import React, { useEffect, useState } from 'react';
import { View, SafeAreaView } from 'react-native';
import styles from './styles';
import { GooglePlaceData } from 'react-native-google-places-autocomplete';
import PlacesAutocomplete from '~/components/molecules/PlacesAutocomplete';

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
        <View style={styles.relative}>
          <PlacesAutocomplete
            placeholder={'From'}
            onPress={setStartPoint}
            textInputStyle={styles.textInput}
          />
          <View style={styles.circle} />
        </View>

        <View style={styles.line} />

        <View style={styles.relative}>
          <PlacesAutocomplete
            placeholder={'Where to?'}
            onPress={setEndPoint}
            textInputStyle={styles.textInput}
          />
          <View style={styles.square} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DestinationScreen;
