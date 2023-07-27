import React from 'react';
import Map from '~/components/molecules/Map';
import DriversList from '~/components/organisms/DriversList';
import MapDirections from '~/components/molecules/MapDirections';
import MapMarker from '~/components/molecules/MapMarker';
import Container from '~/components/atoms/Container';
import { useRoute, useNavigation } from '@react-navigation/native';
import {
  WaitingDriverScreenNavigationProp,
  OrderScreenRouteType,
} from '~/types';
import { CreateOrderInput } from '~/API';
import { ORDER_STATUS } from '~/constants';
import { _createOrder } from '~/services/order';
import { _getAuthenticatedUser } from '~/services/user';
import { calculateDelta } from '~/utils';

const OrderTemplate = () => {
  const { params } = useRoute<OrderScreenRouteType>();
  const navigation = useNavigation<WaitingDriverScreenNavigationProp>();
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

  const region = {
    latitude: (origin.latitude + destination.latitude) / 2,
    longitude: (origin.longitude + destination.longitude) / 2,
    ...calculateDelta(origin, destination),
  };

  const onConfirm = async (carType?: string) => {
    try {
      if (!carType) {
        return;
      }
      const currentUser = await _getAuthenticatedUser();
      const orderInput: CreateOrderInput = {
        status: ORDER_STATUS[ORDER_STATUS.NEW],
        userId: currentUser.attributes.sub,
        type: carType,
        originLat: origin.latitude,
        originLong: origin.longitude,
        destLat: destination.latitude,
        destLong: destination.longitude,
      };
      const order = await _createOrder(orderInput);
      if (order) {
        navigation.navigate('WaitingDriver', { orderId: order.id });
        // Alert.alert('Huraaay', 'Your order has been created', [
        //   {
        //     text: 'Go to order detail',
        //     onPress: () => {
        //       navigation.navigate('WaitingDriver', { orderId: order.id });
        //     },
        //   },
        // ]);
      }
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

export default OrderTemplate;
