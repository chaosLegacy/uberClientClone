import React from 'react';
import { Text, View, Pressable } from 'react-native';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import Colors from '~/constants/Colors';

const Search = () => {
  const navigation = useNavigation();

  const goToSearch = () => {
    navigation.navigate('Destination' as never);
  };

  return (
    <View>
      <Pressable onPress={goToSearch} style={styles.inputBox}>
        <Text style={styles.inputText}>Where to?</Text>
        <View style={styles.timeContainer}>
          <AntDesign name="clockcircle" size={16} color={Colors.darkGray} />
          <Text>Now</Text>
          <MaterialIcons name="keyboard-arrow-down" size={16} />
        </View>
      </Pressable>
      {/* Previous destination */}
      <View style={styles.row}>
        <View style={styles.iconContainer}>
          <AntDesign name="clockcircle" size={20} color={Colors.white} />
        </View>
        <Text style={styles.destinationText}>Spin NightClub</Text>
      </View>
      {/* Home destination */}
      <View style={styles.row}>
        <View style={[styles.iconContainer, { backgroundColor: Colors.blue }]}>
          <Entypo name="home" size={20} color={Colors.white} />
        </View>
        <Text style={styles.destinationText}>Spin NightClub</Text>
      </View>
    </View>
  );
};

export default Search;
