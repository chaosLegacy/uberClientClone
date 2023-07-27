import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { RootStackParamList } from '~/types';
import StackNavigator from './Stack';
import CustomDrawer from '~/components/molecules/Navigation/Drawer';

const Drawer = createDrawerNavigator<RootStackParamList>();

const RouteNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={CustomDrawer}
        screenOptions={{
          headerShown: false,
        }}>
        <Drawer.Screen name="Home" component={StackNavigator} />
        <Drawer.Screen
          name="Trips"
          component={StackNavigator}
          options={{ drawerLabel: 'Your trips' }}
        />
        <Drawer.Screen name="Help" component={StackNavigator} />
        <Drawer.Screen name="Wallet" component={StackNavigator} />
        <Drawer.Screen name="Settings" component={StackNavigator} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default RouteNavigator;
