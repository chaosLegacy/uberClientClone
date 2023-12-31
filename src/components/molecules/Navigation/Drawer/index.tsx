import React, { useEffect, useState } from 'react';
import { Pressable, Text, View, Image } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { Auth } from 'aws-amplify';

import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import styles from './styles';
import Colors from '~/constants/Colors';
import { _getUser } from '~/services/user';
import { User } from '~/API';

const CustomDrawer = (props: DrawerContentComponentProps) => {
  const [authUser, setAuthUser] = useState<User>();
  const getCurrentUser = async () => {
    const authenticatedUser = await _getUser({ currentUser: true });
    setAuthUser(authenticatedUser);
  };
  useEffect(() => {
    getCurrentUser();
  }, []);

  const makeMoney = () => {
    console.warn('Make money driving...');
  };
  const doMore = () => {
    console.warn('Do more with your account...');
  };
  const readMessages = () => {
    console.warn('Messages...');
  };
  const logout = () => {
    Auth.signOut({ global: true });
  };

  return (
    <DrawerContentScrollView>
      <View style={styles.container}>
        {/* User Row */}
        {authUser && (
          <View style={styles.profileContainer}>
            {authUser.avatar ? (
              <Image
                source={{ uri: authUser.avatar }}
                style={styles.profilePicture}
              />
            ) : (
              <Image
                source={require('assets/images/default.jpeg')}
                style={styles.profilePicture}
              />
            )}
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{authUser.name}</Text>
              <View style={styles.profileRating}>
                <Text style={styles.rating}>{authUser.rating}</Text>
                <Entypo name="star" size={12} color={Colors.white} />
              </View>
            </View>
          </View>
        )}
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
        {/* Logout */}
        <Pressable onPress={logout}>
          <Text style={styles.link}>Log out</Text>
        </Pressable>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;
