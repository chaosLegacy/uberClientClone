import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import type { PropsWithChildren } from 'react';
import { ImageSourcePropType } from 'react-native';
import { GooglePlaceDetail } from 'react-native-google-places-autocomplete';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

type CarCommune = {
  id: string;
  type: string;
  uri: ImageSourcePropType;
};

interface CarType extends CarCommune {
  price: number;
  duration: number;
}

interface Car extends CarCommune {
  latitude: number;
  longitude: number;
  heading: number;
}

type RootStackParamList = {
  Home: undefined;
  Order: { startPoint: GooglePlaceDetail; endPoint: GooglePlaceDetail };
  Destination: { sort: 'latest' | 'top' } | undefined;
  Trips: undefined;
  Help: undefined;
  Wallet: undefined;
  Settings: undefined;
};

type OrderScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Order'
>;
type OrderScreenRouteType = RouteProp<RootStackParamList, 'Order'>;
export type {
  SectionProps,
  CarType,
  Car,
  RootStackParamList,
  OrderScreenNavigationProp,
  OrderScreenRouteType,
};
