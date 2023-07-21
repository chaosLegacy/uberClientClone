import React from 'react';
import { Pressable, Text, View, Image } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import styles from './styles';
import Colors from '~/constants/Colors';

const CustomDrawer = (props: DrawerContentComponentProps) => {
  const makeMoney = () => {
    console.warn('Make money driving...');
  };
  const doMore = () => {
    console.warn('Do more with your account...');
  };
  const readMessages = () => {
    console.warn('Messages...');
  };
  return (
    <DrawerContentScrollView>
      <View style={styles.container}>
        {/* User Row */}
        <View style={styles.profileContainer}>
          <Image
            style={styles.profilePicture}
            source={require('assets/images/default.jpeg')}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Youssef Barnoukh</Text>
            <View style={styles.profileRating}>
              <Text style={styles.rating}>5.00</Text>
              <Entypo name="star" size={12} color={Colors.white} />
            </View>
          </View>
        </View>
        {/* Messages Row */}
        <View style={styles.separator}>
          <Pressable onPress={readMessages}>
            <View style={styles.buttonContainer}>
              <View style={styles.rowButton}>
                <Text style={styles.link}>Messages</Text>
                <View style={styles.bubble} />
              </View>
              <Entypo
                name="chevron-thin-right"
                size={15}
                color={Colors.lightGray}
              />
            </View>
          </Pressable>
        </View>
        {/* Do More */}
        <Pressable onPress={doMore} disabled>
          <Text style={[styles.link, styles.disabled]}>
            Do more with your account
          </Text>
        </Pressable>
        {/* Make money */}
        <Pressable onPress={makeMoney}>
          <Text style={styles.link}>Make money driving</Text>
        </Pressable>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;
