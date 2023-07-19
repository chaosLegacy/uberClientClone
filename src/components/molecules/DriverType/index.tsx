import { Text, View, Image } from 'react-native';
import React from 'react';
import styles from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CarType } from '~/types';

interface IProps {
  carType: CarType;
}

const DriverType = ({ carType }: IProps) => {
  const { type, price, uri } = carType;

  return (
    <View style={styles.container}>
      {/* Image */}
      <Image style={styles.image} source={uri} />
      {/* Middle */}
      <View style={styles.middleContainer}>
        <Text style={styles.type}>
          {type} <Ionicons name="person" size={12} />3
        </Text>
        <Text style={styles.time}>8:30PM drop off</Text>
      </View>
      {/* Right */}
      <View style={styles.rightContainer}>
        <Ionicons name="pricetag" size={18} color={'#42d742'} />
        <Text style={styles.price}>Est. ${price}</Text>
      </View>
    </View>
  );
};

export default DriverType;
