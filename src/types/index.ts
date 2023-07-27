import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CognitoUser } from 'amazon-cognito-identity-js';
import type { PropsWithChildren } from 'react';
import { GooglePlaceDetail } from 'react-native-google-places-autocomplete';
import { LatLng } from 'react-native-maps';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

type CarCommune = {
  id: string;
  type: string;
  uri: string;
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

type MapDirectionProps = {
  coordinates?: LatLng[];
  distance: number;
  duration: number;
};

type UserAttributes = {
  sub: string;
  email: string;
  email_verified: string;
  name: string;
  updated_at: string;
  'custom:bytesQuota': string;
  'custom:bytesUsed': string;
};
/*
 * The following interface extends the CognitoUser type because it has issues
 * (see github.com/aws-amplify/amplify-js/issues/4927). Eventually (when you
 * no longer get an error accessing a CognitoUser's 'attribute' property) you
 * will be able to use the CognitoUser type instead of CognitoUserExt.
 */
interface CognitoUserExt extends CognitoUser {
  attributes: UserAttributes;
}

type RootStackParamList = {
  Home: undefined;
  Destination: { sort: 'latest' | 'top' } | undefined;
  Order: { startPoint: GooglePlaceDetail; endPoint: GooglePlaceDetail };
  WaitingDriver: { orderId: string };
  OrderDetail: { orderId: string; carId: string };
  Trips: undefined;
  Help: undefined;
  Wallet: undefined;
  Settings: undefined;
};
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
type OrderScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Order'
>;
type WaitingDriverScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'WaitingDriver'
>;
type OrderDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'OrderDetail'
>;
type OrderScreenRouteType = RouteProp<RootStackParamList, 'Order'>;
type WaitingDriverScreenType = RouteProp<RootStackParamList, 'WaitingDriver'>;
type OrderDetailScreenType = RouteProp<RootStackParamList, 'OrderDetail'>;
export type {
  SectionProps,
  CarType,
  Car,
  MapDirectionProps,
  CognitoUserExt,
  RootStackParamList,
  HomeScreenNavigationProp,
  OrderScreenNavigationProp,
  WaitingDriverScreenNavigationProp,
  OrderDetailScreenNavigationProp,
  OrderScreenRouteType,
  OrderDetailScreenType,
  WaitingDriverScreenType,
};
