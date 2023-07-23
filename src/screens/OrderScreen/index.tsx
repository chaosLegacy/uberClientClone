import React from 'react';
import Map from '~/components/molecules/Map';
import DriversList from '~/components/organisms/DriversList';
import MapDirections from '~/components/molecules/MapDirections';
import MapMarker from '~/components/molecules/MapMarker';
import Container from '~/components/atoms/Container';
import { useRoute, useNavigation } from '@react-navigation/native';
import { HomeScreenNavigationProp, OrderScreenRouteType } from '~/types';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { createOrder } from '~/graphql/mutations';
import { CreateOrderInput } from '~/API';
import { Alert } from 'react-native';

const OrderScreen = () => {
  const { params } = useRoute<OrderScreenRouteType>();
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { startPoint, endPoint } = params;
  const wayPoint = {
    origin: {
      latitude: startPoint.geometry.location.lat,
      longitude: startPoint.geometry.location.lng,
    },
    destination: {
      latitude: endPoint.geometry.location.lat,
      longitude: endPoint.geometry.location.lng,
    },
  };
  const { origin, destination } = wayPoint;
  // Function to calculate the delta between the two points
  const calculateDelta = () => {
    const latitudeDelta = Math.abs(origin.latitude - destination.latitude);
    const longitudeDelta = Math.abs(origin.longitude - destination.longitude);
    return {
      latitudeDelta: Math.max(3.01, latitudeDelta), // A minimum value to avoid an extremely zoomed-in map
      longitudeDelta: Math.max(3.01, longitudeDelta), // A minimum value to avoid an extremely zoomed-in map
    };
  };
  const region = {
    latitude: (origin.latitude + destination.latitude) / 2,
    longitude: (origin.longitude + destination.longitude) / 2,
    ...calculateDelta(),
  };

  const onConfirm = async (carType?: string) => {
    try {
      if (!carType) {
        return;
      }
      const currentUser = await Auth.currentAuthenticatedUser();
      const input: CreateOrderInput = {
        userId: currentUser.attributes.sub,
        type: carType,
        originLat: origin.latitude,
        originLong: origin.longitude,
        destLat: destination.latitude,
        destLong: destination.longitude,
      };
      await API.graphql(
        graphqlOperation(createOrder, {
          input,
        }),
      );
      Alert.alert('Huraaay', 'Your order has been created', [
        {
          text: 'Go Home',
          onPress: () => {
            navigation.navigate('Home');
          },
        },
      ]);
    } catch (err) {
      console.log('Error: ', err);
    }
  };

  return (
    <Container>
      <Map coordinate={region}>
        <MapDirections origin={origin} destination={destination} />
        <MapMarker coordinate={origin} title="Origin" />
        <MapMarker coordinate={destination} title="Destination" />
      </Map>
      <DriversList onSubmitCarType={onConfirm} />
    </Container>
  );
};

export default OrderScreen;
