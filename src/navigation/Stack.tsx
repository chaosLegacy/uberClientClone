import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '~/screens/HomeScreen';
import DestinationScreen from '~/screens/DestinationScreen';
import OrderScreen from '~/screens/OrderScreen';
import OrderDetailScreen from '~/screens/OrderDetailScreen';
import { RootStackParamList } from '~/types';

const Stack = createStackNavigator<RootStackParamList>();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Destination" component={DestinationScreen} />
      <Stack.Screen name="Order" component={OrderScreen} />
      <Stack.Screen name="OrderDetail" component={OrderDetailScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
