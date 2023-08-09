import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import Container from '~/components/atoms/Container';
import { useRoute } from '@react-navigation/native';
import {
  CarSubscriptionType,
  MapDirectionProps,
  OrderDetailScreenType,
  OrderSubscriptionType,
} from '~/types';
import { Car, Order } from '~/API';
import { OrderService, CarService } from '~/services/';
import Map from '~/components/molecules/Map';
import MapDirections from '~/components/molecules/MapDirections';
import MapMarker from '~/components/molecules/MapMarker';
import MapView, { LatLng, UserLocationChangeEvent } from 'react-native-maps';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { getImageByCarType, height, width } from '~/utils';
import styles from './styles';
import Colors from '~/constants/Colors';
import { ORDER_STATUS } from '~/constants';

const OrderDetailTemplate = () => {
  const [userPosition, setUserPosition] = useState<LatLng>();
  const [destinationPosition, setDestinationPosition] = useState<LatLng>();
  const [orderDetail, setOrderDetail] = useState<Order>();
  const [driverCar, setDriverCar] = useState<Car>();
  const [mapDirection, setMapDirection] = useState<MapDirectionProps>();
  const [messageText, setMessageText] = useState<string>();
  const [driverStatusMessage, setDriverStatusMessage] = useState<string>('');

  const { params } = useRoute<OrderDetailScreenType>();
  const { orderId, carId } = params;
  const mapRef = useRef<MapView>(null);
  const fetchOrderDetail = async (id: string) => {
    const order = await OrderService._getOrderById(id);
    setOrderDetail(order);
  };
  const fetchCarDetail = async (id: string) => {
    const car = await CarService._getDriverCarById(id);
    setDriverCar(car);
  };

  const onDriverCarUpdateReceived = async (
    subscription: CarSubscriptionType,
  ) => {
    if (subscription.value.data && subscription.value.data.onCarUpdated) {
      const subCar = subscription.value.data.onCarUpdated;
      setDriverCar(subCar as Car);
    }
  };

  const onDriverCarUpdateError = (errorValue: any) => {
    console.error('onOrderUpdateError: ', errorValue);
  };

  const onOrderUpdateReceived = async (subscription: OrderSubscriptionType) => {
    if (subscription.value.data && subscription.value.data.onOrderUpdated) {
      const order = subscription.value.data.onOrderUpdated;
      setOrderDetail(order as Order);
    }
  };

  const onOrderUpdateError = (errorValue: any) => {
    console.error('onOrderUpdateError: ', errorValue);
  };

  // fetch order details and car details
  useEffect(() => {
    fetchOrderDetail(orderId);
    fetchCarDetail(carId);
  }, [orderId, carId]);

  // subscribe to car changes
  useEffect(() => {
    const sub = CarService._onDriverCarUpdatedById({
      carId,
      next: onDriverCarUpdateReceived,
      error: onDriverCarUpdateError,
    });
    return () => sub.unsubscribe();
  }, [carId]);

  // subscribe to order changes
  useEffect(() => {
    const sub = OrderService._onOrderUpdatedById({
      orderId,
      next: onOrderUpdateReceived,
      error: onOrderUpdateError,
    });
    return () => sub.unsubscribe();
  }, [orderId]);

  // change destination on order status changes
  useEffect(() => {
    if (orderDetail) {
      console.log('===== orderDetail received ');
      console.log('Order id: ', orderDetail.id);
      console.log('Order status: ', orderDetail.status);
      console.log('Order originLatLong: ', {
        lat: orderDetail.originLat,
        long: orderDetail.originLong,
      });
      console.log('Order destLatLong: ', {
        lat: orderDetail.destLat,
        long: orderDetail.destLong,
      });
      switch (orderDetail.status) {
        case ORDER_STATUS[ORDER_STATUS.CONFIRMED]:
          setDestinationPosition({
            latitude: orderDetail.originLat!,
            longitude: orderDetail.originLong!,
          });
          break;
        case ORDER_STATUS[ORDER_STATUS['PICKED-UP']]:
          setDestinationPosition({
            latitude: orderDetail.destLat,
            longitude: orderDetail.destLong,
          });
          break;
        case ORDER_STATUS[ORDER_STATUS['DROP-OFF']]:
          setDestinationPosition(undefined);
          break;
      }
    }
  }, [orderDetail]);

  useEffect(() => {
    if (mapDirection) {
      const { distance } = mapDirection;
      const driverName = driverCar?.user ? driverCar.user.name : 'NAN';
      switch (orderDetail!.status) {
        case ORDER_STATUS[ORDER_STATUS.CONFIRMED]:
          const message =
            distance <= 0.2
              ? 'Meet at your pickup spot'
              : `${driverName} is on the way`;
          setDriverStatusMessage(message);
          break;
        case ORDER_STATUS[ORDER_STATUS['PICKED-UP']]:
          setDriverStatusMessage(`Enjoy the ride with ${driverName}`);
          break;
        case ORDER_STATUS[ORDER_STATUS['DROP-OFF']]:
          setDriverStatusMessage('Your reached your destination');
          break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapDirection]);
  const onUserLocationChange = (event: UserLocationChangeEvent) => {
    setUserPosition(event.nativeEvent.coordinate);
  };

  const onDirectionReady = ({
    distance,
    duration,
    coordinates,
  }: MapDirectionProps) => {
    setMapDirection({ distance, duration, coordinates });
    if (mapRef && mapRef.current) {
      mapRef.current.fitToCoordinates(coordinates, {
        edgePadding: {
          right: width / 20,
          bottom: height / 20,
          left: width / 20,
          top: height / 20,
        },
      });
    }
  };

  return (
    <Container>
      <View style={styles.mapContainer}>
        <Map ref={mapRef} onLocationChange={onUserLocationChange}>
          {userPosition && orderDetail && destinationPosition && driverCar && (
            <>
              <MapDirections
                destination={destinationPosition}
                origin={{
                  latitude: driverCar.latitude!,
                  longitude: driverCar.longitude!,
                }}
                onDirectionChange={onDirectionReady}
              />
              <MapMarker
                coordinate={{
                  latitude: driverCar.latitude!,
                  longitude: driverCar.longitude!,
                }}
                car={{
                  type: driverCar.type,
                  heading: driverCar.heading,
                }}
              />
              <MapMarker coordinate={destinationPosition} title="Origin" />
            </>
          )}
        </Map>
      </View>
      {driverCar && (
        <>
          <View style={styles.orderHeader}>
            <Text style={styles.driverStatusText}>{driverStatusMessage}</Text>
            <View style={styles.durationContainer}>
              <Text style={styles.durationText}>
                {mapDirection?.duration?.toFixed(1)}
              </Text>
              <Text style={styles.durationFormat}>min</Text>
            </View>
          </View>
          <View style={styles.orderBody}>
            <View style={styles.driverCarVisual}>
              <View style={styles.driverAvatarCar}>
                <Image
                  source={{ uri: driverCar.user!.avatar! }}
                  style={styles.driverProfilePicture}
                />
                <View style={styles.driverRating}>
                  <Text>{driverCar.user?.rating}</Text>
                  <Entypo name="star" size={12} color={Colors.darkGray} />
                </View>
              </View>
              <View style={styles.driverCarPictureContainer}>
                <Image
                  style={styles.driverCarPicture}
                  source={getImageByCarType(driverCar.type)}
                />
              </View>
            </View>
            <View style={styles.driverCarDetail}>
              <Text style={styles.driverCarNameText}>
                {driverCar.user?.name}
              </Text>
              <Text style={styles.driverCarPlateText}>6Z47DJ1</Text>
              <Text style={styles.driverCarBrandText}>Sliver Honda Civic</Text>
            </View>
          </View>
          <View style={styles.orderFooter}>
            <TextInput
              style={styles.inputMessage}
              onChangeText={setMessageText}
              value={messageText}
              placeholder="Send a message"
            />
            <View style={styles.buttonsContainer}>
              <TouchableOpacity style={styles.button}>
                <MaterialIcons
                  name="call"
                  color={Colors.darkGray}
                  style={styles.iconButton}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <MaterialIcons
                  name="flare"
                  color={Colors.darkGray}
                  style={styles.iconButton}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <MaterialIcons
                  name="share-location"
                  color={Colors.darkGray}
                  style={styles.iconButton}
                />
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </Container>
  );
};

export default OrderDetailTemplate;
