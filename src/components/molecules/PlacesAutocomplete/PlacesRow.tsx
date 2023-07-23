import { Text, View } from 'react-native';
import React from 'react';
import { styles } from './styles';
import Entypo from 'react-native-vector-icons/Entypo';
import Colors from '~/constants/Colors';

type PlaceRowProps = {
  data: any;
};
const PlacesRow = ({ data }: PlaceRowProps) => {
  const displayIconByType = (type: string) => {
    switch (type) {
      case 'Home':
        return (
          <View
            style={[styles.iconContainer, { backgroundColor: Colors.blue }]}>
            <Entypo name="home" size={20} color={Colors.white} />
          </View>
        );
      case 'Work':
        return (
          <View
            style={[styles.iconContainer, { backgroundColor: Colors.blue }]}>
            <Entypo name="briefcase" size={20} color={Colors.white} />
          </View>
        );
      default:
        return (
          <View style={styles.iconContainer}>
            <Entypo name="location-pin" size={20} color={Colors.white} />
          </View>
        );
    }
  };
  return (
    <View style={styles.row}>
      {displayIconByType(data.description)}
      <Text>{data.description || data.vicinity}</Text>
    </View>
  );
};

export default PlacesRow;
