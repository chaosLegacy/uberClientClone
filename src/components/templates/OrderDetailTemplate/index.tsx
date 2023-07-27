import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import Container from '~/components/atoms/Container';
import { useRoute } from '@react-navigation/native';
import { OrderDetailScreenType } from '~/types';
import { Car, Order } from '~/API';
import { OrderService } from '~/services/';

const OrderDetailTemplate = () => {
  const [orderDetail, setOrderDetail] = useState<Order>();
  const [driverCar, setDriverCar] = useState<Car>();
  const { params } = useRoute<OrderDetailScreenType>();
  const { orderId, car } = params;
  const fetchOrderDetail = async (id: string) => {
    const order = await OrderService._getOrderById(id);
    setOrderDetail(order);
  };

  useEffect(() => {
    if (orderId && car) {
      fetchOrderDetail(orderId);
      setDriverCar(car);
    }
  }, [orderId, car]);
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
