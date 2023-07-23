import { Text, View, Image, Pressable } from 'react-native';
import React from 'react';
import styles from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CarType } from '~/types';
import Colors from '~/constants/Colors';
import { getImageByCarType } from '~/utils';

interface IDriverTypeProps {
  carType: CarType;
  onPress: () => void;
  isSelected: boolean;
}

const DriverType = ({ carType, onPress, isSelected }: IDriverTypeProps) => {
  const { type, price } = carType;

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        isSelected
          ? {
              backgroundColor: Colors.lightGray,
            }
          : { backgroundColor: Colors.white },
      ]}>
      {/* Image */}
      <Image style={styles.image} source={getImageByCarType(type)} />
      {/* Middle */}
      <View style={styles.middleContainer}>
        <Text style={styles.type}>
          {type} <Ionicons name="person" size={12} />3
        </Text>
        <Text style={styles.time}>8:30PM drop off</Text>
      </View>
      {/* Right */}
      <View style={styles.rightContainer}>
        <Ionicons name="pricetag" size={18} color={Colors.lightGreen} />
        <Text style={styles.price}>Est. ${price}</Text>
      </View>
    </Pressable>
  );
};

export default DriverType;
