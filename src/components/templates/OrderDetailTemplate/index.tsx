import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import Container from '~/components/atoms/Container';
import { useRoute } from '@react-navigation/native';
import { OrderDetailScreenType } from '~/types';
import { Car, Order } from '~/API';
import { CarService, OrderService } from '~/services/';

const OrderDetailTemplate = () => {
  const [orderDetail, setOrderDetail] = useState<Order>();
  const [driverCar, setDriverCar] = useState<Car>();
  const { params } = useRoute<OrderDetailScreenType>();
  const { orderId, carId } = params;
  const fetchOrderDetail = async (id: string) => {
    const order = await OrderService._getOrderById(id);
    setOrderDetail(order);
  };
  const fetchCarDetail = async (id: string) => {
    const car = await CarService._getDriverCarById(id);
    setDriverCar(car);
  };
  useEffect(() => {
    if (orderId && carId) {
      fetchOrderDetail(orderId);
      fetchCarDetail(carId);
    }
  }, [orderId, carId]);
  return (
    <Container>
      <View>
        <Text>OrderDetailTemplate</Text>
        {orderDetail && <Text>{orderDetail.id}</Text>}
        {driverCar && <Text>{driverCar.id}</Text>}
      </View>
    </Container>
  );
};

export default OrderDetailTemplate;
