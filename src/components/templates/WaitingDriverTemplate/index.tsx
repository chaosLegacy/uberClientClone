import React, { useEffect, useState } from 'react';

import LottieView from 'lottie-react-native';
import Container from '~/components/atoms/Container';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  OrderDetailScreenNavigationProp,
  OrderSubscriptionType,
  WaitingDriverScreenType,
} from '~/types';
import styles from './styles';
import { _onOrderUpdatedById } from '~/services/order';
import { CarService } from '~/services';
import { Car } from '~/API';
import StepIndicator from 'react-native-step-indicator';
import moment from 'moment';
import { Image, Text, View } from 'react-native';
import Colors from '~/constants/Colors';
import { getImageByCarType } from '~/utils';
import Entypo from 'react-native-vector-icons/Entypo';

const WaitingDriverTemplate = () => {
  const [driverCar, setDriverCar] = useState<Car>();
  const [position, setPosition] = useState(1);
  const status: Array<{ animation: string; label: string }> = [
    {
      animation: '',
      label: '.',
    },
    {
      animation: require('assets/animations/waitingDriver.json'),
      label: 'Connecting you with a driver nearby.',
    },
    {
      animation: require('assets/animations/waitingDriver1.json'),
      label: 'A driver has accepted your order',
    },
  ];

  const navigation = useNavigation<OrderDetailScreenNavigationProp>();
  const { params } = useRoute<WaitingDriverScreenType>();
  const { orderId } = params;
  console.log('order id: ', orderId);

  const fetchCarDetail = async (id: string) => {
    const car = await CarService._getDriverCarById(id);
    setDriverCar(car);
    setPosition(position + 1);
  };

  const onOrderUpdateReceived = async (subscription: OrderSubscriptionType) => {
    if (subscription.value.data && subscription.value.data.onOrderUpdated) {
      const { carId } = subscription.value.data.onOrderUpdated;
      console.log('Order accepted by driver id: ', carId);
      if (carId) {
        fetchCarDetail(carId);
      }
    }
  };

  const onOrderUpdateError = (errorValue: any) => {
    console.error('onOrderUpdateError: ', errorValue);
  };

  useEffect(() => {
    const sub = _onOrderUpdatedById({
      orderId,
      next: onOrderUpdateReceived,
      error: onOrderUpdateError,
    });
    return () => sub.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  useEffect(() => {
    if (driverCar) {
      const timeoutId = setTimeout(() => {
        navigation.navigate('OrderDetail', { orderId, carId: driverCar.id });
      }, 6000);
      return () => {
        clearTimeout(timeoutId);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [driverCar]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const mockDriver = {
    id: '1234',
    __typename: 'Car',
    createdAt: new Date().toDateString(),
    updatedAt: new Date().toDateString(),
    type: 'UberX',
    uri: '',
    user: {
      __typename: 'User',
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString(),
      email: 'test@test.fr',
      id: '123',
      username: 'Test',
      rating: 4.8,
      avatar: 'https://xsgames.co/randomusers/avatar.php?g=male',
      name: 'Alex',
    },
  };

  const customStyles = {
    stepIndicatorSize: 20,
    currentStepIndicatorSize: 25,
    separatorStrokeWidth: 10,
    currentStepStrokeWidth: 5,
    stepStrokeWidth: 0,
    stepStrokeCurrentColor: Colors.blue,
    stepStrokeFinishedColor: Colors.white,
    stepStrokeUnFinishedColor: Colors.white,
    separatorFinishedColor: Colors.blue,
    separatorUnFinishedColor: Colors.lightGray,
    stepIndicatorFinishedColor: Colors.blue,
    stepIndicatorUnFinishedColor: Colors.white,
    stepIndicatorCurrentColor: Colors.white,
    stepIndicatorLabelCurrentColor: Colors.transparent,
    stepIndicatorLabelFinishedColor: Colors.transparent,
    stepIndicatorLabelUnFinishedColor: Colors.transparent,
    labelColor: Colors.darkGray,
    currentStepLabelColor: Colors.blue,
  };

  return (
    <Container>
      <View style={styles.container}>
        <LottieView
          style={styles.lottieCheckMark}
          source={require('assets/animations/checkMark.json')}
          autoPlay
          speed={0.5}
          loop={false}
        />

        <View style={styles.orderIndicatorContainer}>
          <Text style={styles.orderIndicatorLabel}>
            {status[position].label}
          </Text>
          <View style={styles.row}>
            <Text style={styles.estimatedText}>Estimated Arrival</Text>
            <Text style={styles.estimatedTime}>
              {moment().add(10, 'minute').format('h:mm')}
            </Text>
          </View>

          <View style={styles.stepIndicatorContainer}>
            <StepIndicator
              customStyles={customStyles}
              currentPosition={position}
              stepCount={status.length}
            />
          </View>
        </View>
        <View>
          <LottieView
            style={styles.lottieStatus}
            source={status[position].animation}
            autoPlay
            speed={0.5}
            loop={false}
          />

          {driverCar && (
            <View style={styles.driverCarDetailContainer}>
              <View style={styles.driverDetails}>
                <View style={styles.driverAvatarRatingContainer}>
                  {driverCar.user?.avatar ? (
                    <Image
                      source={{ uri: driverCar.user.avatar }}
                      style={styles.driverProfilePicture}
                    />
                  ) : (
                    <Image
                      source={require('assets/images/default.jpeg')}
                      style={styles.driverProfilePicture}
                    />
                  )}
                  <View style={styles.driverRatingContainer}>
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
              {/* TODO add more info into car model */}
              <View style={styles.driverCarDetails}>
                <Text style={styles.driverCarPlate}>6Z47DJ1</Text>
                <Text style={styles.driverCarBrand}>Sliver Honda Civic</Text>
              </View>
            </View>
          )}
        </View>
      </View>
    </Container>
  );
};

export default WaitingDriverTemplate;
