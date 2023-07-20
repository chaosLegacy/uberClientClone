import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import styles from './styles';
import { GooglePlaceData } from 'react-native-google-places-autocomplete';
import PlacesAutocomplete from '~/components/molecules/PlacesAutocomplete';
import { useNavigation } from '@react-navigation/native';
import Container from '~/components/atoms/Container';
import { OrderScreenNavigationProp } from '~/types';

const DestinationScreen = () => {
  const [startPoint, setStartPoint] = useState<GooglePlaceData>();
  const [endPoint, setEndPoint] = useState<GooglePlaceData>();
  const navigation = useNavigation<OrderScreenNavigationProp>();

  useEffect(() => {
    if (startPoint && endPoint) {
      console.log('start point: ' + startPoint);
      console.log('end point: ' + endPoint);
      navigation.navigate('Order', {
        startPoint,
        endPoint,
      });
    }
  }, [startPoint, endPoint, navigation]);
  return (
    <Container>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <PlacesAutocomplete placeholder={'Where to?'} onPress={setEndPoint} />
        </View>
        <View style={[styles.inputContainer, { top: 0 }]}>
          <PlacesAutocomplete placeholder={'From'} onPress={setStartPoint} />
        </View>
        <View style={styles.circle} />
        <View style={styles.line} />
        <View style={styles.square} />
      </View>
    </Container>
  );
};

export default DestinationScreen;
