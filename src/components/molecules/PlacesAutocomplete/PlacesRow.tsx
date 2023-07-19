import { Text, View } from 'react-native';
import React from 'react';
//import { GooglePlaceData, GooglePlaceDetail } from 'react-native-google-places-autocomplete';
import styles from './styles';
import Entypo from 'react-native-vector-icons/Entypo';

type PlaceRowProps = {
  data: any;
};
const PlacesRow = ({ data }: PlaceRowProps) => {
  const displayIconByType = (type: string) => {
    switch (type) {
      case 'Home':
        return (
          <View style={[styles.iconContainer, { backgroundColor: '#2b80ff' }]}>
            <Entypo name="home" size={20} color="#fff" />
          </View>
        );
      case 'Work':
        return (
          <View style={[styles.iconContainer, { backgroundColor: '#2b80ff' }]}>
            <Entypo name="briefcase" size={20} color="#fff" />
          </View>
        );
      default:
        return (
          <View style={styles.iconContainer}>
            <Entypo name="location-pin" size={20} color="#fff" />
          </View>
        );
    }
  };
  return (
    <View style={styles.row}>
      {displayIconByType(data.description)}
      <Text style={styles.locationText}>
        {data.description || data.vicinity}
      </Text>
    </View>
  );
};

export default PlacesRow;
