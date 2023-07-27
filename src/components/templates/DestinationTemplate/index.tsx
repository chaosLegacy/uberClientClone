/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import styles from './styles';
import { GooglePlaceDetail } from 'react-native-google-places-autocomplete';
import PlacesAutocomplete from '~/components/molecules/PlacesAutocomplete';
import { useNavigation } from '@react-navigation/native';
import Container from '~/components/atoms/Container';
import { OrderScreenNavigationProp } from '~/types';

const DestinationTemplate = () => {
  const [startPoint, setStartPoint] = useState<GooglePlaceDetail | null>();
  const [endPoint, setEndPoint] = useState<GooglePlaceDetail | null>();
  const navigation = useNavigation<OrderScreenNavigationProp>();

  useEffect(() => {
    if (startPoint && endPoint) {
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

export default DestinationTemplate;
